import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Bell, BellOff, Calendar, CheckCircle } from 'lucide-react';
import { UserGreeting } from './UserGreeting.jsx';
import { ReminderCard } from './ReminderCard.jsx';
import { AddReminderModal } from './AddReminderModal.jsx';
import { SettingsModal } from './SettingsModal.jsx';
import { useReminders } from '../hooks/useReminders.js';
import { useSettings } from '../hooks/useSettings.js';
import { requestNotificationPermission } from '../utils/notifications.js';
import { MdEventNote } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { GiPartyPopper } from "react-icons/gi";


export const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');

  const { activeReminders, completedReminders, timers, addReminder, deleteReminder, toggleReminder } = useReminders();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    // Check notification permission on mount
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.className = settings.theme === 'dark' ? 'dark' : '';
  }, [settings.theme]);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationPermission('granted');
      updateSettings({ notificationsEnabled: true });
    }
  };

  const currentReminders = showCompleted ? completedReminders : activeReminders;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <UserGreeting settings={settings} onOpenSettings={() => setIsSettingsModalOpen(true)} />

        {/* Action Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-start items-center md:justify-between gap-4">
            <div className="flex flex-row items-center space-x-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Reminder</span>
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="hidden md:flex p-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row space-y-3 items-center space-x-4">
              {notificationPermission !== 'granted' && (
                <button
                  onClick={handleEnableNotifications}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">Enable Notifications</span>
                </button>
              )}
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Notifications:</span>
                <div className="flex items-center space-x-1">
                  {settings.notificationsEnabled ? (
                    <Bell className="w-4 h-4 text-green-500" />
                  ) : (
                    <BellOff className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {settings.notificationsEnabled ? 'On' : 'Off'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-y-3 md:flex-row items-center justify-between">
              <div className="flex gap-2 flex-row items-center justify-center">
                <MdEventNote className="text-gray-900 text-lg" /> 
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                  {showCompleted ? 'Completed' : 'Active'} Reminders
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-center space-x-2">
                <button
                  onClick={() => setShowCompleted(false)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    !showCompleted
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Calendar className="text-sm w-4 h-4 inline mr-1" />
                  Active ({activeReminders.length})
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {currentReminders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 flex flex-col justify-center items-center gap-2">
                  {showCompleted ? <GiPartyPopper className="text-purple-700"/> : <SlNote className="text-gray-400"/>}
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {showCompleted ? 'No completed reminders yet' : 'No active reminders'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {showCompleted 
                    ? 'Complete some reminders to see them here!'
                    : 'Create your first reminder to get started!'
                  }
                </p>
                {!showCompleted && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add Your First Reminder
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {currentReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    timeLeft={timers[reminder.id] || { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }}
                    onDelete={deleteReminder}
                    onToggle={toggleReminder}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddReminderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addReminder}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />
    </div>
  );
};