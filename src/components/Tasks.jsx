import NewTask from "./NewTask";

const Tasks = (props) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={props.onAdd} />
      {props.tasks.length === 0 && (
        <p className="text-stone-800 my-4">No task yet.</p>
      )}
      {props.tasks.length > 0 && (
        <ul className="p-4 mt-4 rounded-md bg-stone-100">
          {props.tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => props.onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
