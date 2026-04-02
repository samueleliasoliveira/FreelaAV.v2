import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md border border-zinc-200 dark:border-zinc-700"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="animate-in zoom-in duration-300" />
      ) : (
        <Sun size={20} className="animate-in zoom-in duration-300" />
      )}
    </button>
  );
}
