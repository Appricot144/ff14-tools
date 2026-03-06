import {
  DropIndicator,
  GridList,
  useDragAndDrop,
  useListData,
} from "react-aria-components";
import { type TaskData } from "./data/taskData";
import { Task } from "./task";

interface TaskListProps {
  items: TaskData[];
  order: number[];
  category: string;
}

function TaskList({ items, order, category }: TaskListProps) {
  // Sort items based on order
  const sortedItems = items.sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );

  let list = useListData({
    initialItems: sortedItems,
  });

  let { dragAndDropHooks } = useDragAndDrop({
    getItems(keys, items: TaskData[]) {
      return items.map((item) => {
        return {
          "text/plain": `${item.name} – ${item.rewards}`,
          task: JSON.stringify(item),
        };
      });
    },
    acceptedDragTypes: ["task"],
    getDropOperation: () => "move",
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
      // FIXME: store new order to state
      const newOrder = list.items.map((item) => item.id);
      console.log("new order:", newOrder);
    },
    renderDropIndicator(target) {
      return (
        <DropIndicator target={target}>
          <svg
            height={15}
            className="block w-full stroke-primary fill-none forced-colors:stroke-[Highlight]"
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
    renderDragPreview(items) {
      return (
        <div className="flex opacity-100">
          {items.map((item) => (
            <Task key={item.id} task={JSON.parse(item.toString())} />
          ))}
        </div>
      );
    },
  });

  return (
    <>
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
      <div className="mb-5">
        <GridList
          aria-label={`${category} tasks`}
          selectionMode="multiple"
          items={list.items}
          renderEmptyState={() => <p>No tasks ...</p>}
          dragAndDropHooks={dragAndDropHooks}
        >
          {(item) => <Task task={item} />}
        </GridList>
      </div>
    </>
  );
}

export { TaskList };
