// App.jsx
// import { useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

// import { HTML5Backend } from "react-dnd-html5-backend";
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
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.tasks);
  // const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      if (savedTheme !== theme) {
        dispatch(toggleTheme());
      }
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [dispatch, theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <DndProvider
      backend={TouchBackend}
      options={{ enableMouseEvents: true, enableTouchEvents: true }}
    >
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
            <Route path="/" element={<ListTaskItems />} />
            <Route path="/create-task" element={<CreateNewTask />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
