import { useContext } from "react";
import { DotsThreeIcon, CheckIcon } from "@phosphor-icons/react";
import { Button, GridListItem } from "react-aria-components";
import type { TaskData } from "./data/taskData";
import { TaskManagerContext } from "./taskManagerContext";
import { format } from "date-fns";

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
  const { id, name, rewards, checked, limit } = task || deafultData;
  const { handlers } = useContext(TaskManagerContext)!;
  const { checkTask } = handlers;

  return (
    <GridListItem
      id={id}
      value={task}
      textValue={task.name}
      className="flex rounded-xl w-full mb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <Button slot="drag" className="drag"></Button>
      <div className="flex bg-grey border-1 border-grey rounded-xl min-w-96 max-w-full px-3 py-2 gap-1 hover:bg-grey hover:border-1 hover:border-dark-grey hover:shadow-sm">
        <div className="pt-1.5">
          <button
            onClick={() => checkTask(id)}
            data-ui={checked ? "checked" : ""}
            className="flex justify-center items-center w-7 h-7 rounded-full bg-light border-1 border-dark-grey focus:ring-2 focus:ring-light data-[ui=checked]:bg-success data-[ui=checked]:border-success"
          >
            <CheckIcon className="text-light" weight="bold" size={17} />
          </button>
        </div>
        <div className="flex flex-col flex-auto max-w-full">
          <div className="flex flex-row border-b-1 border-dark-grey gap-2 items-start justify-between min-w-full max-w-full pb-1">
            <div className="text-dark max-w-fit px-2 py-1">{name}</div>
            <button
              onClick={() => alert("clicked")}
              className="text-dark-grey px-1 rounded-md hover:shadow-sm"
            >
              <DotsThreeIcon size={20} />
            </button>
          </div>
          <div className="flex flex-row justify-between text-dark-grey px-2 pt-1">
            {rewards}
            <div>{limit ? format(limit, "M/dd H:mm") : ""}</div>
          </div>
        </div>
      </div>
    </GridListItem>
  );
}

export { Task };
