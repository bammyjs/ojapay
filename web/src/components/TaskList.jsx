import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { setError, setFilter, setSearchQuery } from "../redux/taskSlice";
import { useEffect, useState } from "react";
import SkeletonLoading from "./extras/SkeletonLoading";
import { Link, useNavigate } from "react-router-dom";
import { IoIosInformationCircle, IoMdAdd } from "react-icons/io";

const TaskItem = ({ task, index, moveTask, onSelectTask }) => {
  // TODO: drag and drop not working yet fix this later.

  const [, ref] = useDrag({
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
      ref={(node) => ref(drop(node))}
      className={`w-full p-4 border mb-2 bg-gray-400 rounded cursor-move `}
      onClick={() => onSelectTask(task)}
      style={{ touchAction: "none" }}
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
  const navigate = useNavigate();
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
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

 

  // if (setError) {
  //   return (
  //     <div className="flex-1 justify-center items-center">
  //       <p className="text-red-600 text-xl">can not fetch data</p>
  //     </div>
  //   );
  // }

  if (tasks.length === 0) {
    return (
      <div className="w-full border border-black rounded justify-center items-center p-5">
        <span className="w-full flex items-center justify-center">
          <IoIosInformationCircle size={100} color="gray" />
        </span>
        <p className="text-xl text-gray-700 mb-4 font-Inter_500Medium text-center">
          No tasks available.
        </p>
        <Link
          to={"/create-task"}
          className="py-3 flex items-center justify-center text-white  bg-black px-4 rounded-xl"
        >
          <p className="text-white">Create new Task</p>
        </Link>
      </div>
    );
  }

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
      <span
        onClick={() => navigate("/create-task")}
        className="bg-purple-600 flex gap-2 animate-pulse p-2 rounded items-center absolute bottom-20 right-10 md:right-[15%]"
      >
        Create a new task
        <IoMdAdd size={25} />
      </span>
    </div>
  );
};

TaskList.propTypes = {
  onSelectTask: PropTypes.func.isRequired,
};

export default TaskList;
