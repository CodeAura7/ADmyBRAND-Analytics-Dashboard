'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                 transition bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-100 hover:bg-gray-300
                 dark:hover:bg-gray-600 active:scale-95"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <>
          <FaSun className="text-yellow-400" />
          Light Mode
        </>
      ) : (
        <>
          <FaMoon className="text-blue-500" />
          Dark Mode
        </>
      )}
    </button>
  );
}
