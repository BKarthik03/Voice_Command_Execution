// Header.jsx - a presentational component: it only receives props and shows them.

// A lookup object: status -> Tailwind classes.
// IMPORTANT: write full class names. `text-${color}` would NOT work because
// Tailwind scans your files for complete class strings.
const STATUS_STYLES = {
  idle: 'border-line text-muted',
  listening: 'border-accent2 text-accent2',
  speaking: 'border-accent text-accent',
  error: 'border-danger text-danger',
};

function Header({ theme, status }) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold tracking-[0.35em] text-accent">NOVA</h1>
        <p className="text-sm text-muted">Voice Command HUD</p>
      </div>
      <div className="flex gap-2 text-xs">
        <span className="rounded-full border border-line px-3 py-1 text-muted">Theme: {theme}</span>
        <span className={`rounded-full border px-3 py-1 ${STATUS_STYLES[status]}`}>Status: {status}</span>
      </div>
    </header>
  );
}

export default Header;
