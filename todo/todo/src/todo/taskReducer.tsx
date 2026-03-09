import type { Category, TaskData } from "./data/taskData";

interface TaskAction {
  type: string;
  id?: number;
  name?: string;
  rewards?: string;
  category?: Category;
  limit?: Date;
  note?: string;
  tasks?: TaskData[];
}

function taskReducer(tasks: TaskData[], action: TaskAction) {
  switch (action.type) {
    case "CHECK_TASK": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.checked = !target.checked;
      return [...tasks];
    }
    case "UNCHECK_TASK": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.checked = false;
      return [...tasks];
    }
    case "EDIT_TASK_NAME": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.name = action.name;
      return [...tasks];
    }
    case "EDIT_TASK_REWARD": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.rewards = action.rewards;
      return [...tasks];
    }
    case "EDIT_TASK_CATEGORY": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.category = action.category || "Other";
      return [...tasks];
    }
    case "EDIT_TASK_LIMIT": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.limit = action.limit;
      return [...tasks];
    }
    case "EDIT_TASK_NOTE": {
      const target = tasks.find((t) => t.id === action.id)!;
      target.note = action.note;
      return [...tasks];
    }
    case "ADD_TASK": {
      const target: TaskData = {
        id: action.id || Math.floor(Math.random() * 1000000),
        checked: false,
        name: action.name || "",
        rewards: action.rewards || "",
        category: action.category || "One-time",
        limit: action.limit || undefined,
        note: action.note || undefined,
      };
      return [...tasks, target];
    }
    case "DELETE_TASK": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "UPDATE_TASKS": {
      const copyList = action.tasks || tasks;
      return [...copyList];
    }
    default:
      throw new Error("unhandled action type:" + action.type);
  }
}

// TODO: impl: task id generator (for now, using random id in ADD_TASK action)

export { taskReducer, type TaskAction };
