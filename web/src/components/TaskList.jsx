import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { setFilter, setSearchQuery } from "../redux/taskSlice";
import { useEffect, useState } from "react";
import SkeletonLoading from "./extras/SkeletonLoading";

const TaskItem = ({ task, index, moveTask, onSelectTask }) => {
  const [, drag] = useDrag({
    type: "TASK",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="w-full p-4 border mb-2 bg-gray-400 rounded  cursor-move"
      onClick={() => onSelectTask(task)}
    >
      <h3 className="text-lg font-bold text-gray-600">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-600">
        Due: {task.dueDate} | Priority: {task.priority}
      </p>
      <p
        className={`text-sm ${
          task.status === "completed" ? "text-green-600" : "text-yellow-600"
        }`}
      >
        {task.status}
      </p>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
  onSelectTask: PropTypes.func.isRequired,
};

const TaskList = ({ onSelectTask }) => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container max-w-7xl bg-blue">
      <div className="mb-4  flex gap-2 justify-center items-center">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={
            filter === "all"
              ? "!bg-gray-600 text-white p-2 rounded"
              : "p-2 border rounded "
          }
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("active"))}
          className={
            filter === "active"
              ? "!bg-gray-600 text-white p-2 rounded"
              : "p-2 border rounded"
          }
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={
            filter === "completed"
              ? "!bg-gray-600 text-white p-2 rounded"
              : "p-2 border rounded"
          }
        >
          Completed
        </button>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full p-2 mb-4 border border-gray-600 rounded text-gray-600"
      />
      <div className="w-full  mt-4">
        {loading ? (
          <div className="grid pb-8 justify-between overflow-auto  grid-cols-1 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
            <SkeletonLoading cards={8} />
          </div>
        ) : (
          <>
            <div className="grid pb-8 justify-between overflow-auto  grid-cols-1 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
              {filteredTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  moveTask={moveTask}
                  onSelectTask={onSelectTask}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  onSelectTask: PropTypes.func.isRequired,
};

export default TaskList;
