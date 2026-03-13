import { DropIndicator, GridList, useDragAndDrop } from "react-aria-components";
import { type Category, type TaskData } from "./data/taskData";
import { Task } from "./task/task";
import { useContext, useEffect, useRef } from "react";
import { TaskManagerContext } from "./taskManagerContext";
import { TaskHeader } from "./taskHeader";
import { checkTaskDeadline } from "./util/taskUpdator";

function TaskBoard() {
  const { taskList, handlers } = useContext(TaskManagerContext)!;
  const taskListRef = useRef<TaskData[]>(taskList);

  useEffect(() => {
    taskListRef.current = taskList;
  }, [taskList]);

  useEffect(() => {
    // check task check status every hour (here every 3s for demo)
    const interval = setInterval(() => {
      checkTaskDeadline(taskListRef.current, handlers.updateTasks);
    }, 5 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TaskList category="Daily" />
      <TaskList category="Weekly" />
    </>
  );
}

interface TaskListProps {
  category: Category;
}

function TaskList({ category }: TaskListProps) {
  const { listData } = useContext(TaskManagerContext)!;
  const items = listData.items.filter((item) => item.category === category);

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
        listData.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        listData.moveAfter(e.target.key, e.keys);
      }
    },
    onDragEnd() {
      // FIXME: store new order to state
      console.log(
        "new order:",
        listData.items.map((item) => item.id),
      );
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
        <div className="drag-preview">
          <div className="flex items-center m-1 py-2 px-2 gap-2 bg-grey text-dark-grey rounded-md outline-1 outline-dark-grey">
            <span>Dragging Task </span>
            <span className="badge bg-light px-1 text-dark-grey rounded-sm">
              {items.length}
            </span>
          </div>
        </div>
      );
    },
  });

  return (
    <>
      <TaskHeader tasks={items} category={category} />
      <div className="mb-5">
        <GridList
          aria-label="task list"
          selectionMode="single"
          items={items}
          renderEmptyState={() => <p>No tasks ...</p>}
          dragAndDropHooks={dragAndDropHooks}
        >
          {(item) => <Task task={item} />}
        </GridList>
      </div>
    </>
  );
}

export { TaskBoard, TaskList };
