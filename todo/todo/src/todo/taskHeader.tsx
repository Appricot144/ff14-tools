import { useContext } from "react";
import { isLeaf, TaskData, type Category } from "./data/taskData";
import { PlusIcon } from "@phosphor-icons/react";
import { TaskManagerContext } from "./taskManagerContext";

interface HeaderProps {
  category: Category;
}

function TaskHeader({ category }: HeaderProps) {
  const { listData, taskList, handlers } = useContext(TaskManagerContext)!;
  const items = taskList
    .filter((t) => t.category === category)
    .filter((t) => isLeaf(t));

  return (
    <div className="flex justify-between items-end border-b-2 border-dark-grey pb-2 px-2 mb-2">
      <div className="flex items-end gap-5">
        <h1 className="text-dark text-3xl font-bold">{category}</h1>
        <div className="bg-success text-sm text-light rounded-md px-2">
          {items.filter((t) => t.checked).length}/{items.length}
        </div>
      </div>
      <div>
        <button
          className="bg-primary text-sm text-white rounded-md transition ease-in delay-10 hover:bg-primary/80 hover:shadow-md flex justify-center items-center gap-0.5 py-0.5 px-2 cursor-pointer"
          onClick={() => {
            handlers.addTask(new TaskData(category));
          }}
        >
          <PlusIcon size={12} weight="bold" />
          <div className="relative -top-[1px]">new</div>
        </button>
      </div>
    </div>
  );
}

export { TaskHeader };
