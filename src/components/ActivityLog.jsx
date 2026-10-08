// ActivityLog.jsx - scrollable history. `max-h-80 overflow-y-auto` = fixed height + scroll.
function ActivityLog({ log }) {
  return (
    <section className="card lg:col-span-2">
      <h2 className="card-title">Activity Log</h2>
      {log.length === 0 ? (
        <p className="text-sm text-muted">Nothing yet.</p>
      ) : (
        <ul className="max-h-80 overflow-y-auto">
          {log.map((entry) => (
            <li key={entry.id} className="border-b border-line py-2 last:border-b-0">
              <span className="text-xs text-muted">{entry.time}</span>
              <p>You: {entry.heard}</p>
              <p className="text-accent">Nova: {entry.reply}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ActivityLog;
