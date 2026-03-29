import { describe, it, expect } from "vitest";
import { TaskData } from "../data/taskData";
import { createInitialState, editPanelReducer } from "./editPanelHooks";

function createSubTask(id: string, name: string, parentId: string): TaskData {
  const task = new TaskData("Daily");
  Object.assign(task, { id, name, parent: parentId });
  return task;
}

function createParentWithChildren(
  parentId: string,
  childIds: string[],
): TaskData {
  const parent = new TaskData("Daily");
  Object.assign(parent, { id: parentId, children: childIds });
  return parent;
}

describe("editPanelReducer", () => {
  describe("SUBTASK_REORDER", () => {
    it("指定されたID順に children を並び替える", () => {
      const parentId = "parent-1";
      const sub1 = createSubTask("sub-1", "Task A", parentId);
      const sub2 = createSubTask("sub-2", "Task B", parentId);
      const sub3 = createSubTask("sub-3", "Task C", parentId);

      const parent = createParentWithChildren(parentId, [
        sub1.id,
        sub2.id,
        sub3.id,
      ]);
      let state = createInitialState(parent);

      state = editPanelReducer(
        state,
        {
          type: "SUBTASK_REORDER",
          payload: { orderedIds: ["sub-3", "sub-1", "sub-2"] },
        },
        parent,
      );

      expect(state.parent.children).toEqual(["sub-3", "sub-1", "sub-2"]);
    });

    it("存在しないIDが含まれていてもそのまま children に反映する", () => {
      const parentId = "parent-1";
      const sub1 = createSubTask("sub-1", "Task A", parentId);
      const sub2 = createSubTask("sub-2", "Task B", parentId);

      const parent = createParentWithChildren(parentId, [sub1.id, sub2.id]);
      let state = createInitialState(parent);

      state = editPanelReducer(
        state,
        {
          type: "SUBTASK_REORDER",
          payload: { orderedIds: ["sub-2", "non-existent", "sub-1"] },
        },
        parent,
      );

      expect(state.parent.children).toEqual([
        "sub-2",
        "non-existent",
        "sub-1",
      ]);
    });
  });
});
