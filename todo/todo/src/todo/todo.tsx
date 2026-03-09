import { useEffect, useReducer, useState } from "react";
import type { Category, TaskData } from "./data/taskData";
import { TaskList } from "./taskList";
import { taskReducer } from "./taskReducer";

// dummy data
const tasklist: TaskData[] = [
  {
    id: 1,
    checked: true,
    name: "Task 1 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
    rewards: "Rewards 1",
    limit: new Date(2026, 3, 9),
    category: "Daily",
  },
  {
    id: 2,
    checked: true,
    name: "Task 2",
    rewards: "Rewards 2",
    limit: new Date(1990, 1, 1),
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

const initialTaskOrder = {
  daily: [1, 100, 2, 4],
  weekly: [3],
};

function TodoPage() {
  let [tasks, dispatch] = useReducer(taskReducer, tasklist);

  function checkTaskDeadline() {
    const now = new Date();
    const updatedTasks = tasks.map((task) => {
      if (task.limit && task.limit <= now) {
        return { ...task, checked: false };
      }
      return task;
    });
    dispatch({ type: "UPDATE_TASKS", tasks: updatedTasks });
    console.log("1. updated check status >> ", tasks);
  }

  useEffect(() => {
    checkTaskDeadline();
    // check task check status every hour
    const interval = setInterval(checkTaskDeadline, 60 * 60 * 1000);
    console.log("2. set interval !!");
    return () => clearInterval(interval);
  }, []);

  const dailyList = tasks.filter((t) => t.category === "Daily");
  const weeklyList = tasks.filter((t) => t.category === "Weekly");

  return (
    <div className="bg-light rounded-2xl p-5">
      <TaskList
        items={dailyList}
        order={initialTaskOrder.daily}
        onChange={dispatch}
        category="Daily"
      />
      <TaskList
        items={weeklyList}
        order={initialTaskOrder.weekly}
        onChange={dispatch}
        category="Weekly"
      />
    </div>
  );
}

export { TodoPage };
