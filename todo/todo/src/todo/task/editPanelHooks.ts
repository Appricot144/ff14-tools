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

  const childMap = new Map(
    currentTaskList
      .filter((t) => t.parent === edit.id)
      .map((t) => [t.id, t]),
  );

  // order of truth: edit.children（new/sub/reorder を反映）
  const orderedIds = edit.children ?? [];

  const { subTaskList, handlers: subTaskHandlers } = useSubTasks(
    orderedIds,
    childMap,
  );

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

  const reorderSubTask = (orderedIds: string[]) => {
    dispatch(actions.setField("children", orderedIds));
  };

  return {
    edit,
    subTaskList,
    handlers: {
      editData,
      resetData,
      ...subTaskHandlers,
      reorderSubTask,
    },
  };
}

export { useEditPanel };
