import { TaskData } from "./data/taskData";

interface TaskEditProps {
  tasks?: TaskData[];
  onClose?: () => void;
}

function TaskEditPanel({ tasks }: TaskEditProps) {
  const { name, rewards, limit, category, note } = tasks
    ? tasks[0]
    : new TaskData("Daily");
  return (
    <form action="">
      <div className="bg-grey text-lg text-dark font-sm rounded-xl px-6 py-7">
        <div className="mb-5 border-b-3 border-dark-grey">
          <input
            type="text"
            value={name}
            className="pl-1 pr-3 py-2 text-2xl focus:outline-hidden"
            placeholder="Task name ..."
          />
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
          <div className="border-b-2 border-light">
            <label htmlFor="rewards">Rewards</label>
          </div>
          <div className="bg-light w-full col-span-3 py-1 px-2 border-2 border-dark-grey rounded-md">
            <input
              id="rewards"
              type="text"
              value={rewards}
              className="w-full focus:outline-hidden"
              placeholder="rewards ..."
            />
          </div>
          <div className="border-b-2 border-light">
            <label htmlFor="category">Category</label>
          </div>
          <div className="bg-light w-full col-span-3 py-1 px-2 border-2 border-dark-grey rounded-md">
            <select id="category" className="w-full focus:outline-hidden">
              <option selected className="text-medium text-dark-grey">
                choose a category
              </option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="One-Time">One-Time</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="border-b-2 border-light">
            <label htmlFor="limit">Limit</label>
          </div>
          <div className="bg-light w-full col-span-3 py-1 px-2 border-2 border-dark-grey rounded-md">
            <input
              id="limit"
              type="text"
              // value={limit}
              className="w-full focus:outline-hidden"
              placeholder="choose task limit date"
            />
          </div>
          <div className="border-b-2 border-light">
            <label htmlFor="note">Note</label>
          </div>
          <div className="bg-light w-full col-span-3 py-1 px-2 border-2 border-dark-grey rounded-md">
            <textarea
              id="note"
              value={note}
              className="w-full focus:outline-hidden"
              rows={4}
              cols={40}
              placeholder=""
            />
          </div>
          <div>
            <label htmlFor="option">Option</label>
          </div>
          <div className="bg-light col-start-3 col-span-2 py-1 px-2 border-2 border-dark-grey rounded-md">
            <select id="option" className="w-full focus:outline-hidden">
              <option value="none">none</option>
              <option value="reward" selected>
                rewards
              </option>
              <option value="note">note</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}

export { TaskEditPanel };
