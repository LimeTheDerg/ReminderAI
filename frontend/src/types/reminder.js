// Reminder types and interfaces

/**
 * @typedef {Object} Reminder
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {Date} targetTime
 * @property {ReminderCategory} category
 * @property {boolean} isActive
 * @property {boolean} isCompleted
 * @property {RepeatType} repeatType
 * @property {Date} createdAt
 * @property {boolean} soundEnabled
 */

/**
 * @typedef {'focus' | 'health' | 'fun' | 'work' | 'custom'} ReminderCategory
 */

/**
 * @typedef {'never' | 'daily' | 'weekly' | 'custom'} RepeatType
 */

/**
 * @typedef {Object} UserSettings
 * @property {string} botName
 * @property {string} userGreeting
 * @property {'light' | 'dark' | 'fun'} theme
 * @property {boolean} soundEnabled
 * @property {boolean} notificationsEnabled
 * @property {string} username
 */

/**
 * @typedef {Object} TimeLeft
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} total
 */

export {};