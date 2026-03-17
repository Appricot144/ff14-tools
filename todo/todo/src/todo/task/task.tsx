import { Dialog } from "../../util/dialog";
import { useState, useContext } from "react";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { Button, GridListItem } from "react-aria-components";
import { isChild, TaskData } from "../data/taskData";
import { TaskManagerContext } from "../taskManagerContext";
import { format } from "date-fns";
import { TaskEditPanel } from "./taskEditPanel";
import { useEditPanel } from "./editPanelHooks";
import { CheckCircle } from "../util/ui/CheckCircle";

interface TaskProps {
  task: TaskData;
}

function Task({ task }: TaskProps) {
  const { id, name, rewards, checked, limit } = task || new TaskData("Daily");
  const { taskList, handlers: taskHandlers } = useContext(TaskManagerContext)!;
  const { checkTask, updateTasks } = taskHandlers;

  const [isOpen, setIsOpen] = useState(false);
  const {
    edit,
    subTaskList,
    handlers: editHandlers,
  } = useEditPanel(task, taskList);

  const children = taskList.filter((t) => t.parent === task.id);

  if (isChild(task)) {
    return null;
  }

  const handleParentTaskCheck = (id: string) => {
    if (!task.children || !task.children.length) {
      checkTask(id);
      return;
    }

    const value = !task.checked;
    const updatedTasks = children.map((t) => {
      return { ...t, checked: value };
    });
    updateTasks([{ ...task, checked: value }, ...updatedTasks]);
    return;
  };

  return (
    <>
      <GridListItem
        id={id}
        value={task}
        textValue={task.name ?? "no name task"}
        className="flex rounded-xl w-full mb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <Button slot="drag" className="drag"></Button>
        <div className="flex bg-grey border-1 border-grey rounded-xl min-w-96 max-w-full px-3 py-2 gap-1 hover:bg-grey hover:border-1 hover:border-dark-grey hover:shadow-sm">
          <div className="pt-1">
            <CheckCircle
              onCheck={() => handleParentTaskCheck(id)}
              taskId={id}
              checked={checked}
              size={15}
            />
          </div>
          <div className="flex flex-col flex-auto max-w-full">
            <div className="flex flex-col border-b-1 border-dark-grey">
              <div className="flex flex-row gap-2 items-center justify-between min-w-full max-w-full pb-1">
                <div
                  className={`${name === "" ? "text-dark-grey" : "text-dark"} max-w-fit px-2 py-1`}
                >
                  {name === "" ? "no name task" : name}
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-dark-grey px-1 rounded-md hover:shadow-sm"
                >
                  <DotsThreeIcon size={15} />
                </button>
              </div>
              {children.length !== 0 ? (
                <div className="flex flex-col pb-1">
                  {children.map((child) => (
                    <ChildTask key={child.id} task={child} />
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex flex-row items-center justify-between text-dark-grey text-sm p-1">
              {rewards}
              <div className="text-sm">
                {limit ? format(limit, "M/dd H:mm") : ""}
              </div>
            </div>
          </div>
        </div>
        <Dialog
          isOpen={isOpen}
          onClose={() => {
            editHandlers.resetSubTask();
            editHandlers.resetData();
            setIsOpen(false);
          }}
        >
          <TaskEditPanel
            current={task}
            edit={edit}
            subTaskList={subTaskList}
            handlers={editHandlers}
            onClose={() => setIsOpen(false)}
          />
        </Dialog>
      </GridListItem>
    </>
  );
}

function ChildTask({ task }: TaskProps) {
  const { handlers: taskHandlers } = useContext(TaskManagerContext)!;
  const { checkTask } = taskHandlers;

  return (
    <div className="flex flex-row items-center gap-1 items-center min-w-full max-w-full">
      <CheckCircle
        className=""
        onCheck={checkTask}
        taskId={task.id}
        checked={task.checked}
        size={15}
      />
      <div
        className={`${task.name === "" ? "text-dark-grey" : "text-dark"} max-w-fit px-2 py-1`}
      >
        {task.name === "" ? "no name task" : task.name}
      </div>
    </div>
  );
}
export { Task };
