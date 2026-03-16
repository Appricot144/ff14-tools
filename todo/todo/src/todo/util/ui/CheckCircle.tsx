import { CheckIcon } from "@phosphor-icons/react";

interface CheckCircleProps {
  onCheck: (id: string) => void;
  taskId: string;
  checked: boolean;
  size: number;
  className?: string;
}

function CheckCircle({
  onCheck,
  taskId,
  checked,
  size,
  className,
}: CheckCircleProps) {
  return (
    <div className={className}>
      <button
        onClick={() => onCheck(taskId)}
        data-ui={checked ? "checked" : ""}
        className={`flex justify-center items-center size-full rounded-full bg-light border-1 border-dark-grey focus:ring-2 focus:ring-light data-[ui=checked]:bg-success data-[ui=checked]:border-success cursor-pointer`}
      >
        <CheckIcon className="text-light m-1" weight="bold" size={size} />
      </button>
    </div>
  );
}

export { CheckCircle };
