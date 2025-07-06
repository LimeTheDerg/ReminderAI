import React from 'react';
import { Bot, Settings } from 'lucide-react';

export const UserGreeting = ({ settings, onOpenSettings }) => {
  const getGreetingWithName = () => {
    return settings.userGreeting.replace('[User]', settings.username);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hello, {settings.username}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {getGreetingWithName()}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Customize Bot"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};