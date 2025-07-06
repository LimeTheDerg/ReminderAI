const REMINDERS_KEY = 'reminder-ai-reminders';
const SETTINGS_KEY = 'reminder-ai-settings';

/** @type {import('../types/reminder.js').UserSettings} */
export const defaultSettings = {
  botName: 'ReminderBuddy',
  userGreeting: 'Hey there! Ready to crush your goals?',
  theme: 'light',
  soundEnabled: true,
  notificationsEnabled: true,
  username: 'Friend',
  botVibe: 'Happy'
};

/**
 * Load reminders from localStorage
 * @returns {import('../types/reminder.js').Reminder[]}
 */
export const loadReminders = () => {
  try {
    const saved = localStorage.getItem(REMINDERS_KEY);
    if (saved) {
      const reminders = JSON.parse(saved);
      return reminders.map((reminder) => ({
        ...reminder,
        targetTime: new Date(reminder.targetTime),
        createdAt: new Date(reminder.createdAt),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading reminders:', error);
    return [];
  }
};

/**
 * Save reminders to localStorage
 * @param {import('../types/reminder.js').Reminder[]} reminders 
 */
export const saveReminders = (reminders) => {
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  } catch (error) {
    console.error('Error saving reminders:', error);
  }
};

/**
 * Load settings from localStorage
 * @returns {import('../types/reminder.js').UserSettings}
 */
export const loadSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
    return defaultSettings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
};

/**
 * Save settings to localStorage
 * @param {import('../types/reminder.js').UserSettings} settings 
 */
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

/**
 * Generate a unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};