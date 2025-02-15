import { useState } from "react";
import PropTypes from "prop-types";

const TaskDetails = ({ task, onUpdateTask, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(task.id, editedTask);
    onClose();
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, ...editedTask } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-xl mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 border text-gray-600 rounded"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 border text-gray-600 rounded"
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="w-full p-2 mb-2 border bg-black rounded"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit" className="bg-green-600 text-white p-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-2 border rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  task: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};
export default TaskDetails;
