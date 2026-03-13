import { useListData } from "react-aria-components";
import type { TaskData } from "./data/taskData";
import { useState } from "react";

// TODO: store task list if edit task

function useTaskManager(initialTasks: TaskData[], initialOrder: string[]) {
  // react-aria data
  let listData = useListData<TaskData>({
    // sort initial order
    initialItems: initialTasks.sort(
      (a, b) => initialOrder.indexOf(a.id) - initialOrder.indexOf(b.id),
    ),
    getKey: (item) => item.id,
  });

  // domain data
  const [taskList, setTaskList] = useState<TaskData[]>(initialTasks);

  // ---handlers---------
  const checkTask = (id: string) => {
    const item = listData.getItem(id)!;
    listData.update(id, { ...item, checked: !item.checked });
    const target = taskList.find((t) => t.id === id)!;
    target.checked = !target.checked;
    setTaskList([...taskList]);
  };

  /**
   * update task's (name, rewards, note)
   * don't use update for id
   * @param id
   * @param updatedTask
   */
  const editTask = (id: string, updatedTask: TaskData) => {
    listData.update(id, { ...updatedTask });
    const otherTasks = taskList.filter((t) => t.id !== id);
    setTaskList([...otherTasks, updatedTask]);
  };

  const addTask = (insertAfterId: string, newTask: TaskData) => {
    listData.insertAfter(insertAfterId, newTask);
    setTaskList([...taskList, newTask]);
  };

  const deleteTask = (id: string) => {
    listData.remove(id);
    setTaskList([...taskList.filter((t) => t.id !== id)]);
  };

  const updateTasks = (newTaskList: TaskData[]) => {
    const itemsRef = [...listData.items];
    itemsRef.forEach((item) => {
      listData.update(item.id, newTaskList.find((t) => t.id === item.id)!);
    });
    setTaskList([...newTaskList]);
  };

  return {
    listData,
    taskList,
    handlers: { checkTask, updateTasks, editTask, addTask, deleteTask },
  };
}

export { useTaskManager };
