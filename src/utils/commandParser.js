// commandParser.js - turns a raw sentence into { action, payload, replyText }.
// Plain keyword matching: easy to read, easy to extend.

const SITES = {
  github: 'https://github.com',
  google: 'https://www.google.com',
  youtube: 'https://www.youtube.com',
};

export function parseCommand(transcript) {
  const text = transcript.toLowerCase().trim();

  // 1. Add a task: "add task buy milk" / "remind me to buy milk"
  const taskMatch = text.match(/(?:add task|remind me to)\s+(.+)/);
  if (taskMatch) {
    const item = taskMatch[1].trim();
    return { action: 'ADD_TASK', payload: item, replyText: `Added ${item} to your task list.` };
  }

  // 2. Clear tasks
  if (text.includes('clear tasks') || text.includes('delete all tasks')) {
    return { action: 'CLEAR_TASKS', payload: null, replyText: 'All tasks cleared.' };
  }

  // 3. Themes
  if (text.includes('dark mode') || text.includes('night mode')) {
    return { action: 'SET_THEME', payload: 'dark', replyText: 'Dark mode enabled.' };
  }
  if (text.includes('light mode') || text.includes('day mode')) {
    return { action: 'SET_THEME', payload: 'light', replyText: 'Switching to light mode.' };
  }
  if (text.includes('cyberpunk') || text.includes('matrix mode')) {
    return { action: 'SET_THEME', payload: 'cyberpunk', replyText: 'Cyberpunk protocol engaged.' };
  }

  // 4. Identity
  if (text.includes('who are you') || text.includes('what is your name')) {
    return {
      action: 'SPEAK',
      payload: null,
      replyText: 'I am Nova, a voice-controlled HUD built entirely with React.',
    };
  }

  // 5. Time (12-hour format)
  if (text.includes('what time is it') || text.includes('current time')) {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return { action: 'SPEAK', payload: null, replyText: `It is ${time}.` };
  }

  // 6. Open a website
  const openMatch = text.match(/open\s+(github|google|youtube)/);
  if (openMatch) {
    const site = openMatch[1];
    return { action: 'OPEN_SITE', payload: { site, url: SITES[site] }, replyText: `Opening ${site}.` };
  }

  // 7. Fallback
  return {
    action: 'UNKNOWN',
    payload: null,
    replyText: "Sorry, I didn't catch that. Try one of the commands in the cheat sheet.",
  };
}
