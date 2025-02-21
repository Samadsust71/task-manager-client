import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { io } from "socket.io-client";
import Column from "./Column";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";

const socket = io(`${import.meta.env.VITE_API_URL}`, {
  transports: ["websocket", "polling"],
});

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    timestamp: new Date().toISOString(),
  });
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get(`/tasks/${user?.email}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    socket.on("taskUpdated", fetchTasks);
    return () => {
      socket.off("taskUpdated", fetchTasks);
    };
  }, [axiosPublic,user?.email]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return; // If no valid drop target, do nothing

    const draggedId = active.id;
    const overId = over.id;
    const draggedTask = tasks.find((task) => task._id === draggedId);
    if (!draggedTask) return;

    let newCategory = draggedTask.category; // Default: same category

    // Check if the task is dropped onto a column (category change)
    if (["To-Do", "In Progress", "Done"].includes(overId)) {
      newCategory = overId; // Assign new category
    } else {
      // If dropped onto another task, get the category of the task it's dropped onto
      const overTask = tasks.find((task) => task._id === overId);
      if (overTask) {
        newCategory = overTask.category;
      }
    }

    // Update the tasks state
    setTasks((prevTasks) => {
      let newTasks = [...prevTasks];

      // If moving within the same column, reorder tasks
      if (draggedTask.category === newCategory) {
        const oldIndex = newTasks.findIndex((task) => task._id === draggedId);
        const newIndex = newTasks.findIndex((task) => task._id === overId);
        newTasks = arrayMove(newTasks, oldIndex, newIndex);
      } else {
        // If moving to another column, update the category
        newTasks = newTasks.map((task) =>
          task._id === draggedId ? { ...task, category: newCategory } : task
        );
      }

      return newTasks;
    });

    // Send the updated task to the backend
    try {
      await axiosPublic.post("/update-task", {
        _id: draggedId,
        category: newCategory,
      });
      socket.emit("taskUpdated");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddTask = async () => {
    // Validate title
    if (!newTask.title) {
      toast.error("Title is required.");
      return;
    }
    if (newTask.title.length > 50) {
      toast.error("Title must be less than 50 characters.");
      return;
    }

    // Validate description
    if (newTask.description.length > 200) {
      toast.error("Description must be less than 200 characters.");
      return;
    }

    // Validate category
    const validCategories = ["To-Do", "In Progress", "Done"];
    if (!validCategories.includes(newTask.category)) {
      toast.error("Invalid category selected.");
      return;
    }

    // Add timestamp
    const taskToAdd = {
      ...newTask,
      timestamp: new Date().toISOString(),
      email: user?.email
    };

    try {
      await axiosPublic.post("/tasks", taskToAdd);
      setNewTask({ title: "", description: "", category: "To-Do" });
      socket.emit("taskUpdated");
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  const handleEditTask = async (updatedTask) => {
    console.log(updatedTask);
    try {
      await axiosPublic.patch(`/task/${updatedTask._id}`, updatedTask);
      socket.emit("taskUpdated");
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/task/${taskId}`);
          toast.success("Task deleted successfully!");
          socket.emit("taskUpdated");
        } catch (error) {
          console.error("Error deleting task:", error);
          toast.error("Failed to delete task. Please try again.");
        }
      }
    });
  };

  return (
    <div className="">
      <div className="mb-4 flex flex-col lg:flex-row gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 rounded dark:bg-black "
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="border p-2 rounded dark:bg-black"
        />
         <select  className="border p-2 rounded dark:bg-black" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
         </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Column
              key={category}
              id={category}
              title={category}
              tasks={tasks.filter((task) => task.category === category)}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskManager;
