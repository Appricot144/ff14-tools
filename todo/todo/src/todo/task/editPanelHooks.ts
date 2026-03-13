import { useReducer } from "react";
import type { TaskData } from "../data/taskData";

type FieldType = string | Date | boolean;

interface Action {
  type: string;
  payload?: {
    field: keyof TaskData;
    value: FieldType;
  };
}

function useEditPanel(currentData: TaskData) {
  const [edit, dispatch] = useReducer(formReducer, currentData);

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
        return currentData;
      default:
        throw new Error("invalid action type");
    }
  }

  return { edit, handlers: { editData, resetData } };
}

export { useEditPanel };
