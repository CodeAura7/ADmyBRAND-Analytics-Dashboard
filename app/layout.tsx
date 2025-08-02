// app/layout.tsx

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/globals.css'; // your global styles
import { ThemeProvider } from 'next-themes';
import React from 'react';

export const metadata = {
  title: 'ADmyBRAND Insights',
  description: 'Analytics dashboard for digital marketing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">{children}</main>
            <footer className="bg-dark text-white py-3 text-center mt-auto">
              <p>&copy; {new Date().getFullYear()} ADmyBRAND. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
