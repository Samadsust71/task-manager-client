
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrash } from "react-icons/fa";


const TaskItem = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow mb-2 cursor-pointer"
    >
      <span>{task.text}</span>
      <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700">
        <FaTrash />
      </button>
    </div>
  );
};

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
