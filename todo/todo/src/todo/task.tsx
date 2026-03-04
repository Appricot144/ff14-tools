import {
  DotsThreeIcon,
  DotsSixVerticalIcon,
  CheckIcon,
} from "@phosphor-icons/react";

interface TaskProps {
  name?: string;
  rewards?: string;
}

function Task({ name = "task area ...", rewards = "rewards area" }: TaskProps) {
  return (
    <div className="flex rounded-2xl w-full mb-1">
      <div className="pt-2">
        <DotsSixVerticalIcon className="text-dark-grey" size={23} />
      </div>
      <div className="flex bg-grey rounded-xl min-w-96 max-w-full px-3 py-2 gap-2">
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
    </div>
  );
}

export { Task };
