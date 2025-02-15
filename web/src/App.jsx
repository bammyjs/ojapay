import { useState } from "react";
import { DndProvider } from "react-dnd";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTask, setFilter, setSearchQuery, updateTask } from "./redux/taskSlice";

function App() {
  const dispatch = useDispatch();
  const { filter, searchQuery } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-black">Task Manager</h1>
        <div className="mb-4 flex gap-2 justify-center">
          <button
            onClick={() => dispatch(setFilter("all"))}
            className={
              filter === "all"
                ? "bg-blue-600 text-white p-2 rounded"
                : "p-2 border rounded"
            }
          >
            All
          </button>
          <button
            onClick={() => dispatch(setFilter("active"))}
            className={
              filter === "active"
                ? "bg-blue-600 text-white p-2 rounded"
                : "p-2 border rounded"
            }
          >
            Active
          </button>
          <button
            onClick={() => dispatch(setFilter("completed"))}
            className={
              filter === "completed"
                ? "bg-blue-600 text-white p-2 rounded"
                : "p-2 border rounded"
            }
          >
            Completed
          </button>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full p-2 mb-4 border border-black rounded text-black"
        />
        <TaskForm onAddTask={(task) => dispatch(addTask(task))} />
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
      </div>
    </DndProvider>
  );
}

export default App;
