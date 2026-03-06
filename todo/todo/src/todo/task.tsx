import { DotsThreeIcon, CheckIcon } from "@phosphor-icons/react";
import { Button, GridListItem } from "react-aria-components";
import type { TaskData } from "./data/taskData";

// dummy data
const deafultData = {
  name: "task area ...",
  rewards: "rewards area",
  checked: false,
  category: "Daily",
};

interface TaskProps {
  task: TaskData;
}

function Task({ task }: TaskProps) {
  const { id, name, rewards } = task || deafultData;
  return (
    <GridListItem
      id={id}
      value={task}
      textValue={task.name}
      className="flex rounded-2xl w-full mb-1  selected:border-primary selected:bg-primary/10 selected:border-1 selected:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <Button slot="drag" className="drag"></Button>
      <div className="flex bg-grey border-1 border-grey rounded-xl min-w-96 max-w-full px-3 py-2 gap-2 hover:bg-grey hover:border-1 hover:border-dark-grey hover:shadow-sm">
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
