import { useListData } from "react-aria-components";
import { TaskData } from "../data/taskData";
import { useState } from "react";
import { updateLimit, validateLimit, validateSubtaskLimit } from "../util/taskUpdator";
import { isBefore } from "date-fns";

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
   * don't use for update id
   * @param id
   * @param updatedTask
   */
  const editTask = (id: string, updatedTask: TaskData) => {
    listData.update(id, { ...updatedTask });
    const newTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    setTaskList([...newTaskList]);
  };

  const addTask = (newTask: TaskData) => {
    listData.append(newTask);
    setTaskList([...taskList, newTask]);
  };

  const deleteTask = (id: string) => {
    // cascade delete (subtask)
    const deleteList = taskList.filter(task => task.parent && task.parent === id || task.id === id);
    for(const target of deleteList) {
      listData.remove(target.id);
    }

    const newTaskList = taskList.filter(t => !t.parent || t.parent !== id || t.id !== id);
    setTaskList([...newTaskList]);
  };

  /**
   * merge list to taskList
   * @param newTaskList
   */
  const updateTasks = (newTaskList: TaskData[]) => {
    // update aria list 
    let newList: TaskData[] = taskList;
    for (const newTask of newTaskList) {
      const isNew = !taskList.map((t) => t.id).includes(newTask.id);
      if (isNew) {
        newList = [...newList, newTask];
        listData.append(newTask);
      } else {
        newList = newList.map((old) => (old.id === newTask.id ? newTask : old));
        listData.update(newTask.id, newTask);
      }
    }
    newList = validateSubtaskLimit(newList);
    // update tasklist
    setTaskList([...newList]);
  };

  /**
   * update expire tasks 
   * - check: false
   * - limit: next limit
   */
  const expireTasks = () => {
    const now = new Date();
    setTaskList((prev) =>
      prev.map((t) => {
        if (!(t.checked && isBefore(t.limit, now))) {
          return t;
        }

        const updated = {
          ...t,
          checked: false,
          limit: updateLimit(t.limit, t.category),
        };

        // GridList renders from listData, so keep both stores in sync.
        listData.update(updated.id, updated);
        return updated;
      }),
    );
  }

  /**
   * trigger render
   * @returns 
   */
  const rerender = () => setTaskList(prev => [...prev]); 

  return {
    listData,
    taskList,
    handlers: { checkTask, updateTasks, editTask, addTask, deleteTask, expireTasks, rerender },
  };
}

export { useTaskManager };
