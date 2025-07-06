import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, Tag, FileText } from 'lucide-react';

export const AddReminderModal = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [repeatType, setRepeatType] = useState('never');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [repeatAmount, setRepeatAmount] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();

  if (!title.trim()) return;

  onAdd({
    title: title.trim(),
    isActive: true,
    isCompleted: false,
    repeatType,
    repeatAmount,
    soundEnabled,
    lastNotifiedAt: new Date().toISOString(), // track notification time
    createdAt: new Date(),
  });

  // reset inputs
  setTitle('');
  setRepeatAmount('');
  setRepeatType('never');
  setSoundEnabled(true);
  onClose();
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add New Reminder
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="What do you want to be reminded of?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deadline
              </label>
              <div className="flex flex-row gap-3 items-center">
                <p className='text-white'>Every</p>
                <input
                  type="number"
                  min="1"
                  value={repeatAmount}
                  onChange={(e) =>
                    setRepeatAmount(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className={`w-16 h-13 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white
                    ${repeatType === 'never' ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300 dark:border-gray-600'}
                  `}
                />
                  <select
                    value={repeatType}
                    onChange={(e) => setRepeatType(e.target.value)}
                    className="w-full h-13 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="seconds">Seconds</option>
                  </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="soundEnabled"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="soundEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable sound notification
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};