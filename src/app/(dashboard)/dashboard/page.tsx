'use client';

import React from 'react';
import MatchStack from '@/components/dashboard/MatchStack';
import { Filter, Flame, Users, Activity, Sparkles, Heart, Crown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col space-y-6">
      {/* Header Area */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/30 uppercase tracking-wider">
              ✨ Discover Mode
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black gradient-brand-text">
            Recommended Soulmates
          </h1>
          <p className="text-sm md:text-base text-plum-black/75 dark:text-cream/75 mt-1">
            Curated via multi-factor values alignment, cultural intent, and lifestyle compatibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/profile/create">
            <Button variant="primary" size="sm" className="shadow-md">
              <Sparkles size={14} className="mr-1.5" /> Adjust AI Preferences
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 items-start">
        {/* Left Col: Match Stack */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[660px] relative">
          <MatchStack />
        </div>

        {/* Right Col: Stats / Soulmate Highlight Banners */}
        <div className="w-full lg:w-88 flex flex-col gap-6">
          
          {/* Soulmate of the Day */}
          <div className="rounded-[32px] bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 p-[2px] shadow-[0_15px_40px_rgba(244,63,94,0.3)] group">
            <div className="bg-white/90 dark:bg-[#1A031E]/95 backdrop-blur-2xl p-6 rounded-[30px] h-full relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 text-xs font-black text-pink-600 dark:text-pink-400 border border-pink-500/30">
                  <Crown size={12} className="text-amber-500" /> HIGHEST COMPATIBILITY
                </span>
                <span className="text-xs font-extrabold text-amber-500">98% Match</span>
              </div>

              <h3 className="text-2xl font-serif font-black text-plum-black dark:text-cream leading-snug">
                Priya S., 28
              </h3>
              <p className="text-plum-black/80 dark:text-cream/80 text-xs sm:text-sm leading-relaxed">
                Software Engineer & Classical Dancer in Mumbai. Shares your passion for family traditions and fitness.
              </p>

              <Link href="/matches/match-1" className="block">
                <Button variant="primary" className="w-full shadow-md py-3 text-xs sm:text-sm">
                  <Heart size={14} className="mr-1.5 fill-white" /> View Full Compatibility Report
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <GlassCard className="p-6 border-pink-300/40 dark:border-pink-800/40 shadow-lg" variant="default">
            <h3 className="text-base font-serif font-bold text-plum-black dark:text-cream mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-pink-500" /> 
              <span>Your Matrimonial Pulse</span>
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-200/40 dark:border-pink-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-plum-black/80 dark:text-cream/80 text-xs sm:text-sm font-semibold">Profile Views</span>
                </div>
                <span className="font-extrabold text-sm sm:text-base text-pink-600 dark:text-pink-400">38</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/40 dark:border-rose-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="text-plum-black/80 dark:text-cream/80 text-xs sm:text-sm font-semibold">Mutual High Matches</span>
                </div>
                <span className="font-extrabold text-sm sm:text-base text-rose-600 dark:text-rose-400">7</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/40 dark:border-purple-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-plum-black/80 dark:text-cream/80 text-xs sm:text-sm font-semibold">Active 7-Day Chats</span>
                </div>
                <span className="font-extrabold text-sm sm:text-base text-purple-600 dark:text-purple-400">2</span>
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
