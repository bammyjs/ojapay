import { motion } from "framer-motion";
import ThemeToggle from "./extras/ToggleTheme";

const Header = () => {
  return (
    <motion.div
      className="fixed container max-w-7xl md:mt-4  md:rounded-3xl w-full bg-white shadow-md z-50 px-2 flex items-center justify-between h-20"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl text-gray-600 font-bold">
        Task Manager
      </h2>
      <ThemeToggle />
    </motion.div>
  );
};

export default Header;
