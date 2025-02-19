import { useDispatch, useSelector } from "react-redux";
import { setTasks, setSearchQuery, setFilter } from "../redux/taskSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoIosInformationCircle, IoMdAddCircle } from "react-icons/io";
import { DndContext } from "@dnd-kit/core";
import Column from "./column";
import PropTypes from "prop-types";
import { useState } from "react";
import TaskModal from "./TaskModal";

const COLUMNS = [
  { id: "all", title: "All" },
  { id: "active", title: "Active" },
  { id: "completed", title: "Completed" },
];

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Drag & Drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id; // Column ID ("active" or "completed")

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    dispatch(setTasks(updatedTasks));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    dispatch(setTasks(updatedTasks));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Handle task completion toggle
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "completed" ? "active" : "completed",
          }
        : task
    );

    dispatch(setTasks(updatedTasks));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Handle Task Selection for Modal (View/Edit)
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Handle Saving Edited Task
  const handleSaveTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );

    dispatch(setTasks(updatedTasks));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
  };

  // Filter tasks based on search and selected tab
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          className="py-3 flex items-center justify-center text-white bg-black px-4 rounded-xl"
        >
          <p className="text-white">Create new Task</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl bg-blue">
      {/* Filter Tabs */}
      <div className="mb-4 flex gap-2 justify-center items-center">
        {COLUMNS.map((column) => (
          <button
            key={column.id}
            onClick={() => dispatch(setFilter(column.id))}
            className={
              filter === column.id
                ? "!bg-gray-600 text-white p-2 rounded"
                : "p-2 border rounded"
            }
          >
            {column.title}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full p-2 mb-4 border border-gray-600 rounded text-gray-600"
      />

      {/* Drag-and-Drop Context */}
      <div className="w-full flex gap-2 md:gap-4">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.filter((col) => col.id !== "all").map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={filteredTasks.filter((task) => task.status === column.id)}
              onSelectTask={handleSelectTask}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </DndContext>
      </div>

      {/* Floating Add Task Button */}
      <span
        onClick={() => navigate("/create-task")}
        className="bg-purple-600 flex gap-2 animate-pulse p-2 rounded items-center absolute bottom-20 right-10 md:right-[15%]"
      >
        Create a new task
        <IoMdAddCircle size={25} />
      </span>

      {/* Task Modal for Editing/Viewing */}
      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        isEditMode={true}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

TaskList.propTypes = {
  onSelectTask: PropTypes.func,
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  searchQuery: PropTypes.string,
};

export default TaskList;
