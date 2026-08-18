'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, MessageCircle, User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Discover', icon: Home, href: '/dashboard' },
    { label: 'Matches', icon: Heart, href: '/matches' },
    { label: 'Chat', icon: MessageCircle, href: '/chat' },
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-plum-black text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-6 border-r border-white/5 bg-white/[0.02]">
        <div className="mb-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lavender-500 to-dusty-rose-400 flex items-center justify-center">
            <SparkleIcon />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">SoulMate</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className="relative block">
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'text-amber-400' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <GlassCard className="p-4 mb-4 bg-gradient-to-b from-[#8B5FBF]/20 to-transparent">
            <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Marriage Readiness</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-display font-bold text-amber-400">85%</span>
              <span className="text-sm text-white/40 pb-1">Excellent</span>
            </div>
          </GlassCard>
          
          <button className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-rose-400 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-plum-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around p-4 z-50">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-full ${isActive ? 'bg-white/10 text-amber-400' : 'text-white/60'}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-amber-400' : 'text-white/60'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
