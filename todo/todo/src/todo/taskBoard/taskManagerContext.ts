import { createContext } from "react";
import { useTaskManager } from "./taskManager";

type taskManagerCtx = ReturnType<typeof useTaskManager>;
const TaskManagerContext = createContext<taskManagerCtx | undefined>(undefined);

export { TaskManagerContext };
