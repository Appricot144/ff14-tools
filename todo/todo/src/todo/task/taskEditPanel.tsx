import { useEffect, useContext } from "react";
import { format } from "date-fns";
import {
  Button,
  DropIndicator,
  GridList,
  GridListItem,
  useDragAndDrop,
} from "react-aria-components";
import { TaskData } from "../data/taskData";
import { CheckIcon, DotsSixVerticalIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { TaskManagerContext } from "../taskManagerContext";
import type { useEditPanel } from "./editPanelHooks";

type EditHandlersType = ReturnType<typeof useEditPanel>["handlers"];

interface TaskEditProps {
  current: TaskData;
  edit: TaskData;
  subTaskList: TaskData[];
  handlers: EditHandlersType;
  onClose?: () => void;
}

function TaskEditPanel({
  current,
  edit,
  subTaskList,
  handlers,
  onClose,
}: TaskEditProps) {
  const { handlers: taskManagerHandlers } = useContext(TaskManagerContext)!;

  const { id, name, rewards, category, limit, note } = edit!;

  const handleSaveClick = () => {
    taskManagerHandlers.updateTasks([...subTaskList, edit]);
    onClose?.();
  };

  const handleCancelClick = () => {
    handlers.resetData();
    handlers.resetSubTask();
    onClose?.();
  };

  const handleAddSubTaskClick = () => {
    const childrenIds = handlers.addEmptySubTask(id, category);
    handlers.editData("children", childrenIds);
  };

  const { dragAndDropHooks } = useDragAndDrop({
    getItems(_keys, items: TaskData[]) {
      return items.map((item) => ({
        "text/plain": item.name ?? "",
        "subtask": JSON.stringify(item),
      }));
    },
    acceptedDragTypes: ["subtask"],
    getDropOperation: () => "move",
    onReorder(e) {
      const currentIds = subTaskList.map((t) => t.id);
      const movedKeys = [...e.keys].map(String);
      const targetKey = String(e.target.key);
      const targetIndex = currentIds.indexOf(targetKey);

      const remaining = currentIds.filter((id) => !movedKeys.includes(id));
      const insertIndex = e.target.dropPosition === "before"
        ? remaining.indexOf(targetKey) >= 0
          ? remaining.indexOf(targetKey)
          : targetIndex
        : (remaining.indexOf(targetKey) >= 0
          ? remaining.indexOf(targetKey) + 1
          : targetIndex + 1);

      remaining.splice(insertIndex, 0, ...movedKeys);
      handlers.reorderSubTask(remaining);
    },
    renderDropIndicator(target) {
      return (
        <DropIndicator target={target}>
          <svg
            height={4}
            className="block w-full stroke-primary fill-none"
          >
            <line x1={0} x2="100%" y1={2} y2={2} strokeWidth={2} />
          </svg>
        </DropIndicator>
      );
    },
  });

  // TODO: extraction data transform logic (current to edit)
  useEffect(() => {
    handlers.editData("checked", current.checked);
    if (current.limit) handlers.editData("limit", current.limit!);
  }, [current]);

  return (
    <div className="bg-grey text-lg text-dark font-sm text-sm rounded-2xl px-6 py-7 border-2 border-dark-grey">
      <div className="flex">
        <div className="mb-4 border-b-3 border-dark-grey grow pb-1">
          <input
            id="name"
            type="text"
            value={name ?? ""}
            className="w-full pl-1 pr-3 py-1 bg-light rounded-lg text-3xl font-bold focus:outline-hidden"
            placeholder="Task name ..."
            onChange={(e) => {
              handlers.editData("name", e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="size-8 rounded-full bg-transparent hover:bg-dark-grey/20 hover:shadow-sm relative -top-3 -right-3 shrinkrelative -top-3 -right-3 shrink"
          onClick={() => handleCancelClick()}
        >
          <XIcon size={17} className="m-auto" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2 mb-1">
        <div className="col-span-1 pb-1 border-b-1 border-dark-grey/30 text-dark/80">
          <label>Sub Tasks</label>
        </div>
        <div className="col-span-3 grid grid-cols gap-y-1">
          <div className="">
            <button
              type="button"
              className="w-full text-sm flex justify-center items-center gap-1 text-dark/70 rounded-lg border-1 border-dark-grey/20 bg-dark-grey/20 hover:bg-dark-grey/30"
              onClick={() => handleAddSubTaskClick()}
            >
              <PlusIcon size={12} weight="bold" />
              <span>add sub task</span>
            </button>
          </div>
          <GridList
            aria-label="sub task list"
            items={subTaskList}
            dragAndDropHooks={dragAndDropHooks}
            className="flex flex-col gap-y-1"
          >
            {(child) => (
              <GridListItem
                id={child.id}
                textValue={child.name ?? `subtask-${child.id}`}
                className="flex items-center gap-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Button slot="drag" className="cursor-grab text-dark-grey/50 hover:text-dark-grey">
                  <DotsSixVerticalIcon size={14} weight="bold" />
                </Button>
                <input
                  type="text"
                  value={child.name ?? ""}
                  placeholder="Sub task name ..."
                  className="w-full py-1 px-2 rounded-md bg-light focus:outline-hidden focus:shadow-md"
                  onChange={(e) => {
                    handlers.changeSubTaskField(child.id, "name", e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="text-dark-grey/50 hover:text-dark-grey shrink-0"
                  onClick={() => {
                    const childrenIds = handlers.deleteSubTask(child.id);
                    handlers.editData("children", childrenIds);
                  }}
                >
                  <XIcon size={14} weight="bold" />
                </button>
              </GridListItem>
            )}
          </GridList>
        </div>
        <div className="border-b-1 border-dark-grey/30 text-dark/80">
          <label htmlFor="rewards">Rewards</label>
        </div>
        <div className="bg-light w-full col-span-3 rounded-md">
          <input
            id="rewards"
            type="text"
            value={rewards ?? ""}
            className="w-full py-1 px-2 rounded-md focus:outline-hidden focus:shadow-md"
            placeholder="rewards ..."
            onChange={(e) => handlers.editData("rewards", e.target.value)}
          />
        </div>
        <div className="border-b-1 border-dark-grey/30 text-dark/80">
          <label htmlFor="category">Category</label>
        </div>
        <div className="bg-light w-full col-span-3 rounded-md">
          <select
            id="category"
            value={category}
            className="w-full py-1 px-2 rounded-md focus:outline-hidden focus:shadow-md"
            onChange={(e) => handlers.editData("category", e.target.value)}
          >
            <option className="text-medium text-dark-grey">
              choose a category
            </option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
            <option value="One-Time">One-Time</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="border-b-1 border-dark-grey/30 text-dark/80">
          <label htmlFor="limit">Limit</label>
        </div>
        <div className="bg-light w-full col-span-3 rounded-md">
          <input
            id="limit"
            type="datetime-local"
            value={limit ? format(limit, "yyyy-MM-dd'T'HH:mm") : ""}
            className="w-full py-1 px-2 rounded-md focus:outline-hidden focus:shadow-md"
            placeholder="choose task limit date"
            onChange={(e) =>
              handlers.editData("limit", new Date(e.target.value))
            }
          />
        </div>
        <div className="border-b-1 border-dark-grey/30 text-dark/80">
          <label htmlFor="note">Note</label>
        </div>
        <div className="bg-light w-full col-span-3 rounded-md">
          <textarea
            id="note"
            value={note ?? ""}
            className="w-full h-full py-1 px-2 rounded-md focus:outline-hidden focus:shadow-md"
            rows={4}
            cols={40}
            placeholder=""
            onChange={(e) => handlers.editData("note", e.target.value)}
          />
        </div>
        <div className="text-dark/80">
          <label htmlFor="option">Option</label>
        </div>
        <div className="col-start-4 col-span-1 py-1 px-2 flex items-center">
          <div className="flex">
            <input
              id="option"
              type="checkbox"
              name="option"
              value="note"
              className="appearance-none size-4 border-1 bg-light border-dark-grey rounded-md forcus:ring-2 focu:ring-brand-soft checked:bg-success"
            />
            <CheckIcon
              size={10}
              weight="bold"
              className="invisible peer-has-checked:visible text-light"
            />
          </div>
          <div className="flex justify-center items-center">
            <label htmlFor="option" className="m-auto font-medium">
              view note
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 text-sm">
        <button
          type="button"
          className="px-3 py-1 text-dark/70 rounded-xl border-1 border-dark-grey/20 bg-dark-grey/20 hover:bg-dark-grey/30"
          onClick={() => handleCancelClick()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-1 text-white bg-success/90 rounded-xl border-1 border-transparent hover:bg-success hover:border-success"
          onClick={() => handleSaveClick()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export { TaskEditPanel };
