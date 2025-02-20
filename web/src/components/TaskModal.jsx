import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { updateTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { DayPicker } from "react-day-picker";
import format from "date-fns/format";
import { motion } from "framer-motion";

const TaskModal = ({ isOpen, task, isEditMode, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(task || {});
  const [selectedDate, setSelectedDate] = useState(null);
  const modalRef = useRef(null);
  const datePickerRef = useRef(null);

  const parseDate = (dateString) => {
    const timestamp = Date.parse(dateString);
    return isNaN(timestamp) ? null : new Date(dateString);
  };

  useEffect(() => {
    if (task) {
      setFormData(task);
      setSelectedDate(task.dueDate ? parseDate(task.dueDate) : null);
    }
  }, [task]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    setFormData({ ...formData, dueDate: formattedDate });

    document.getElementById("daypicker-modal-edit").classList.add("hidden");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }

      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        document.getElementById("daypicker-modal-edit").classList.add("hidden");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    if (!formData.title.trim()) return;

    dispatch(updateTask({ id: task.id, updatedTask: formData }));

    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gray-700 p-6 rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Task" : "Task Details"}
        </h2>

        {/* Task Title */}
        <label className="block mb-2 text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={!isEditMode}
          className={`capitalize ${
            isEditMode ? "w-full p-2 border rounded" : "w-full font-bold"
          }`}
        />

        {/* Task Description */}
        <label className="block mt-3 mb-2 text-sm font-medium">
          Description
        </label>
        {isEditMode ? (
          <textarea
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            disabled={!isEditMode}
            className="w-full p-2 border rounded"
          />
        ) : (
          <input
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            disabled={!isEditMode}
            className="w-full font-bold"
          />
        )}

        {/* Task Due Date */}
        <label className="block mt-3 mb-2 text-sm font-medium">Due Date</label>
        <input
          type="text"
          readOnly
          disabled={!isEditMode}
          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
          onClick={() =>
            document
              .getElementById("daypicker-modal-edit")
              .classList.toggle("hidden")
          }
          className={`  ${
            isEditMode
              ? "w-full cursor-pointer p-2 border rounded"
              : "w-full font-bold"
          }capitalize`}
        />

        <div
          ref={datePickerRef}
          id="daypicker-modal-edit"
          className="hidden max-w-sm absolute  z-50 bg-gray-900 p-4 border shadow-lg rounded-2xl"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
          />
        </div>

        <label className="block mt-4 mb-2 text-sm font-medium">Priority</label>
        {isEditMode ? (
          <div className="flex gap-2 mb-4">
            {["Low", "Medium", "High"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, priority: level })}
                className={`py-2 px-4 w-32 rounded ${
                  formData.priority === level
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        ) : (
          <p className="capitalize font-bold text-gray-300 mb-4">
            {formData.priority}
          </p>
        )}
        <label
          className={`${
            isEditMode ? "hidden" : "block mt-3 mb-2 text-sm font-medium"
          }`}
        >
          Status
        </label>
        <input
          type="text"
          className={`capitalize ${
            isEditMode
              ? "hidden w-full p-2 border rounded"
              : "w-full font-bold  "
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
      </motion.div>
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
