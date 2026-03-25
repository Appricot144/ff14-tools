import { useMemo, useState } from "react";
import { type Category, TaskData } from "../data/taskData";

type TaskDataFieldType = TaskData[keyof TaskData];

function useSubTasks(
  orderedIds: string[],
  baseChildMap: Map<string, TaskData>,
) {
  const [draftById, setDraftById] = useState<Record<string, TaskData>>({});

  const subTaskList = useMemo(() => {
    return orderedIds
      .map((id) => draftById[id] ?? baseChildMap.get(id))
      .filter((t): t is TaskData => t !== undefined);
  }, [orderedIds, draftById, baseChildMap]);

  // ------ handlers ------
  const changeSubTaskField = (
    id: string,
    field: keyof TaskData,
    value: TaskDataFieldType,
  ) => {
    const base = draftById[id] ?? baseChildMap.get(id);
    if (!base) return;

    const updated = { ...base, [field]: value } as TaskData;
    setDraftById((prev) => ({ ...prev, [id]: updated }));
  };

  /**
   * add empty task to sub task list
   * @returns children id list (order preserved by caller via `edit.children`)
   */
  const addEmptySubTask = (parentId: string, category: Category): string[] => {
    const newbie = new TaskData(category);
    newbie.parent = parentId;

    setDraftById((prev) => ({ ...prev, [newbie.id]: newbie }));
    return [...orderedIds, newbie.id];
  };

  /**
   * delete a task from sub task list
   * @returns children's id list (order preserved)
   */
  const deleteSubTask = (id: string): string[] => {
    setDraftById((prev) => {
      if (!(id in prev)) return prev;
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    return orderedIds.filter((t) => t !== id);
  };

  const resetSubTask = () => {
    setDraftById({});
  };

  return {
    subTaskList,
    handlers: {
      changeSubTaskField,
      addEmptySubTask,
      deleteSubTask,
      resetSubTask,
    },
  };
}

export { useSubTasks };
