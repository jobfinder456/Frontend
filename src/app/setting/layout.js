"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname()

  const navigationItems = [
    { id: 1, title: "Profile", href: "/setting/profile" },
    { id: 2, title: "Company", href: "/setting/company" },
    { id: 3, title: "Subscription", href: "/setting/subscription" },

  ];

  return (
    <div className="min-h-screen max-w-[72rem] mx-auto">
      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-md bg-white border-[4px] border-background shadow-md"
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
          className={`fixed sm:relative top-0 left-0 h-full w-48 bg-white sm:bg-transparent transform transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            sm:translate-x-0 sm:block flex-shrink-0`}
        >
          <div className="p-6 pl-8">
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            <nav>
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block py-2 px-3 rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-background"
                        : " hover:bg-background/45"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 sm:pl-6">{children}</div>

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
