// MicButton.jsx - push-to-talk button + live transcript.
// Each status gets its own full set of Tailwind classes.
const MIC_STYLES = {
  idle: 'border-accent bg-panel text-accent hover:glow',
  listening: 'border-accent2 bg-panel text-accent2 animate-pulse-ring',
  speaking: 'border-accent bg-accent text-bg animate-breathe',
  error: 'border-danger bg-panel text-danger',
};

const LABELS = {
  idle: 'Tap to talk',
  listening: 'Listening...',
  speaking: 'Nova is speaking...',
  error: 'Error - tap to retry',
};

function MicButton({ status, transcript, errorMessage, onClick }) {
  return (
    <section className="card flex flex-col items-center gap-4 py-8 lg:row-span-2">
      <button
        onClick={onClick}
        aria-label="Push to talk"
        className={`grid size-32 place-items-center rounded-full border-2 transition ${MIC_STYLES[status]}`}
      >
        <svg viewBox="0 0 24 24" className="size-12" fill="currentColor" aria-hidden="true">
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
        </svg>
      </button>
      <p className="tracking-widest text-muted">{LABELS[status]}</p>

      <div className="min-h-18 w-full rounded-xl border border-dashed border-line px-4 py-3" aria-live="polite">
        <span className="text-[0.7rem] tracking-[0.2em] text-muted">TRANSCRIPT</span>
        <p>{transcript || 'Say something like "dark mode"...'}</p>
      </div>

      {/* Conditional rendering: only shown when there is an error */}
      {errorMessage && <p className="text-center text-sm text-danger">{errorMessage}</p>}
    </section>
  );
}

export default MicButton;
