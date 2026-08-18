'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Overview', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Moderation', href: '/admin/moderation' },
    { name: 'Trust Badges', href: '/admin/badges' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#0F0B13] text-[#FCFAF7] font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-display font-bold text-[#F59E0B]">SoulMate <span className="text-[#8B5FBF]">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`block px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#8B5FBF]/20 text-[#E8A0BF] border border-[#8B5FBF]/30 shadow-[0_0_15px_rgba(139,95,191,0.2)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium tracking-wide">System Online</span>
          </div>
          <Link href="/" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-sm font-medium">
            Return to App
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
