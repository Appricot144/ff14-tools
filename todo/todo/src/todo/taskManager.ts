import { useListData } from "react-aria-components";
import type { TaskData } from "./data/taskData";
import { useState } from "react";

// TODO: store task list if edit task

function useTaskManager(initialTasks: TaskData[], initialOrder: number[]) {
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
  const checkTask = (id: number) => {
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
  const editTask = (id: number, updatedTask: TaskData) => {
    listData.update(id, { ...updatedTask });
    const otherTasks = taskList.filter((t) => t.id !== id);
    setTaskList([...otherTasks, updatedTask]);
  };

  const addTask = (insertAfter: number, newTask: TaskData) => {
    listData.insertAfter(insertAfter, newTask);
    setTaskList([...taskList, newTask]);
  };

  const deleteTask = (id: number) => {
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

  return { listData, taskList, handlers: { checkTask, updateTasks } };
}

// TODO: impl: task id generator (for now, using random id in ADD_TASK action)

export { useTaskManager };
