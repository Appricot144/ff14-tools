import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSubTasks } from "./subTaskHooks";
import { TaskData } from "../data/taskData";

function createSubTask(id: string, name: string, parentId: string): TaskData {
  const task = new TaskData("Daily");
  Object.assign(task, { id, name, parent: parentId });
  return task;
}

describe("useSubTasks", () => {
  describe("reorderSubTask", () => {
    it("指定されたID順にサブタスクリストを並び替える", () => {
      const parentId = "parent-1";
      const sub1 = createSubTask("sub-1", "Task A", parentId);
      const sub2 = createSubTask("sub-2", "Task B", parentId);
      const sub3 = createSubTask("sub-3", "Task C", parentId);

      const { result } = renderHook(() =>
        useSubTasks([sub1, sub2, sub3]),
      );

      // 並び替え: sub3, sub1, sub2 の順にする
      act(() => {
        result.current.handlers.reorderSubTask(["sub-3", "sub-1", "sub-2"]);
      });

      expect(result.current.subTaskList.map((t) => t.id)).toEqual([
        "sub-3",
        "sub-1",
        "sub-2",
      ]);
    });

    it("存在しないIDが含まれていても既存のタスクのみ並び替える", () => {
      const parentId = "parent-1";
      const sub1 = createSubTask("sub-1", "Task A", parentId);
      const sub2 = createSubTask("sub-2", "Task B", parentId);

      const { result } = renderHook(() =>
        useSubTasks([sub1, sub2]),
      );

      act(() => {
        result.current.handlers.reorderSubTask(["sub-2", "non-existent", "sub-1"]);
      });

      expect(result.current.subTaskList.map((t) => t.id)).toEqual([
        "sub-2",
        "sub-1",
      ]);
    });
  });
});
