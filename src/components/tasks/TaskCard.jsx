import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from "prop-types";
import { FiEdit, FiTrash2, FiMove } from "react-icons/fi";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";




const TaskCard = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
    category: task.category || "To-Do",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    onEdit({ ...task, ...editedTask }); // Pass updated task data to parent
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="bg-white dark:bg-black p-3 rounded shadow mb-2 flex justify-between items-center transition-all duration-200 ease-in-out"
      >
        {/* Drag Handle */}
        <div {...listeners} className="cursor-grab p-2">
          <FiMove size={18} className="text-gray-500 dark:text-gray-200" />
        </div>

        {/* Task Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 dark:text-white">{task.title}</h3>
          {task.description && <p className="text-sm text-gray-600 dark:text-white/80">{task.description}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800">
            <FiEdit size={18} />
          </button>
          <button onClick={() => onDelete(task._id)} className="text-red-600 hover:text-red-800">
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Task Title"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            />
            <Input
              placeholder="Task Description"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
            <Select
              value={editedTask.category}
              onValueChange={(value) => setEditedTask({ ...editedTask, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To-Do">To-Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;