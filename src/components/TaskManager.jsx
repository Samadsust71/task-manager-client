import  { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TaskList from "./TaskList";

const API_URL = "http://localhost:5000/tasks"; // Adjust as per backend setup

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(API_URL, { text: newTask, status: "To-Do" });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex gap-2 mb-4">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." />
        <Button onClick={handleAddTask}>
          <FaPlusCircle className="w-5 h-5" />
        </Button>
      </div>
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskManager;
