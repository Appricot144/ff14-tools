import { useState } from "react";
import type { TaskData } from "./data/taskData";
import { TaskList } from "./taskList";

// dummy data
const tasklist: TaskData[] = [
  {
    id: 1,
    checked: true,
    name: "Task 1 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
    rewards: "Rewards 1",
    category: "Daily",
  },
  {
    id: 2,
    checked: false,
    name: "Task 2",
    rewards: "Rewards 2",
    category: "Daily",
  },
  {
    id: 3,
    checked: false,
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

const initialTaskOrder = {
  daily: [1, 100, 2, 4],
  weekly: [3],
};

function TodoPage() {
  const dailyList = tasklist.filter((t) => t.category === "Daily");
  const weeklyList = tasklist.filter((t) => t.category === "Weekly");

  // TODO : implement drag and drop to reorder tasks
  // TODO : implement reset task check after limit

  return (
    <div className="bg-light rounded-2xl p-5">
      <TaskList
        items={dailyList}
        order={initialTaskOrder.daily}
        category="Daily"
      />
      <TaskList
        items={weeklyList}
        order={initialTaskOrder.weekly}
        category="Weekly"
      />
    </div>
  );
}

export { TodoPage };
