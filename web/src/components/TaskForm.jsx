
import { useState } from "react";
import PropTypes from "prop-types";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-black text-black rounded bg-white"
    >
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 mb-2 border"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-2 border"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
