import type { TaskData, Category } from "./data/taskData";

interface HeaderProps {
  tasks: TaskData[];
  category: Category;
}

function TaskHeader({ tasks, category }: HeaderProps) {
  const items = tasks.filter((t) => t.category === category);
  return (
    <div className="flex justify-between items-end border-b-2 border-dark-grey pb-2 mb-4">
      <div className="flex items-end gap-5">
        <h1 className="text-4xl font-bold">{category}</h1>
        <div className="bg-success text-light rounded-xl px-2">
          {items.filter((t) => t.checked).length}/{items.length}
        </div>
      </div>
      <button className="bg-primary text-light px-3 py-1 rounded-xl flex items-center">
        new
      </button>
    </div>
  );
}

export { TaskHeader };
