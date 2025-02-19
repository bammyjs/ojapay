import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { shortenText } from "../utils";
import { IoMdTrash, IoMdCreate, IoMdEye, IoMdCalendar } from "react-icons/io";
import { useState } from "react";
import TaskModal from "./TaskModal";
import { motion } from "framer-motion";

const TaskItem = ({ task, onDeleteTask, onEditTask }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <>
      {/* Main Task Card */}
      <div className="w-full flex p-2 justify-between rounded-lg bg-gray-700 shadow-sm hover:shadow-md">
        {/* Draggable Section */}
        <motion.div
          whileHover={{
            scale: 1.0,
            boxShadow: "0px 0px 10px rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.2 }}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="w-[80%] cursor-grab space-y-2 bg-gray-700 rounded-lg p-2 md:p-4"
          style={style}
          onClick={() => {
            setEditMode(false); // Open in preview mode
            setSelectedTask(task);
            setModalOpen(true);
          }}
        >
          <h3 className="capitalize text-xl font-medium text-white">
            {shortenText(task.title, 20)}
          </h3>
          <p className="capitalize text-sm text-gray-300">
            {shortenText(task.description, 10)}
          </p>
          <p className="flex items-center gap-1 text-sm text-orange-400">
            <IoMdCalendar /> {shortenText(task.dueDate, 20)}
          </p>
          <p className="capitalize text-sm text-gray-300">
            Status: {task.status}
          </p>
        </motion.div>

        {/* Menu */}
        <div className="w-16 flex flex-col items-center space-y-2  bg-gray-800 text-white rounded-md shadow-md py-2 md:p-2 z-10">
          {/* Edit Task */}
          <button
            className="w-10 flex flex-col items-center  p-2 hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(true);
              setSelectedTask(task);
              setModalOpen(true);
            }}
          >
            <IoMdCreate />
          </button>

          {/* View Task */}
          <button
            className="w-10 flex flex-col items-center p-2 hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(false);
              setSelectedTask(task);
              setModalOpen(true);
            }}
          >
            <IoMdEye size={16} />
          </button>

          {/* Delete Task */}
          <button
            className="w-10 flex flex-col items-center p-2 text-red-400 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task.id);
            }}
          >
            <IoMdTrash size={16} />
          </button>
        </div>
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          isOpen={modalOpen}
          task={selectedTask}
          isEditMode={editMode}
          onClose={() => setModalOpen(false)}
          onSave={(id, updatedTask) => {
            onEditTask(id, updatedTask);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;
