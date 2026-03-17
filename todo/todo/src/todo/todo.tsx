import { type TaskData } from "./data/taskData";
import { TaskBoard } from "./taskBoard";
import { TaskManagerContext } from "./taskManagerContext";
import { useTaskManager } from "./taskManager";
import { checkTaskDeadline } from "./util/taskUpdator";

// dummy data
const tasklist: TaskData[] = [
  {
    id: "1",
    checked: true,
    name: "------------------------------------- long task name ---------------------------------------",
    rewards: "Rewards 1",
    limit: new Date(2026, 2, 10, 0, 0, 0),
    category: "Daily",
  },
  {
    id: "2",
    checked: true,
    name: "Weekly Task 2",
    rewards: "Rewards 3",
    limit: new Date(1999, 0, 10, 5, 0, 0),
    category: "Weekly",
  },
  {
    id: "3",
    checked: false,
    name: "Task 3",
    rewards: "Rewards 4",
    category: "Daily",
  },
  {
    id: "5",
    checked: false,
    name: "Parent Task",
    rewards: "Special Rewards",
    limit: new Date(1999, 0, 10, 5, 0, 0),
    category: "Daily",
    children: ["6", "7", "8"],
  },
  {
    id: "6",
    checked: false,
    name: "Child Task1",
    rewards: "Special Rewards",
    category: "Daily",
    parent: "5",
  },
  {
    id: "7",
    checked: false,
    name: "Child Task2",
    rewards: "Special Rewards",
    category: "Daily",
    parent: "5",
  },
  {
    id: "8",
    checked: false,
    name: "Child Task3",
    rewards: "Special Rewards",
    category: "Daily",
    parent: "5",
  },
];

const initialTaskOrder = ["1", "3", "5", "6", "7", "8", "2"];

function TodoPage() {
  // validate
  const tasks = checkTaskDeadline(tasklist, (tasklist) => tasklist);
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
