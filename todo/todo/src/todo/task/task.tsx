import { Dialog } from "../../util/dialog";
import {
  Dialog as AriaDialog,
  DialogTrigger,
  Modal,
} from "react-aria-components";
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
  const { id, name, rewards, checked, limit } = task;
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

  const taskNameColor = name === "" ? "text-dark-grey" : "text-dark/80";
  const taskName = name === "" ? "no name task" : name;

  return (
    <>
      <GridListItem
        id={id}
        value={task}
        textValue={task.name ?? `no name task : ${task.id}`}
        className="flex rounded-xl mb-1 transition ease-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <Button slot="drag" className="drag"></Button>
        <div className="flex bg-light border-1 border-light rounded-xl min-w-100 max-w-120 px-3 py-1 gap-1 hover:border-1 hover:border-dark-grey hover:shadow-sm">
          <div className="pt-1">
            <CheckCircle
              onCheck={() => handleParentTaskCheck(id)}
              taskId={id}
              checked={checked}
              size={13}
            />
          </div>
          <div className="flex flex-col flex-auto max-w-full">
            <div className="flex flex-col border-b-1 border-dark-grey">
              <div className="flex flex-row gap-2 items-start justify-between min-w-full max-w-full">
                <div
                  className={`${taskNameColor} font-semibold text-base max-w-fit px-2 py-1`}
                >
                  {taskName}
                </div>
                <DialogTrigger>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="text-dark-grey px-1 rounded-md hover:shadow-sm"
                  >
                    <DotsThreeIcon size={20} />
                  </Button>
                  <Modal>
                    <AriaDialog>
                      <TaskEditPanel
                        current={task}
                        edit={edit}
                        subTaskList={subTaskList}
                        handlers={editHandlers}
                        onClose={() => setIsOpen(false)}
                      />
                    </AriaDialog>
                  </Modal>
                </DialogTrigger>
              </div>
              {children.length !== 0 ? (
                <div className="flex flex-col gap-y-1 pb-1">
                  {children.map((child) => (
                    <ChildTask key={child.id} task={child} />
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex flex-row items-end justify-between gap-4 text-dark-grey text-sm text-pretty p-1">
              <div className="max-w-80">{rewards}</div>
              <div className="text-sm w-18">
                {limit ? format(limit, "M/dd HH:mm") : ""}
              </div>
            </div>
          </div>
        </div>
        {/* <Dialog
          isOpen={isOpen}
          onClose={() => {
            editHandlers.resetSubTask();
            editHandlers.resetData();
            setIsOpen(false);
          }}
        > */}

        {/* </Dialog> */}
      </GridListItem>
    </>
  );
}

function ChildTask({ task }: TaskProps) {
  const { handlers: taskHandlers } = useContext(TaskManagerContext)!;
  const { checkTask } = taskHandlers;

  const taskNameColor = task.name === "" ? "text-dark-grey" : "text-dark/80";
  const taskName = task.name === "" ? "no name task" : task.name;
  return (
    <div className="flex flex-row items-center gap-1 items-center min-w-full max-w-full bg-dark/2 rounded-lg p-1">
      <CheckCircle
        className=""
        onCheck={checkTask}
        taskId={task.id}
        checked={task.checked}
        size={13}
      />
      <div className={`${taskNameColor} max-w-fit font-semibold px-2`}>
        {taskName}
      </div>
    </div>
  );
}

export { Task };
