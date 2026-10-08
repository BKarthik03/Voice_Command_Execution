// CommandHelp.jsx - clickable pills so the app works without a microphone.
const COMMANDS = [
  'dark mode', 'light mode', 'cyberpunk', 'add task buy milk', 'clear tasks',
  'who are you', 'what time is it', 'open github', 'open google', 'open youtube',
];

function CommandHelp({ onRun }) {
  return (
    <section className="card mt-5">
      <h2 className="card-title">Cheat Sheet (click to simulate voice)</h2>
      <div className="flex flex-wrap gap-2">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => onRun(cmd)}
            className="rounded-full border border-accent px-3 py-1 text-sm text-accent transition hover:bg-accent hover:text-bg"
          >
            {cmd}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CommandHelp;
