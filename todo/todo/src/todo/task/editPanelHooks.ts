import { useReducer } from "react";
import type { TaskData } from "../data/taskData";
import { useSubTasks } from "./subTaskHooks";

type FieldType = TaskData[keyof TaskData];

interface Action {
  type: string;
  payload?: {
    field: keyof TaskData;
    value: FieldType;
  };
}

function useEditPanel(
  currentParentTask: TaskData,
  currentTaskList: TaskData[],
) {
  const [edit, dispatch] = useReducer(formReducer, currentParentTask);

  const currentChildren = edit.children
    ? currentTaskList.filter((t) => t.parent === edit.id)
    : [];
  const { subTaskList, handlers: subTaskHandlers } =
    useSubTasks(currentChildren);

  const actions = {
    setField: (field: keyof TaskData, value: FieldType) => ({
      type: "SET_FIELD" as const,
      payload: { field: field, value: value },
    }),
    reset: () => ({ type: "RESET" }),
  };

  const editData = (field: keyof TaskData, value: FieldType) => {
    dispatch(actions.setField(field, value));
  };

  const resetData = () => {
    dispatch(actions.reset());
  };

  function formReducer(task: TaskData, action: Action) {
    switch (action.type) {
      case "SET_FIELD":
        if (!action.payload) return { ...task };
        return { ...task, [action.payload.field]: action.payload.value };
      case "RESET":
        return currentParentTask;
      default:
        throw new Error("invalid action type");
    }
  }

  return {
    edit,
    subTaskList,
    handlers: { editData, resetData, ...subTaskHandlers },
  };
}

export { useEditPanel };
