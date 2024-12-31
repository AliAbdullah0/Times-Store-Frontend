import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 text-white bg-gray-800 rounded-lg shadow-md dark:bg-gray-200 dark:text-black flex items-center space-x-2"
    >
      {/* Conditionally render sun or moon icon */}
      {darkMode ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
      <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default DarkModeToggle;
