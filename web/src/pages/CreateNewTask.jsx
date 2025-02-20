import TaskForm from "../components/TaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const CreateNewTask = () => {
  const dispatch = useDispatch();

  return (
    <section className=" w-full pb-10 justify-center items-center flex flex-col gap-6">
      <h3 className="text-3xl text-gray-500 font-bold text-center ">
        Create New Task
      </h3>
      <TaskForm onAddTask={(task) => dispatch(addTask(task))} />
    </section>
  );
};

export default CreateNewTask;
