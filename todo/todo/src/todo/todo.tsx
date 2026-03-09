import { useEffect, useReducer, useState } from "react";
import type { Category, TaskData } from "./data/taskData";
import { TaskList } from "./taskList";
import { taskReducer } from "./taskReducer";
import { format, isBefore } from "date-fns";

// dummy data
const tasklist: TaskData[] = [
  {
    id: 1,
    checked: true,
    name: "Task 1 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
    rewards: "Rewards 1",
    limit: new Date(2026, 3, 9, 0, 0),
    category: "Daily",
  },
  {
    id: 2,
    checked: true,
    name: "Task 2",
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

const initialTaskOrder = {
  daily: [1, 100, 2, 4],
  weekly: [3],
};

function TodoPage() {
  let [tasks, dispatch] = useReducer(taskReducer, tasklist);

  function checkTaskDeadline() {
    const updatedTasks = tasks.map((task) => {
      if (task.limit) {
        return { ...task, checked: task.limit.getTime() <= Date.now() };
      }
      return task;
    });
    dispatch({ type: "UPDATE_TASKS", tasks: updatedTasks });
    // FIXME: store tasks data
    console.log("1. updated check status >> ", tasks);
  }

  useEffect(() => {
    checkTaskDeadline();
    // check task check status every hour
    const interval = setInterval(checkTaskDeadline, 10 * 1000);
    console.log("2. set interval !!");
    return () => clearInterval(interval);
  }, []);

  const dailyList = tasks.filter((t) => t.category === "Daily");
  const weeklyList = tasks.filter((t) => t.category === "Weekly");

  return (
    <div className="bg-light rounded-2xl p-5">
      <TaskList
        items={dailyList}
        initialOrder={initialTaskOrder.daily}
        onChange={dispatch}
        category="Daily"
      />
      <TaskList
        items={weeklyList}
        initialOrder={initialTaskOrder.weekly}
        onChange={dispatch}
        category="Weekly"
      />
    </div>
  );
}

export { TodoPage };
