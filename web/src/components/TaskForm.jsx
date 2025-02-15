import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LoadingButton } from "./extras/LoadingButton";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title) {
      onAddTask({ id: Date.now(), ...task, status: "active" });
      setTask({ title: "", description: "", dueDate: "", priority: "Low" });
    }

    setIsLoading(true);
  };

  return (
    <div className="md:w-[30%] p-4 text-black text-left rounded bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="border border-black p-4 rounded mb-4 "
      >
        <h3 className="text-3xl font-bold mb-4 text-center ">
          Create New Task
        </h3>
        <label htmlFor="title">Task Title</label>
        <input
          required
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <label htmlFor="description">Task Description</label>
        <textarea
          required
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <label htmlFor="dueDate">Task Due Date</label>
        <input
          required
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label htmlFor="priority">Select Task Priority</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <LoadingButton type="submit" isLoading={isLoading}>
          Add Task
        </LoadingButton>
        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Add Task
        </button> */}
      </form>
      <Link to={"/tasks"} className="">
        <button className="w-full text-white">View Task List</button>
      </Link>
    </div>
  );
};

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
