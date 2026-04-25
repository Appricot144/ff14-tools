import { DropIndicator, GridList, useDragAndDrop } from "react-aria-components";
import { type Category, type TaskData } from "../data/taskData";
import { Task } from "../task/task";
import { useContext, useEffect } from "react";
import { TaskManagerContext } from "./taskManagerContext";
import { TaskListHeader } from "./taskListHeader";
import type { useTaskManager } from "./taskManager";
import { TaskBoardHeader } from "./taskBoardHeader";

function TaskBoard() {
  const { taskList, handlers } = useContext(TaskManagerContext)!;

  // update checked variable to false & task limit
  useEffect(() => {
    const now = new Date();
    const checkedTasks = taskList.filter((t) => t.checked);
    const existsExpired = checkedTasks.some((t) => t.limit <= now);
    if (existsExpired) {
      handlers.expireTasks();
      return;
    }

    const next = checkedTasks.reduce<TaskData | null>((soonest, task) => {
      if (soonest === null || task.limit.getTime() < soonest.limit.getTime()) {
        return task;
      }
      return soonest;
    }, null);
    if (!next) return;

    // 時間が来たら再レンダリングをトリガー
    const delay = Math.max(0, next.limit.getTime() - now.getTime());
    const timer = setTimeout(handlers.rerender, delay);
    
    return () => clearTimeout(timer);
  }, [taskList, handlers]);

  return (
    <div>
      <TaskBoardHeader taskList={taskList} taskListHandler={handlers} />
      <div className="flex flex-wrap gap-4">
        <TaskList category="Daily" />
        <TaskList category="Weekly" />
      </div>
    </div>
  );
}

interface TaskListProps {
  category: Category;
}

function TaskList({ category }: TaskListProps) {
  const { listData } = useContext(TaskManagerContext)!;
  const items = listData.items.filter((item) => item.category === category);

  let { dragAndDropHooks } = useDragAndDrop({
    getItems(_keys, items: TaskData[]) {
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
            <circle cx={5} cy={5} r={5 - 1} strokeWidth={1} />
            <line
              x1={20}
              x2="100%"
              transform="translate(-10 0)"
              y1={5}
              y2={5}
              strokeWidth={1}
            />
            <circle
              cx="100%"
              cy={5}
              r={5 - 1}
              transform="translate(-5 0)"
              strokeWidth={1}
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
    <div className="flex flex-col grow p-2 bg-dark/2 rounded-xl">
      <TaskListHeader category={category} />
      <div className="bg-transarent rounded-xl mb-5">
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
    </div>
  );
}

export { TaskBoard, TaskList };
