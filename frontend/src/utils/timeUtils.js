/**
 * Calculate time left until target time
 * @param {Date} targetTime 
 * @returns {import('../types/reminder.js').TimeLeft}
 */
export const calculateTimeLeft = (targetTime) => {
  const now = new Date().getTime();
  const target = new Date(targetTime).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: difference };
};

/**
 * Format time left as a readable string
 * @param {import('../types/reminder.js').TimeLeft} timeLeft 
 * @returns {string}
 */
export const formatTimeLeft = (timeLeft) => {
  const { days, hours, minutes, seconds, total } = timeLeft;
  
  if (total <= 0) return 'Time\'s up!';
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Check if time is up
 * @param {import('../types/reminder.js').TimeLeft} timeLeft 
 * @returns {boolean}
 */
export const isTimeUp = (timeLeft) => {
  return timeLeft.total <= 0;
};

/**
 * Format date and time for display
 * @param {Date} date 
 * @returns {string}
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};