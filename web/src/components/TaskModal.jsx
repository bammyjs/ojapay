import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";

const TaskModal = ({ isOpen, task, isEditMode, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(task || {});

  useEffect(() => {
    setFormData(task || {});
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    if (!formData.title.trim()) return;

    // Dispatch updateTask action to Redux
    dispatch(updateTask({ id: task.id, updatedTask: formData }));

    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Task" : "Task Details"}
        </h2>

        {/* Task Title */}
        <label className="block mb-2 text-sm font-medium">Title</label>
        <input
          type="text"
          className={`capitalize ${
            isEditMode
              ? "w-full p-2 border rounded"
              : "w-full p-2 border border-gray-600 rounded bg-gray-800 "
          }`}
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={!isEditMode}
        />

        {/* Task Description */}
        <label className="block mt-3 mb-2 text-sm font-medium">
          Description
        </label>
        <textarea
          className={`capitalize ${
            isEditMode
              ? "w-full p-2 border rounded"
              : "w-full p-2 border border-gray-600 rounded bg-gray-800 "
          }`}
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={!isEditMode}
        />

        {/* Task Due Date */}
        <label className="block mt-3 mb-2 text-sm font-medium">Due Date</label>
        <input
          type="date"
          className={`capitalize ${
            isEditMode
              ? "w-full p-2 border rounded"
              : "w-full p-2 border border-gray-600 rounded bg-gray-800 "
          }`}
          value={formData.dueDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          disabled={!isEditMode}
        />
        <label className="block mt-3 mb-2 text-sm font-medium">Status</label>
        <input
          type="text"
          className={`capitalize ${
            isEditMode
              ? "w-full p-2 border rounded"
              : "w-full p-2 border border-gray-600 rounded bg-gray-800 "
          }`}
          value={formData.status || ""}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          disabled={!isEditMode}
        />

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 !bg-gray-900 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
          {isEditMode && (
            <button
              className="px-4 py-2 !bg-purple-500 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  task: PropTypes.object,
  isEditMode: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskModal;
