// App.jsx
// import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./redux/taskSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateNewTask from "./pages/CreateNewTask";
import ListTaskItems from "./pages/ListTaskItems";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.tasks);
  // const [selectedTask, setSelectedTask] = useState(null);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ToastContainer />
      <Router>
        <div
          className={`min-h-screen p-4 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          <div className="w-full h-20  px-2 items-center bg-white mb-4 flex justify-between ">
            <h2 className="text-3xl md:text-4xl text-gray-600 font-bold ">
              Task Manager
            </h2>
            <button onClick={handleThemeToggle} className="p-2 border rounded">
              Toggle Theme
            </button>
          </div>

          <Routes>
            <Route path="/" element={<CreateNewTask />} />
            <Route path="/tasks" element={<ListTaskItems />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
