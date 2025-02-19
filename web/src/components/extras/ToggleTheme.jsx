import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/taskSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.tasks);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark");
  };
  return (
    <>
      <div>
        <input
          type="checkbox"
          className="peer absolute -left-[65rem]"
          id="dn-toggle-bs"
          checked={theme === "dark"}
          onChange={handleThemeToggle}
        />
        <label
          htmlFor="dn-toggle-bs"
          className="toggle relative inline-block h-6 w-12 cursor-pointer overflow-clip rounded-full border border-sky-300 bg-sky-300 transition-colors duration-200 peer-checked:border-sky-800 peer-checked:bg-sky-800 peer-disabled:cursor-not-allowed peer-checked:[&_.crater]:opacity-100 peer-checked:[&_.star-1]:left-2 peer-checked:[&_.star-1]:top-3 peer-checked:[&_.star-1]:h-0.5 peer-checked:[&_.star-1]:w-0.5 peer-checked:[&_.star-2]:left-4 peer-checked:[&_.star-2]:top-1.5 peer-checked:[&_.star-2]:h-1 peer-checked:[&_.star-2]:w-1 peer-checked:[&_.star-3]:left-4 peer-checked:[&_.star-3]:top-4 peer-checked:[&_.star-3]:h-0.5 peer-checked:[&_.star-3]:w-0.5 peer-checked:[&_.toggle-handler]:-left-4 peer-checked:[&_.toggle-handler]:translate-x-10 peer-checked:[&_.toggle-handler]:rotate-0 peer-checked:[&_.toggle-handler]:bg-amber-100"
        >
          <span className="toggle-handler relative left-0 top-0 z-10 inline-block h-6 w-6 -rotate-45 rounded-full bg-amber-300 shadow transition-all duration-[400ms]">
            <span className="crater absolute left-1 top-2 h-px w-px rounded-full bg-amber-200 opacity-0 transition-opacity duration-200"></span>
            <span className="crater absolute left-2.5 top-3.5 h-1 w-1 rounded-full bg-amber-200 opacity-0 transition-opacity duration-200"></span>
            <span className="crater absolute left-3 top-1 h-1.5 w-1.5 rounded-full bg-amber-200 opacity-0 transition-opacity duration-200"></span>
          </span>
          <span className="star-1 absolute left-3 top-4 h-4 w-4 rounded-full bg-white transition-all duration-300"></span>
          <span className="star-2 absolute left-6 top-3.5 h-4 w-4 rounded-full bg-white transition-all duration-300"></span>
          <span className="star-3 absolute left-9 top-2 h-5 w-5 rounded-full bg-white transition-all duration-300"></span>
          <span className="sr-only">toggle switch</span>
        </label>
      </div>
      {/*<!-- End Lg sized day/night toggle button -->*/}
    </>
  );
};

export default ThemeToggle;
