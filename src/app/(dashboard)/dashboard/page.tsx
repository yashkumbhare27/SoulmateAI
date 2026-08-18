'use client';

import React from 'react';
import MatchStack from '@/components/dashboard/MatchStack';
import { Filter, Flame, Users, Activity } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 h-full flex flex-col">
      {/* Header Area */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Discover Soulmates</h1>
          <p className="text-white/60">Based on your latest psychological profile analysis.</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Left Col: Match Stack */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[650px] relative">
          <MatchStack />
        </div>

        {/* Right Col: Stats / Banners */}
        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto pr-2 pb-10 md:pb-0">
          
          {/* Soulmate of the Day */}
          <div className="rounded-3xl bg-gradient-to-br from-dusty-rose-400 to-[#8B5FBF] p-1 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
            <div className="bg-plum-black/40 backdrop-blur-md p-6 rounded-[22px] h-full relative z-10 border border-white/10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white tracking-wider mb-4 border border-white/20">
                SOULMATE OF THE DAY
              </span>
              <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">Highly Compatible Profile Alert!</h3>
              <p className="text-white/80 text-sm mb-4">We found someone with a 98% value alignment score who just joined.</p>
              <button className="w-full py-3 bg-white text-plum-black font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                View Profile
              </button>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" /> Your Pulse
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Users className="w-4 h-4 text-white/60" />
                  </div>
                  <span className="text-white/80 text-sm">Profile Views</span>
                </div>
                <span className="font-bold text-white">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Flame className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="text-white/80 text-sm">Mutual Matches</span>
                </div>
                <span className="font-bold text-white">3</span>
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
