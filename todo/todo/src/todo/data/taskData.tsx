type Category = "Daily" | "Weekly" | "Monthly";

interface TaskData {
  id: number;
  checked: boolean;
  name?: string;
  rewards?: string;
  category: Category;
  note?: string;
}

export type { Category, TaskData };
