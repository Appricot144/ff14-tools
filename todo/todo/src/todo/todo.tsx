import { TaskBoard } from "./taskBoard";
import { TaskManagerContext } from "./taskManagerContext";
import { useTaskManager } from "./taskManager";
import { checkTaskDeadline, validateLimit } from "./util/taskUpdator";
import { fixedTaskList, initialTaskOrder } from "./data/dummyData";

function TodoPage() {
  // validate
  const vtasks = validateLimit(fixedTaskList);
  const tasks = checkTaskDeadline(vtasks, (tasklist) => tasklist);
  const taskManager = useTaskManager([...tasks!], initialTaskOrder);
  return (
    <div>
      <TaskManagerContext value={taskManager}>
        <TaskBoard />
      </TaskManagerContext>
    </div>
  );
}

export { TodoPage };
