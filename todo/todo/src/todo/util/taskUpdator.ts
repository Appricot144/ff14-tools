import {
  addDays,
  addWeeks,
  differenceInDays,
  differenceInWeeks,
  isBefore,
} from "date-fns";
import type { Category, TaskData } from "../data/taskData";

/**
 * return updated limit
 * @param limit
 * @param category
 * @returns updated limit date (Date)
 */
function updateLimit(
  limit: Date,
  category: Category,
): Date {
  let defaultLimit: Date = new Date();

  let aday: Date = defaultLimit;
  if (limit) aday = limit;

  switch (category) {
    case "Daily":
      return addDays(aday, differenceInDays(new Date(), aday) + 1);
    case "Weekly":
      return addWeeks(aday, differenceInWeeks(new Date(), aday) + 1);
    default:
      throw new Error('illigal category:' + category);
  }
}

/**
 * 全てのtaskのlimitをvalidateする
 * - validateの定義: updateLimit()
 * @param taskList
 * @returns 
 */
function validateLimit(taskList: TaskData[]): TaskData[] {
  const now = new Date();
  const targets = taskList.filter(t => isBefore(t.limit, now));
  if(!targets) return taskList;

  return taskList.map((task) => {
    return isBefore(task.limit, now) 
      ? { ...task, limit: updateLimit(task.limit, task.category) }
      : task; 
  });
}

/**
 * parent task と sub task のlimitをそろえる
 * @param taskList 
 * @returns 
 */
function validateSubtaskLimit(taskList: TaskData[]) {
  const parents = taskList.filter(t => t.children);
  return taskList.map(t => {
    const parentId = t.parent;
    if(parentId){
      const parent = parents.find(p => parentId === p.id);
      t.limit = parent ? parent.limit : t.limit;
    }
    return t;
  });
}

const checkTaskDeadline = (
  currentList: TaskData[],
  updater: (list: TaskData[]) => TaskData[] | void,
) => {
  const updatedTasks = currentList.map((task) => isBefore(task.limit, new Date()) 
      ? {...task, checked: false, limit: updateLimit(task.limit, task.category)} 
      : task 
    ); 
  return updater(updatedTasks);
};

export { checkTaskDeadline, updateLimit, validateLimit, validateSubtaskLimit };
