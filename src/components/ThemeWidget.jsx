// ThemeWidget.jsx - the parent (App) owns the theme state; we just report clicks.
const THEMES = ['dark', 'light', 'cyberpunk'];

function ThemeWidget({ theme, onChange }) {
  return (
    <section className="card">
      <h2 className="card-title">Theme</h2>
      <div className="flex flex-wrap gap-2">
        {THEMES.map((name) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            // Conditional class: the active button is filled in
            className={`btn ${theme === name ? 'border-accent bg-accent text-bg hover:text-bg' : ''}`}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default ThemeWidget;
