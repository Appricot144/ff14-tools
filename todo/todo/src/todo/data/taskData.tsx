type Category =
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Yearly"
  | "One-time"
  | "Other";

interface TaskData {
  id: number;
  checked: boolean;
  name?: string;
  rewards?: string;
  category: Category;
  limit?: Date;
  note?: string;
}

export type { Category, TaskData };
