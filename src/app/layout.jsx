/** @jsxImportSource react */
"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export default function RootLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const noSidebarRoutes = ['/login', '/register', '/forgot-password','/'];
    setShowSidebar(!noSidebarRoutes.includes(window.location.pathname));
  }, []);

  return (
    <html lang="es">
      <body className="relative">
        {showSidebar ? (
          <>
            <Sidebar className="fixed top-0 left-0 h-screen w-14 md:w-16 flex flex-col items-center justify-center bg-slate-200" />
            <main className="ml-14 md:ml-16">{children}</main>
          </>
        ) : (
          <main className="w-full">{children}</main>
        )}
      </body>
    </html>
  );
}
