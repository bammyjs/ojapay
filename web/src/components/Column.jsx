import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const Column = ({
  column,
  tasks,
  onSelectTask,
  onDeleteTask,
  onEditTask,
  onToggleComplete,
}) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="w-1/2 flex flex-col rounded-lg bg-gray-800 p-2 md:p-4">
      <h2 className="mb-4 font-semibold text-white">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col items-center gap-4">
        {tasks.length === 0 ? (
          <p className="text-white text-center max-w-28 mb-4">No tasks in this category</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onSelectTask={onSelectTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onToggleComplete={onToggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  onSelectTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default Column;
