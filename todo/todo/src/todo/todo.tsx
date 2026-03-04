import { Task } from "./task";

type Category = "daily" | "weekly" | "monthly";

interface TaskData {
  id: number;
  checked: boolean;
  name?: string;
  rewards?: string;
  category: Category;
  note?: string;
}

// dummy data
const tasklist: TaskData[] = [
  {
    id: 1,
    checked: true,
    name: "Task 1 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
    rewards: "Rewards 1",
    category: "daily",
  },
  {
    id: 2,
    checked: false,
    name: "Task 2",
    rewards: "Rewards 2",
    category: "daily",
  },
  {
    id: 3,
    checked: false,
    name: "Task 3",
    rewards: "Rewards 3",
    category: "weekly",
  },
  {
    id: 4,
    checked: false,
    name: "Task 4",
    rewards: "Rewards 4",
    category: "daily",
  },
  {
    id: 100,
    checked: false,
    name: "inserted Task",
    rewards: "Special Rewards",
    category: "daily",
  },
];

const taskorder = {
  daily: [1, 100, 2, 4],
  weekly: [3],
};

function TodoPage() {
  const dailyTaskList = tasklist.filter((t) => t.category === "daily");
  const weeklyTaskList = tasklist.filter((t) => t.category === "weekly");

  // TODO : implement drag and drop to reorder tasks
  // TODO : implement reset task check after limit

  return (
    <>
      <div className="bg-light rounded-2xl p-5">
        <div
          id="dailyHeader"
          className="flex justify-between items-end border-b-2 border-dark-grey pb-2 mb-4"
        >
          <div className="flex items-end gap-5">
            <h1 className="text-4xl font-bold">Daily</h1>
            <div className="bg-success text-light rounded-xl px-2">
              {dailyTaskList.filter((t) => t.checked).length}/
              {dailyTaskList.length}
            </div>
          </div>
          <button className="bg-primary text-light px-3 py-1 rounded-xl flex items-center">
            new
          </button>
        </div>
        <div id="dailyBody" className="mb-5">
          {taskorder.daily.map((id) => {
            const task = tasklist.find((t) => t.id === id);
            if (!task) return null;
            return (
              <Task key={task.id} name={task.name} rewards={task.rewards} />
            );
          })}
        </div>
        <div
          id="weeklyHeader"
          className="flex justify-between items-end border-b-2 border-dark-grey pb-2 mb-4"
        >
          <div className="flex items-end gap-5">
            <h1 className="text-4xl font-bold">Weekly</h1>
            <div className="bg-info text-light rounded px-2">4/15</div>
          </div>
          <button className="bg-primary text-light px-3 py-1 rounded flex items-center">
            new
          </button>
        </div>
        <div id="weeklyBody">
          {taskorder.weekly.map((id) => {
            const task = tasklist.find((t) => t.id === id);
            if (!task) return null;
            return (
              <Task key={task.id} name={task.name} rewards={task.rewards} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export { TodoPage };
