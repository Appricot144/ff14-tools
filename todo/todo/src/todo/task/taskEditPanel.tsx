import { useEffect, useContext } from "react";
import { format } from "date-fns";
import { TaskData } from "../data/taskData";
import { XIcon } from "@phosphor-icons/react";
import { TaskManagerContext } from "../taskManagerContext";
import type { useEditPanel } from "./editPanelHooks";

type EditHandlers = ReturnType<typeof useEditPanel>["handlers"];

interface TaskEditProps {
  current: TaskData;
  edit: TaskData;
  handlers: EditHandlers;
  onClose?: () => void;
}

function TaskEditPanel({ current, edit, handlers, onClose }: TaskEditProps) {
  const { taskList, handlers: taskManagerHandlers } =
    useContext(TaskManagerContext)!;

  const { id, name, rewards, category, limit, note } = edit!;

  const stopArrowPropagation = (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.stopPropagation();
  };

  // TODO: extraction data transform logic (current to edit)
  useEffect(() => {
    handlers.editData("checked", current.checked);
    if (current.limit) handlers.editData("limit", current.limit!);
  }, [current]);

  return (
    <div className="bg-grey text-lg text-dark font-sm rounded-2xl px-6 py-7 border-2 border-dark-grey">
      <div className="flex">
        <div className="mb-5 border-b-3 border-dark-grey grow">
          <input
            id="name"
            type="text"
            value={name ?? ""}
            className="w-full pl-1 pr-3 py-2 text-3xl font-bold focus:outline-hidden"
            placeholder="Task name ..."
            onChange={(e) => {
              handlers.editData("name", e.target.value);
              stopArrowPropagation;
            }}
            onKeyDown={stopArrowPropagation}
          />
        </div>
        <div className="relative -top-2 -right-2 shrink">
          <button
            type="button"
            className="h-9 w-9 rounded-full bg-transparent hover:bg-dark-grey/20 hover:shadow-sm"
            onClick={() => onClose?.()}
          >
            <XIcon size={17} className="m-auto" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <div className="border-b-2 border-light font-medium">
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
            onKeyDown={stopArrowPropagation}
          />
        </div>
        <div className="border-b-2 border-light font-medium">
          <label htmlFor="category">Category</label>
        </div>
        <div className="bg-light w-full col-span-3 rounded-md">
          <select
            id="category"
            value={category}
            className="w-full py-1 px-2 rounded-md focus:outline-hidden focus:shadow-md"
            onChange={(e) => handlers.editData("category", e.target.value)}
            onKeyDown={stopArrowPropagation}
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
        <div className="border-b-2 border-light font-medium">
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
            onKeyDown={stopArrowPropagation}
          />
        </div>
        <div className="border-b-2 border-light font-medium">
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
            onKeyDown={stopArrowPropagation}
          />
        </div>
        <div className="font-medium">
          <label htmlFor="option">Option</label>
        </div>
        <div className="col-start-4 col-span-1 py-1 px-2 flex justify-between items-center">
          <input
            id="option"
            type="checkbox"
            className="w-5 h-5 mt-1 border-none rounded-xl forcus:ring-2 focu:ring-brand-soft checked:bg-success"
          />
          <label htmlFor="option" className="font-medium">
            view note
          </label>
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <button
          type="button"
          className="px-2 text-dark/80 rounded-md border-1 border-dark-grey/70 hover:bg-dark-grey/10 hover:shadow-sm"
          onClick={() => {
            handlers.resetData();
            onClose?.();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex px-4 text-white bg-success/90 rounded-md border-1 border-transparent hover:bg-success hover:border-success hover:shadow-sm"
          onClick={() => {
            taskManagerHandlers.editTask(id, edit);
            onClose?.();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export { TaskEditPanel };
