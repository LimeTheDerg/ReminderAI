/**
 * Request notification permission from the browser
 * @returns {Promise<boolean>}
 */
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

/**
 * Show a browser notification
 * @param {string} title 
 * @param {string} body 
 * @param {string} [icon] 
 */
export const showNotification = (title, body, icon) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body,
      icon: icon || '/vite.svg',
      badge: '/vite.svg',
      tag: 'reminder-notification',
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);
  }
};

/**
 * Play a notification sound using Web Audio API
 */
export const playNotificationSound = () => {
  // Create audio context and play a notification sound
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  gainNode.gain.value = 0.3;

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);

  // Play a second tone
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();

    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);

    oscillator2.frequency.value = 1000;
    oscillator2.type = 'sine';
    gainNode2.gain.value = 0.3;

    oscillator2.start();
    oscillator2.stop(audioContext.currentTime + 0.2);
  }, 100);
};