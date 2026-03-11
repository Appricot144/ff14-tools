type Category =
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Yearly"
  | "One-time"
  | "Other";

class TaskData {
  readonly id: string;
  checked: boolean;
  name?: string;
  rewards?: string;
  category: Category;
  limit?: Date;
  note?: string;

  constructor(category: Category) {
    this.id = crypto.randomUUID();
    this.checked = false;
    this.name = "";
    this.rewards = "";
    this.category = category;
    this.limit = new Date();
    this.note = "";
  }

  static newId() {
    return crypto.randomUUID();
  }
}

export { type Category, TaskData };
