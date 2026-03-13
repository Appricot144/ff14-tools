import { addWeeks, differenceInWeeks, endOfToday, isBefore } from "date-fns";
import type { Category, TaskData } from "../data/taskData";

/**
 * return updated limit
 * @param limit
 * @param category
 * @returns updated limit date (Date)
 */
function updateLimit(limit: Date, category: Category): Date | undefined {
  switch (category) {
    case "Daily":
      return endOfToday();
    case "Weekly":
      return addWeeks(limit, differenceInWeeks(new Date(), limit) + 1);
    default:
      return undefined;
  }
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
  if (changed) return updater(updatedTasks);
};

export { checkTaskDeadline, updateLimit };
