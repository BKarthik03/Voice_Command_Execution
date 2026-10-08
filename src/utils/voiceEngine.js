// voiceEngine.js - thin wrappers around the browser's native Web Speech API.

// Speak text aloud. Any speech already queued is cancelled first.
export function speak(text, onStart, onEnd) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.onstart = () => onStart && onStart();
  utterance.onend = () => onEnd && onEnd();
  utterance.onerror = () => onEnd && onEnd();
  window.speechSynthesis.speak(utterance);
}

// Listen for ONE utterance (push-to-talk). Returns the recognition instance
// so the caller can call .stop() on it, or null if unsupported.
export function listenOnce(onResult, onError, onStart, onEnd) {
  // Chrome/Edge expose the prefixed version (webkitSpeechRecognition).
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    onError('unsupported');
    return null;
  }

  const recognition = new Recognition();
  recognition.lang = 'en-US';
  recognition.continuous = false; // stop automatically after one phrase
  recognition.interimResults = true; // live partial transcript
  recognition.maxAlternatives = 1;

  recognition.onstart = () => onStart && onStart();
  recognition.onresult = (event) => {
    let text = '';
    let isFinal = false;
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
      if (event.results[i].isFinal) isFinal = true;
    }
    onResult(text, isFinal);
  };
  recognition.onerror = (event) => onError(event.error);
  recognition.onend = () => onEnd && onEnd();

  try {
    recognition.start();
  } catch (err) {
    onError('start-failed');
    return null;
  }
  return recognition;
}
