import { useState, useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import MicButton from './components/MicButton.jsx';
import TaskWidget from './components/TaskWidget.jsx';
import ThemeWidget from './components/ThemeWidget.jsx';
import ActivityLog from './components/ActivityLog.jsx';
import CommandHelp from './components/CommandHelp.jsx';
import { speak, listenOnce } from './utils/voiceEngine.js';
import { parseCommand } from './utils/commandParser.js';

const ERROR_TEXT = {
  unsupported: 'Speech recognition is not supported here. Use Chrome or Edge.',
  'not-allowed': 'Microphone permission was denied. Allow it in the address bar.',
  'no-speech': "I didn't hear anything. Try again.",
  'audio-capture': 'No microphone found.',
  network: 'Speech service needs an internet connection.',
};

function App() {
  // ---- State lives here and is passed DOWN to children as props ----
  const [theme, setTheme] = useState('dark');
  const [tasks, setTasks] = useState([]);
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | listening | speaking | error
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null); // remembers the recognition object between renders

  // Side effect: whenever `theme` changes, update <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Parse a sentence, update state, log it, and speak the reply.
  function runCommand(text) {
    const { action, payload, replyText } = parseCommand(text);

    if (action === 'SET_THEME') setTheme(payload);
    if (action === 'ADD_TASK') setTasks((prev) => [...prev, { id: Date.now(), text: payload }]);
    if (action === 'CLEAR_TASKS') setTasks([]);
    // Browsers may block pop-ups opened from voice (not a click). Allow pop-ups if so.
    if (action === 'OPEN_SITE') window.open(payload.url, '_blank', 'noopener');

    setLog((prev) => [
      { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), heard: text, reply: replyText },
      ...prev, // newest first
    ]);

    speak(replyText, () => setStatus('speaking'), () => setStatus('idle'));
  }

  // Cheat-sheet pills and buttons call this: same path as a real voice command.
  function handleSimulated(text) {
    setErrorMessage('');
    setTranscript(text);
    runCommand(text);
  }

  // Push-to-talk button handler
  function handleMicClick() {
    if (status === 'listening') {
      recognitionRef.current && recognitionRef.current.stop();
      return;
    }
    window.speechSynthesis && window.speechSynthesis.cancel();
    setErrorMessage('');
    setTranscript('');

    recognitionRef.current = listenOnce(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) runCommand(text);
      },
      (code) => {
        setStatus('error');
        setErrorMessage(ERROR_TEXT[code] || `Speech error: ${code}`);
      },
      () => setStatus('listening'),
      // When listening ends, go idle - unless we are already speaking or in error.
      () => setStatus((current) => (current === 'listening' ? 'idle' : current))
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Header theme={theme} status={status} />
      {/* 1 column on phones, 2 columns from the `lg` breakpoint up */}
      <main className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <MicButton status={status} transcript={transcript} errorMessage={errorMessage} onClick={handleMicClick} />
        <TaskWidget
          tasks={tasks}
          onAdd={(text) => handleSimulated(`add task ${text}`)}
          onClear={() => handleSimulated('clear tasks')}
        />
        <ThemeWidget theme={theme} onChange={setTheme} />
        <ActivityLog log={log} />
      </main>
      <CommandHelp onRun={handleSimulated} />
    </div>
  );
}

export default App;
