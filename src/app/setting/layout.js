"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 1, title: 'Profile', href: '#' },
    { id: 2, title: 'Subscription', href: '#' }
  ];

  return (
    <div className="min-h-screen max-w-[72rem] mx-auto">
      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex min-h-screen relative">
        {/* Sidebar */}
        <div
          className={`fixed sm:relative top-0 left-0 h-full w-64 bg-white sm:bg-transparent transform transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            sm:translate-x-0 sm:block flex-shrink-0`}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            <nav>
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 block py-2 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 sm:pl-6">
          {children}
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;