import { useState } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "./extras/LoadingButton";
import { useNavigate } from "react-router-dom";
import InputField from "./extras/InputField";
import { IoIosArrowBack } from "react-icons/io";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import format from "date-fns/format";

const TaskForm = ({ onAddTask }) => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    setTask({ ...task, dueDate: formattedDate });

    // document.getElementById("daypicker-modal").classList.add("hidden");
  };

  const handlePriorityChange = (priority) => {
    setTask({ ...task, priority });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title) {
      onAddTask({ id: Date.now(), ...task, status: "active" });
      setTask({ title: "", description: "", dueDate: "", priority: "Low" });
      setSelectedDate(null);
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    navigate(-1);
  };

  return (
    <div className=" w-full p-4 text-black text-left rounded bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="border border-black p-4 rounded mb-4 "
      >
        <h3 className="text-3xl font-bold mb-4 text-center ">
          Create New Task
        </h3>
        <InputField
          name={"title"}
          labelTitle={"Title"}
          value={task.title}
          placeholder={"Task Title"}
          handleChange={handleChange}
        />

        <label htmlFor="description" className="block mb-1 text-sm font-medium">
          Description
        </label>
        <textarea
          required
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-2  border rounded"
        />

        <label htmlFor="dueDate" className="block mb-1 text-sm font-medium">
          Due Date
        </label>
        <input
          type="text"
          readOnly
          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
          onClick={() =>
            document
              .getElementById("daypicker-modal")
              .classList.toggle("hidden")
          }
          placeholder="Select Due Date"
          className="hidden md:block w-full p-2 mb-2 border rounded cursor-pointer "
        />

        {/* DayPicker Modal */}
        <div
          id="daypicker-modal"
          className="  md:absolute z-50 bg-gray-400 p-4 border shadow-lg rounded"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            footer={
              selectedDate
                ? `Due Date: ${selectedDate.toLocaleDateString()}`
                : "Pick a day."
            }
          />
        </div>
        <label htmlFor="priority" className="block mb-1 text-sm font-medium">
          Select Priority
        </label>
        <div className="flex gap-2 mb-4 justify-cente">
          {["Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handlePriorityChange(level)}
              className={`py-2 px-4 w-32 rounded ${
                task.priority === level
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3  ">
          <span
            onClick={() => navigate("/")}
            className="bg-purple-600 p-2 rounded items-center"
          >
            <IoIosArrowBack size={25} color="white" />
          </span>
          <LoadingButton type="submit" isLoading={isLoading}>
            Add Task
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
