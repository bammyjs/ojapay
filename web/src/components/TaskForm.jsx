import { useState } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "./extras/LoadingButton";
import { useNavigate } from "react-router-dom";
import InputField from "./extras/InputField";
import { IoIosArrowBack } from "react-icons/io";

const TaskForm = ({ onAddTask }) => {
  const navigate = useNavigate();
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
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
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
        <InputField
          name={"title"}
          labelTitle={"Title"}
          value={task.title}
          placeholder={"Task Title"}
          handleChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          required
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <InputField
          name={"dueDate"}
          labelTitle={"Due Date"}
          value={task.dueDate}
          type={"date"}
          handleChange={handleChange}
        />

        <label htmlFor="priority">Select Priority</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <div className="flex items-center justify-between gap-3  ">
          <span
            onClick={() => navigate("/")}
            className="bg-purple-600 p-2 rounded items-center"
          >
            <IoIosArrowBack size={25} color="white"/>
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
