import type { TaskData } from "../data/taskData";
import type { useTaskManager } from "./taskManager";

type TaskListHandlerType = ReturnType<typeof useTaskManager>["handlers"];

interface TaskBoardHeaderProps {
  taskList: TaskData[];
  taskListHandler: TaskListHandlerType;
}

function TaskBoardHeader({ taskList, taskListHandler }: TaskBoardHeaderProps) {
  const handlers = taskListHandler;
  return (
    <div className="flex flex-row justify-between items-end bg-dark/2 rounded-xl p-2 mb-3">
      <h1 className="text-4xl font-bold text-dark">Todo</h1>
      <div
        id="task-template-panel"
        className="flex flex-row justify-end items-end gap-1"
      >
        <button
          className="px-2 py-1 rounded-md bg-primary hover:bg-primary/80 text-light text-sm hover:shadow-sm hover:cursor-pointer"
          onClick={() => alert("select tempalte")}
        >
          select template
        </button>
        <button
          className="px-2 py-1 rounded-md bg-primary hover:bg-primary/80 text-light text-sm hover:shadow-sm hover:cursor-pointer"
          onClick={() => alert("save tempalte")}
        >
          save template
        </button>
      </div>
    </div>
  );
}

export {TaskBoardHeader};