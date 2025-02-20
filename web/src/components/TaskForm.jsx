import { useState } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "./extras/LoadingButton";
import { useNavigate } from "react-router-dom";
import InputField from "./extras/InputField";
import { IoIosArrowBack } from "react-icons/io";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import format from "date-fns/format";
import { useSelector } from "react-redux";

const TaskForm = ({ onAddTask }) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.tasks);
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
    <div className=" w-full  max-w-sm text-black text-left  bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-300 p-4 rounded-2xl mb-4 space-y-2 "
      >
        {/* <label
          htmlFor="dueDate"
          className="block text-white mb-1 text-sm font-medium"
        >
          Due Date
        </label> */}
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
          className="hidden w-full p-2 mb-2 border rounded cursor-pointer "
        />

        {/* DayPicker Modal */}
        <div
          id="daypicker-modal"
          className={`${
            theme === "dark" ? "text-white  bg-gray-900  rounded-2xl " : "text-gray-700 rounded-2xl"
          } "mb-2 shadow-lg p-4 border border-gray-300 flex items-center justify-center rounded-2xl"`}
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
        <InputField
          name={"title"}
          labelTitle={"Title"}
          value={task.title}
          placeholder={"Task Title"}
          handleChange={handleChange}
        />

        <label
          htmlFor="description"
          className="block text-gray-500 mb-1 text-sm font-medium"
        >
          Description
        </label>
        <textarea
          required
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-2 text-gray-500 border  border-gray-300 rounded"
        />

        <label
          htmlFor="priority"
          className="block text-gray-500 mb-1 text-sm font-medium"
        >
          Select Priority
        </label>
        <div className="flex gap-2 my-2 justify-cente">
          {["Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handlePriorityChange(level)}
              className={`py-2 px-4 w-32 rounded ${
                task.priority === level
                  ? "!bg-gray-700 text-white"
                  : "!bg-gray-300 text-gray-500"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 gap-3  ">
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
