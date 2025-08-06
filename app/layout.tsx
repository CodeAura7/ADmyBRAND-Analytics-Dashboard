import '../src/styles/global.css';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen font-sans transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
            {/* Top Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
              <div className="font-semibold text-lg">📊 ADmyBRAND Insights</div>
              <div className="hidden md:flex space-x-6 text-sm text-gray-700 dark:text-gray-300">
                <a href="#" className="text-black dark:text-white font-semibold text-base hover:text-black dark:hover:text-white">Dashboard</a>
                <a href="#" className="text-black dark:text-white font-semibold text-base hover:text-black dark:hover:text-white">Reports</a>
                <a href="#" className="text-black dark:text-white font-semibold text-base hover:text-black dark:hover:text-white">Campaigns</a>
                <a href="#" className="text-black dark:text-white font-semibold text-base hover:text-black dark:hover:text-white">Audiences</a>
                <a href="#" className="text-black dark:text-white font-semibold text-base hover:text-black dark:hover:text-white">Settings</a>
              </div>

              <div className="flex items-center space-x-4">
                {/* ✅ Make sure ThemeToggle is inserted here */}
              </div>
            </nav>

            <main className="pt-20 px-4 md:px-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
