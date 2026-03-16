import { add, addWeeks, endOfToday } from "date-fns";

type Category =
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Yearly"
  | "One-time"
  | "Other";

/**
 * DO NOT implement not static methods
 */
class TaskData {
  readonly id: string;
  checked: boolean;
  name?: string;
  rewards?: string;
  category: Category;
  limit?: Date;
  note?: string;
  parent?: string;
  children?: string[];

  constructor(category: Category) {
    this.id = TaskData.newId();
    this.checked = false;
    this.name = "";
    this.rewards = "";
    this.category = category;
    this.limit = TaskData.setInitialLimit(category);
    this.note = "";
    this.parent = undefined;
    this.children = [];
  }

  static newId() {
    return crypto.randomUUID();
  }

  static setInitialLimit(category: Category) {
    switch (category) {
      case "Daily":
        return endOfToday();
      case "Weekly":
        return addWeeks(new Date(), 1);
      case "Monthly":
        return add(new Date(), { months: 1 });
      default:
        return new Date();
    }
  }
}

function isChild(task: TaskData): boolean {
  return task.parent !== undefined && task.parent !== "";
}

export { type Category, TaskData, isChild };
