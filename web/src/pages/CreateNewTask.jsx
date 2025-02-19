import TaskForm from "../components/TaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const CreateNewTask = () => {
  const dispatch = useDispatch();

  return (
    <section className=" w-full justify-center items-center flex flex-col  gap-4 ">
      <div className="container max-w-7xl flex flex-col items-center mt-10  ">
        <TaskForm onAddTask={(task) => dispatch(addTask(task))} />
      </div>
    </section>
  );
};

export default CreateNewTask;
