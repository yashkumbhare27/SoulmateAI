'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, MessageCircle, User, Settings, LogOut, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SoulmateLogoMark } from '@/components/icons/SoulmateLogoMark';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Discover', icon: Home, href: '/dashboard' },
    { label: 'AI Matchmaker', icon: Sparkles, href: '/profile/create' },
    { label: 'Chat & 7-Day', icon: MessageCircle, href: '/chat' },
    { label: 'Admin Suite', icon: ShieldCheck, href: '/admin' },
  ];

  return (
    <div className="min-h-screen mesh-pink-bg text-plum-black dark:text-cream flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 p-6 border-r border-pink-200/50 dark:border-pink-900/40 bg-white/70 dark:bg-[#1A031E]/80 backdrop-blur-2xl shadow-xl z-20">
        <Link href="/" className="mb-10 flex items-center gap-3 group">
          <SoulmateLogoMark size={36} className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tight gradient-brand-text">SoulMate</span>
            <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest -mt-1">Verified App</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-2.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`));
            return (
              <Link key={item.href} href={item.href} className="relative block">
                {isActive && (
                  <motion.div
                    layoutId="activeNavDashboard"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-rose-500/15 to-purple-500/15 border border-pink-500/40 rounded-2xl shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className={`relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'text-pink-600 dark:text-pink-400 font-extrabold' 
                    : 'text-plum-black/70 dark:text-cream/70 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-pink-100/40 dark:hover:bg-pink-950/30'
                }`}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-pink-600 dark:text-pink-400' : ''}`} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Marriage Readiness Score Card */}
        <div className="mt-auto space-y-3">
          <GlassCard className="p-4 border border-pink-300/50 dark:border-pink-800/40 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-amber-500/10 shadow-[0_4px_20px_rgba(244,63,94,0.15)]">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400">Marriage Readiness</p>
              <Sparkles size={12} className="text-amber-500" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-black gradient-brand-text">88%</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 pb-1">High Intent</span>
            </div>
          </GlassCard>
          
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-plum-black/60 dark:text-cream/60 hover:text-rose-500 hover:bg-rose-500/10 transition-colors w-full text-xs font-bold">
            <LogOut className="w-4 h-4" />
            <span>Switch Account / Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/90 dark:bg-[#1A031E]/95 backdrop-blur-2xl border-t border-pink-200 dark:border-pink-900/50 flex items-center justify-around p-3 z-50 shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`));
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_4px_15px_rgba(244,63,94,0.4)]' 
                  : 'text-plum-black/60 dark:text-cream/60'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-pink-600 dark:text-pink-400' : 'text-plum-black/60 dark:text-cream/60'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
