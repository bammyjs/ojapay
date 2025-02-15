import TaskList from "../components/TaskList";
// import taskImage from "../assets/business-task-management-illustration-concept-on-white-background-vector.jpg";
import { useState } from "react";
import TaskDetails from "../components/TaskDetails";
import { updateTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
const ListTaskItems = () => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  return (
    <section className="mt-10 w-full justify-center items-center h-fit flex flex-col md:flex-row gap-4 ">
      <TaskList onSelectTask={setSelectedTask} />
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onUpdateTask={(id, updatedTask) =>
            dispatch(updateTask({ id, updatedTask }))
          }
          onClose={() => setSelectedTask(null)}
        />
      )}
    </section>
  );
};

export default ListTaskItems;
