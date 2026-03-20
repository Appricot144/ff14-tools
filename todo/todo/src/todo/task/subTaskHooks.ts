import { useState } from "react";
import { type Category, TaskData } from "../data/taskData";

type TaskDataFieldType = TaskData[keyof TaskData];

function useSubTasks(initialSubTaskList: TaskData[]) {
  const [subTaskList, setSubTaskList] = useState(initialSubTaskList);

  // ------ handers ------
  const changeSubTaskField = (
    id: string,
    field: string,
    value: TaskDataFieldType,
  ) => {
    let newTask: TaskData = subTaskList.find((task) => task.id === id)!;
    if (!newTask) return;

    const newList = subTaskList.map((task) =>
      task.id === id ? { ...newTask, [field]: value } : task,
    );
    setSubTaskList([...newList]);
  };

  /**
   * add empty task to sub task list
   * @param category
   * @returns children's id list (children of parent task)
   */
  const addEmptySubTask = (parentId: string, category: Category): string[] => {
    const newbie = { ...new TaskData(category), parent: parentId };
    setSubTaskList([...subTaskList, newbie]);
    return subTaskList.map((t) => t.id);
  };

  /**
   * delete a task from sub task list
   * @param id
   * @returns children's id list (children of parent task)
   */
  const deleteSubTask = (id: string) => {
    setSubTaskList([...subTaskList.filter((t) => t.id !== id)]);
    return subTaskList.map((t) => t.id);
  };

  const reorderSubTask = (orderedIds: string[]) => {
    const taskMap = new Map(subTaskList.map((t) => [t.id, t]));
    const reordered = orderedIds
      .map((id) => taskMap.get(id))
      .filter((t): t is TaskData => t !== undefined);
    setSubTaskList(reordered);
  };

  const resetSubTask = () => {
    setSubTaskList([...initialSubTaskList]);
  };

  return {
    subTaskList,
    handlers: {
      changeSubTaskField,
      addEmptySubTask,
      deleteSubTask,
      reorderSubTask,
      resetSubTask,
    },
  };
}

export { useSubTasks };
