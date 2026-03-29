import { useMemo, useReducer } from "react";
import type { Category } from "../data/taskData";
import { TaskData } from "../data/taskData";

type FieldType = TaskData[keyof TaskData];

type EditPanelState = {
  parent: TaskData;
  subtaskOverlay: Record<string, TaskData>;
};

type Action =
  | { type: "SET_FIELD"; payload: { field: keyof TaskData; value: FieldType } }
  | { type: "RESET" }
  | { type: "SUBTASK_REORDER"; payload: { orderedIds: string[] } }
  | { type: "SUBTASK_ADD"; payload: { newbie: TaskData } }
  | { type: "SUBTASK_REMOVE"; payload: { id: string } }
  | { type: "SUBTASK_PATCH"; payload: { id: string; task: TaskData } };

function createInitialState(currentParentTask: TaskData): EditPanelState {
  return {
    parent: currentParentTask,
    subtaskOverlay: {},
  };
}

function editPanelReducer(
  state: EditPanelState,
  action: Action,
  resetTarget: TaskData,
): EditPanelState {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action.payload;
      return {
        ...state,
        parent: { ...state.parent, [field]: value } as TaskData,
      };
    }
    case "RESET":
      return createInitialState(resetTarget);
    case "SUBTASK_REORDER":
      return {
        ...state,
        parent: {
          ...state.parent,
          children: action.payload.orderedIds,
        } as TaskData,
      };
    case "SUBTASK_ADD": {
      const { newbie } = action.payload;
      const prevChildren = state.parent.children ?? [];
      return {
        parent: {
          ...state.parent,
          children: [...prevChildren, newbie.id],
        } as TaskData,
        subtaskOverlay: { ...state.subtaskOverlay, [newbie.id]: newbie },
      };
    }
    case "SUBTASK_REMOVE": {
      const { id } = action.payload;
      const children = (state.parent.children ?? []).filter((cid) => cid !== id);
      const { [id]: _removed, ...restOverlay } = state.subtaskOverlay;
      return {
        ...state,
        parent: { ...state.parent, children } as TaskData,
        subtaskOverlay: restOverlay,
      };
    }
    case "SUBTASK_PATCH":
      return {
        ...state,
        subtaskOverlay: {
          ...state.subtaskOverlay,
          [action.payload.id]: action.payload.task,
        },
      };
    default:
      throw new Error("invalid action type");
  }
}

function useEditPanel(
  currentParentTask: TaskData,
  currentTaskList: TaskData[],
) {
  const [state, dispatch] = useReducer(
    (s: EditPanelState, a: Action) =>
      editPanelReducer(s, a, currentParentTask),
    currentParentTask,
    (parent) => createInitialState(parent),
  );

  const childMap = useMemo(
    () =>
      new Map(
        currentTaskList
          .filter((t) => t.parent === state.parent.id)
          .map((t) => [t.id, t]),
      ),
    [currentTaskList, state.parent.id],
  );

  const orderedIds = state.parent.children ?? [];

  const subTaskList = useMemo(() => {
    return orderedIds
      .map((id) => state.subtaskOverlay[id] ?? childMap.get(id))
      .filter((t): t is TaskData => t !== undefined);
  }, [orderedIds, state.subtaskOverlay, childMap]);

  const editData = (field: keyof TaskData, value: FieldType) => {
    dispatch({
      type: "SET_FIELD",
      payload: { field, value },
    });
  };

  const resetData = () => {
    dispatch({ type: "RESET" });
  };

  const changeSubTaskField = (
    id: string,
    field: keyof TaskData,
    value: FieldType,
  ) => {
    const base = state.subtaskOverlay[id] ?? childMap.get(id);
    if (!base) return;
    const updated = { ...base, [field]: value } as TaskData;
    dispatch({ type: "SUBTASK_PATCH", payload: { id, task: updated } });
  };

  const addEmptySubTask = (parentId: string, category: Category) => {
    const newbie = new TaskData(category);
    newbie.parent = parentId;
    dispatch({ type: "SUBTASK_ADD", payload: { newbie } });
  };

  const deleteSubTask = (id: string) => {
    dispatch({ type: "SUBTASK_REMOVE", payload: { id } });
  };

  const reorderSubTask = (orderedIds: string[]) => {
    dispatch({ type: "SUBTASK_REORDER", payload: { orderedIds } });
  };

  return {
    edit: state.parent,
    subTaskList,
    handlers: {
      editData,
      resetData,
      changeSubTaskField,
      addEmptySubTask,
      deleteSubTask,
      reorderSubTask,
    },
  };
}

export { useEditPanel, createInitialState, editPanelReducer };
export type { EditPanelState, Action };
