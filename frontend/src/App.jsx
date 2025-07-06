import React from 'react';
import { Dashboard } from './components/Dashboard.jsx';
import { useSettings } from './hooks/useSettings.js';
import FirstTimeSetupModal from './components/FirstTimeSetUpModal.jsx';

function App() {
  const { settings, updateSettings, isSetupComplete } = useSettings();

  if (!isSetupComplete) {
    return <FirstTimeSetupModal updateSettings={updateSettings} />;
  }

  return <Dashboard/>;
}

export default App;
