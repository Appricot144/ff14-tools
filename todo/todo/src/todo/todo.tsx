import { useEffect } from "react";
import type { Category, TaskData } from "./data/taskData";
import { TaskBoard, TaskList } from "./taskBoard";
import { TaskManagerContext } from "./taskManagerContext";
import { useTaskManager } from "./taskManager";
import { addDays, addWeeks, isBefore, nextDay } from "date-fns";

// dummy data
const tasklist: TaskData[] = [
  {
    id: 1,
    checked: true,
    name: "Limited Task 1",
    rewards: "Rewards 1",
    limit: new Date(2026, 2, 10, 0, 0),
    category: "Daily",
  },
  {
    id: 2,
    checked: true,
    name: "Limited Task 2",
    rewards: "Rewards 2",
    limit: new Date(1990, 1, 1, 0, 0),
    category: "Daily",
  },
  {
    id: 3,
    checked: true,
    name: "Task 3",
    rewards: "Rewards 3",
    category: "Weekly",
  },
  {
    id: 4,
    checked: false,
    name: "Task 4",
    rewards: "Rewards 4",
    category: "Daily",
  },
  {
    id: 100,
    checked: false,
    name: "inserted Task",
    rewards: "Special Rewards",
    category: "Daily",
  },
];

const initialTaskOrder = [1, 100, 2, 4, 3];

function TodoPage() {
  const taskManager = useTaskManager(tasklist, initialTaskOrder);

  return (
    <div className="bg-light rounded-2xl p-5">
      <TaskManagerContext value={taskManager}>
        <TaskBoard />
      </TaskManagerContext>
    </div>
  );
}

export { TodoPage };
