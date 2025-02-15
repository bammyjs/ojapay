import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";


const TaskItem = ({ task, index, moveTask, onSelectTask }) => {
    const [, drag] = useDrag({
      type: "TASK",
      item: { index },
    });
  
    const [, drop] = useDrop({
      accept: "TASK",
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveTask(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });
  
    return (
      <div ref={(node) => drag(drop(node))} className="p-4 border mb-2 bg-white cursor-move" onClick={() => onSelectTask(task)}>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-600">Due: {task.dueDate} | Priority: {task.priority}</p>
        <p className={`text-sm ${task.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>{task.status}</p>
      </div>
    );
  };
  const TaskList = ({ onSelectTask }) => {
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
  };


  return (
    <div className="mt-4">
      {filteredTasks.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} moveTask={moveTask} onSelectTask={onSelectTask} />
      ))}
    </div>
  );
};

export default TaskList;