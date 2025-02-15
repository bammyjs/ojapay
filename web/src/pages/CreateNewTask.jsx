import TaskForm from "../components/TaskForm";
import taskImage from "../assets/business-task-management-illustration-concept-on-white-background-vector.jpg";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const CreateNewTask = () => {
  const dispatch = useDispatch();

  return (
    <section className="mt-10 w-full justify-center items-center h-fit flex flex-col md:flex-row gap-4 ">
      <div className="container max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="md:w-[65%]  h-full item-center ">
          <img className="w-full h-auto rounded" src={taskImage} alt="" />
        </div>
        <TaskForm onAddTask={(task) => dispatch(addTask(task))} />
      </div>
    </section>
  );
};

export default CreateNewTask;
