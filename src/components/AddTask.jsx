
import { FaPlusCircle } from 'react-icons/fa'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, { text: newTask, status: "To-Do" });
          setTasks([...tasks, response.data]);
          setNewTask("");
        } catch (error) {
          console.error("Error adding task:", error);
        }
      };
  return (
    <div className="flex gap-2 mb-4">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." />
        <Button onClick={handleAddTask}>
          <FaPlusCircle className="w-5 h-5" />
        </Button>
      </div>
  )
}

export default AddTask
