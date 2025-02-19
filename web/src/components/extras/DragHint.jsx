import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdHand } from "react-icons/io"; // Hand icon for drag

const DragHint = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-20 left-10 md:left-20 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <IoMdHand size={20} />
          <span>Drag tasks between columns!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DragHint;
