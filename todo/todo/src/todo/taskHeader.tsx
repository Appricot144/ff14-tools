import { useContext } from "react";
import { TaskData, type Category } from "./data/taskData";
import { PlusIcon } from "@phosphor-icons/react";
import { TaskManagerContext } from "./taskManagerContext";

interface HeaderProps {
  tasks: TaskData[];
  category: Category;
}

function TaskHeader({ tasks, category }: HeaderProps) {
  const { listData, handlers } = useContext(TaskManagerContext)!;
  const items = tasks
    .filter((t) => t.category === category)
    .filter((t) => !t.children);

  const lastIdByCategory = (cate: Category) => {
    const last = listData.items.filter((i) => i.category === cate).at(-1);
    return last ? last.id : TaskData.newId();
  };

  return (
    <div className="flex justify-between items-end border-b-2 border-dark-grey pb-2 mb-4">
      <div className="flex items-end gap-5">
        <h1 className="text-4xl font-bold">{category}</h1>
        <div className="bg-success text-sm text-light rounded-md px-2">
          {items.filter((t) => t.checked).length}/{items.length}
        </div>
      </div>
      <div>
        <button
          className="bg-primary text-sm text-light rounded-lg hover:bg-primary/90 flex justify-center items-center py-1 px-2"
          onClick={() =>
            handlers.addTask(lastIdByCategory(category), new TaskData(category))
          }
        >
          <PlusIcon size={15} weight="bold" />
          <div className="relative -top-[1px] mx-1">add</div>
        </button>
      </div>
    </div>
  );
}

export { TaskHeader };
