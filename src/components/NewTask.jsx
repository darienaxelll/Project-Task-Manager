import { useState } from "react";

const NewTask = (props) => {
  const [enteredTask, setEnteredTask] = useState();

  const changeHandler = (e) => {
    setEnteredTask(e.target.value);
  };

  const clickHandler = () => {
    props.onAdd(enteredTask)
    setEnteredTask("");
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={changeHandler}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone950"
        onClick={clickHandler}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
