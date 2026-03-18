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
  limit: Date | undefined,
  category: Category,
): Date | undefined {
  let defaultLimit: Date = new Date();

  let aday: Date = defaultLimit;
  if (limit) aday = limit;

  switch (category) {
    case "Daily":
      return addDays(aday, differenceInDays(new Date(), aday) + 1);
    case "Weekly":
      return addWeeks(aday, differenceInWeeks(new Date(), aday) + 1);
    default:
      return undefined;
  }
}

function validateLimit(taskList: TaskData[]): TaskData[] {
  return taskList.map((task) => {
    return { ...task, limit: updateLimit(task.limit, task.category) };
  });
}

/**
 * limit and checked state updator for system
 * e.g. setInterval(() => checkTaskDeadline(...))
 * @param currentList
 * @param updater
 */
const checkTaskDeadline = (
  currentList: TaskData[],
  updater: (list: TaskData[]) => TaskData[] | void,
) => {
  let changed = false;
  const updatedTasks = currentList.map((task) => {
    if (task.limit && isBefore(task.limit, new Date())) {
      changed = true;
      return {
        ...task,
        checked: false,
        limit: updateLimit(task.limit, task.category),
      };
    }
    return task;
  });
  return updater(updatedTasks);
};

export { checkTaskDeadline, updateLimit, validateLimit };
