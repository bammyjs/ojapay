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
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.tasks);

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

  return (
    //TODO: Work on toggle theme to have full control on color scheme>

    <DndProvider
      backend={TouchBackend}
      options={{ enableMouseEvents: true, enableTouchEvents: true }}
    >
      <ToastContainer />
      <Router>
        <div
          className={`relative w-full items-center flex flex-col  min-h-screen px-4 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          <Header />
          <div className="mt-24 w-full container max-w-7xl">
            <Routes>
              <Route path="/" element={<ListTaskItems />} />
              <Route path="/create-task" element={<CreateNewTask />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
