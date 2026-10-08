import { useState } from 'react';

// TaskWidget.jsx - shows: a controlled input, array .map() with keys,
// and a function prop (onAdd / onClear) that talks back to the parent.
function TaskWidget({ tasks, onAdd, onClear }) {
  // Local state: what is currently typed in the box ("controlled input")
  const [draft, setDraft] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    if (draft.trim() === '') return;
    onAdd(draft.trim());
    setDraft(''); // clear the box
  }

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h2 className="card-title">Tasks ({tasks.length})</h2>
        <button className="btn" onClick={onClear} disabled={tasks.length === 0}>
          Clear
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a task..."
          className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-1 text-sm outline-none focus:border-accent"
        />
        <button type="submit" className="btn">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-sm text-muted">No tasks yet. Say "add task buy milk".</p>
      ) : (
        <ul className="list-disc space-y-1 pl-5">
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskWidget;
