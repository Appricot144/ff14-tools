import { Task } from "./task/task";
import { type TaskData, type Category } from "./data/taskData";
import {
  DropIndicator,
  GridList,
  useDragAndDrop,
  useListData,
} from "react-aria-components";

interface TaskListProps {
  category: Category;
  tasks: TaskData[];
}

function TaskList({ category, tasks }: TaskListProps) {
  const list = useListData({
    initialItems: tasks,
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys, items: TaskData[]) =>
      items.map((item) => ({
        "text/plain": item.name ?? "task name",
        "task-id": item.id.toString(),
      })),
    acceptedDragTypes: ["task-id"],
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
    onDragEnd(e) {
      if (e.dropOperation === "move") {
        // TODO : update task order
        console.log(
          "task order updated",
          list.items.map((i) => i.id),
        );
      }
    },
    renderDropIndicator(target) {
      return (
        <DropIndicator target={target}>
          <svg
            height={15}
            className="block w-full stroke-blue-500 fill-none forced-colors:stroke-[Highlight]"
          >
            <circle cx={5} cy={5} r={5 - 1} strokeWidth={2} />
            <line
              x1={20}
              x2="100%"
              transform="translate(-10 0)"
              y1={5}
              y2={5}
              strokeWidth={2}
            />
            <circle
              cx="100%"
              cy={5}
              r={5 - 1}
              transform="translate(-5 0)"
              strokeWidth={2}
            />
          </svg>
        </DropIndicator>
      );
    },
  });
  return (
    <>
      <div className="flex justify-between items-end border-b-2 border-dark-grey pb-2 mb-4">
        <div className="flex items-end gap-5">
          <h1 className="text-4xl font-bold">{category}</h1>
          <div className="bg-success text-light rounded-md px-2">
            {tasks.filter((t) => t.checked).length}/{tasks.length}
          </div>
        </div>
        <button className="bg-primary text-light px-3 py-1 rounded-xl flex items-center">
          new
        </button>
      </div>
      <div className="mb-5">
        <GridList
          aria-label="Task List"
          selectionMode="multiple"
          items={list.items}
          dragAndDropHooks={dragAndDropHooks}
          renderEmptyState={() => "No tasks."}
          className="drop-target:bg-blue-200"
        >
          {(item) => <Task task={item} />}
        </GridList>
      </div>
    </>
  );
}

export { TaskList };
