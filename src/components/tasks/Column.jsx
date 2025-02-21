import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const Column = ({ id, title, tasks, onEdit, onDelete }) => {
  // Make the column droppable
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef} // Attach the droppable ref to the column
      className="bg-gray-100 dark:bg-black/10 p-4 rounded-lg shadow-md min-h-[400px]"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <SortableContext items={tasks.map((task) => task._id)}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No tasks available</p>
        )}
      </SortableContext>
    </div>
  );
};

Column.propTypes = {
  id: PropTypes.string.isRequired, // Add id prop for droppable
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Column;