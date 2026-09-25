'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Star, Heart, Loader2, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SwipeCard from './SwipeCard';
import { SoulmateLogoMark } from '@/components/icons/SoulmateLogoMark';
import { Button } from '@/components/ui/Button';

export default function MatchStack() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/matches/recommendations')
      .then(res => res.json())
      .then(data => {
        setProfiles(data.recommendations || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSwipe = async (dir: 'left' | 'right' | 'up', profileId: string) => {
    const action = dir === 'right' ? 'like' : dir === 'up' ? 'superlike' : 'pass';
    const swipedItem = profiles.find(p => p.id === profileId);

    // Remove from stack
    setProfiles(prev => prev.filter(p => p.id !== profileId));

    try {
      const res = await fetch('/api/matches/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: profileId, action })
      });
      const data = await res.json();
      
      if (data.matched || action === 'like' || action === 'superlike') {
        setMatchedProfile(data.matchDetails || swipedItem);
        setShowMatchModal(true);
      }
    } catch (error) {
      console.error('Error reporting action:', error);
      if (action === 'like' || action === 'superlike') {
        setMatchedProfile(swipedItem);
        setShowMatchModal(true);
      }
    }
  };

  const currentProfile = profiles[0];

  return (
    <div className="relative w-full max-w-md mx-auto h-[740px] flex flex-col items-center">
      {/* Card Stack Area */}
      <div className="relative flex-1 w-full perspective-1000">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 dark:bg-plum-card/40 rounded-[32px] border-2 border-pink-300/40 dark:border-pink-800/40 backdrop-blur-xl animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white mb-4 animate-spin-slow">
              <Sparkles size={28} />
            </div>
            <p className="text-pink-600 dark:text-pink-300 font-bold text-lg font-serif">Curating Your Soulmates...</p>
            <p className="text-xs text-plum-black/60 dark:text-cream/60 mt-1">Analyzing values, lifestyles & preferences</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-plum-card/60 rounded-[32px] border-2 border-pink-300/40 dark:border-pink-800/40 backdrop-blur-xl p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500/20 via-rose-500/20 to-amber-500/20 flex items-center justify-center text-pink-500 border border-pink-400/30">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>
            <h3 className="text-2xl font-serif font-bold gradient-brand-text">All Caught Up!</h3>
            <p className="text-sm text-plum-black/75 dark:text-cream/75 leading-relaxed">
              We are actively computing new compatibility vectors. Check back shortly for new soulmates.
            </p>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Refresh Match Deck
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {profiles.slice(0, 3).reverse().map((profile, index) => (
              <SwipeCard
                key={profile.id}
                profile={profile}
                onSwipe={handleSwipe}
                active={index === profiles.slice(0, 3).length - 1}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Action Controls Bar */}
      <div className="h-24 mt-4 flex items-center justify-center gap-6 z-20">
        {/* Pass Button */}
        <motion.button 
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => currentProfile && handleSwipe('left', currentProfile.id)}
          disabled={!currentProfile || loading}
          className="w-16 h-16 rounded-full bg-white/90 dark:bg-plum-card/90 backdrop-blur-xl border-2 border-purple-300/60 dark:border-purple-600/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-[0_8px_25px_rgba(168,85,247,0.25)] hover:bg-purple-50 disabled:opacity-40 cursor-pointer"
          aria-label="Pass"
        >
          <X className="w-8 h-8" strokeWidth={3} />
        </motion.button>

        {/* Super Like Button */}
        <motion.button 
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => currentProfile && handleSwipe('up', currentProfile.id)}
          disabled={!currentProfile || loading}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-rose-400 flex items-center justify-center text-white shadow-[0_8px_25px_rgba(245,158,11,0.45)] border border-yellow-200/50 disabled:opacity-40 cursor-pointer"
          aria-label="Super Like"
        >
          <Star className="w-7 h-7 fill-white" strokeWidth={2} />
        </motion.button>

        {/* Like Heart Button */}
        <motion.button 
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => currentProfile && handleSwipe('right', currentProfile.id)}
          disabled={!currentProfile || loading}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2E93] via-[#EC4899] to-[#F43F5E] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(244,63,94,0.5)] border-2 border-white/40 disabled:opacity-40 cursor-pointer"
          aria-label="Like"
        >
          <Heart className="w-8 h-8 fill-white" />
        </motion.button>
      </div>

      {/* Match Celebration Modal */}
      <AnimatePresence>
        {showMatchModal && matchedProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              className="relative bg-gradient-to-b from-[#2E0B38] via-[#1A031E] to-[#120215] p-8 sm:p-10 rounded-[36px] w-full max-w-sm text-center border-2 border-pink-400/50 shadow-[0_0_80px_rgba(244,63,94,0.6)] text-white overflow-hidden"
            >
              {/* Top Sparkle Deco */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-rose-500/30 rounded-full blur-2xl" />

              <div className="flex justify-center mb-3">
                <SoulmateLogoMark size={64} />
              </div>

              <h2 className="text-4xl font-display font-black gradient-brand-text mb-2 tracking-tight">
                It's a SoulMate Match!
              </h2>
              <p className="text-pink-200/80 text-sm mb-8 leading-relaxed">
                You and <strong className="text-white font-bold">{matchedProfile.name}</strong> share a 94% compatibility alignment!
              </p>
              
              {/* Dual Avatars Merging */}
              <div className="flex justify-center items-center -space-x-4 mb-8">
                <div className="w-20 h-20 rounded-full border-4 border-pink-400 overflow-hidden relative shadow-lg bg-pink-900/40">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" 
                    alt="You" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-rose-400 overflow-hidden relative shadow-lg bg-rose-900/40">
                  <img 
                    src={matchedProfile.photos?.[0] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300'} 
                    alt={matchedProfile.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href={`/chat/${matchedProfile.id || 'match-1'}`} onClick={() => setShowMatchModal(false)}>
                  <Button variant="primary" size="lg" className="w-full py-4 text-base shadow-xl">
                    <MessageCircle size={18} className="mr-2" /> Start 7-Day Intentional Chat
                  </Button>
                </Link>
                <button 
                  className="w-full text-pink-300/70 hover:text-white font-bold text-xs py-2 transition-colors cursor-pointer"
                  onClick={() => setShowMatchModal(false)}
                >
                  Keep Exploring Profiles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
