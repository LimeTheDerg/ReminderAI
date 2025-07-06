import { useState, useEffect } from 'react';

const intervalMs = (reminder.repeatAmount || 1) * (repeatTypeToMs[reminder.repeatType] || 0);

if (reminder.repeatType === 'never' || intervalMs === 0) {
  return reminder; // do not notify repeatedly
}

const repeatTypeToMs = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
  weeks: 7 * 24 * 60 * 60 * 1000,
};

const AI_API_URL = 'AI_API_URL_HERE';
const AI_API_KEY = 'YOUR_API_KEY_HERE';

async function fetchAIMessage(reminderTitle) {
  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Remind me about: ${reminderTitle}`,
      }),
    });
    if (!response.ok) throw new Error('AI API error');

    const data = await response.json();
    return data.message || `Reminder: ${reminderTitle}`;
  } catch (error) {
    console.error('AI API fetch failed:', error);
    return `Reminder: ${reminderTitle}`;
  }
}

export function useRemindersWithAI(reminders, setReminders, saveReminders, showNotification, playNotificationSound) {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = Date.now();
      let updated = false;

      const updatedReminders = await Promise.all(reminders.map(async reminder => {
        if (!reminder.isActive || reminder.isCompleted) return reminder;

        const lastNotified = new Date(reminder.lastNotifiedAt).getTime();
        const intervalMs = (reminder.repeatAmount || 1) * (repeatTypeToMs[reminder.repeatType] || 0);

        if (intervalMs === 0) return reminder;

        if (now - lastNotified >= intervalMs) {
          const aiMessage = await fetchAIMessage(reminder.title);

          showNotification(`⏰ ${reminder.title}`, aiMessage, '/vite.svg');
          if (reminder.soundEnabled) playNotificationSound();

          updated = true;
          return {
            ...reminder,
            lastNotifiedAt: new Date().toISOString(),
          };
        }
        return reminder;
      }));

      if (updated) {
        setReminders(updatedReminders);
        saveReminders(updatedReminders);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders, setReminders, saveReminders, showNotification, playNotificationSound]);
}
