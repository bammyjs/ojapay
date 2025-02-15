import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/taskSlice";


const Header = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.tasks);
  
    const handleThemeToggle = () => {
      dispatch(toggleTheme());
      document.documentElement.classList.toggle("dark");
    };
    return (
      <div
        className={`w-full p-4 ${
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
      </div>
    );
  };

export default Header

