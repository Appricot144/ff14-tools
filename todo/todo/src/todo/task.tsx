import { DotsThreeIcon, CheckIcon } from "@phosphor-icons/react";
import { Button, GridListItem } from "react-aria-components";
import type { TaskData } from "./data/taskData";

// dummy data
const defaultTask: TaskData = {
  id: 0,
  name: "task area ...",
  rewards: "rewards area",
  category: "Daily",
  checked: true,
};

interface TaskProps {
  task: TaskData;
}

function Task({ task = defaultTask }: TaskProps) {
  const { id, name, rewards } = task;
  return (
    <GridListItem
      id={id}
      value={task}
      textValue={task.name}
      className="flex items-start rounded-xl mb-1 hover:border-1 border-dark-grey selected:border-1 selected:border-primary selected:bg-blue-200 outline-none "
    >
      <Button slot="drag">
        {/* <DotsSixVerticalIcon className="text-dark-grey" size={20} /> */}
      </Button>
      <div className="flex bg-grey rounded-xl min-w-full max-w-full px-3 py-2 gap-2">
        <div className="pt-1.5">
          <input type="checkbox" hidden />
          <button className="flex justify-center items-center rounded-full outline-1 outline-dark-grey bg-light w-5 h-5">
            <CheckIcon className="text-dark-grey" size={12} />
          </button>
        </div>
        <div className="flex flex-col flex-auto max-w-full">
          <div className="flex flex-row border-b-1 border-dark-grey gap-2 items-start justify-between min-w-full max-w-full pb-1">
            <div className="text-dark max-w-fit px-2 py-1">{name}</div>
            <button className="text-dark-grey px-2 py-1 rounded-full">
              <DotsThreeIcon size={20} />
            </button>
          </div>
          <div className="flex flex-row text-dark-grey px-2 pt-1">
            {rewards}
          </div>
        </div>
      </div>
    </GridListItem>
  );
}

export { Task };
