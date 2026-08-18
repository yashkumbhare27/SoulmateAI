'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Star, Heart, Loader2, Sparkles } from 'lucide-react';
import SwipeCard from './SwipeCard';

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
      });
  }, []);

  const handleSwipe = async (dir: 'left' | 'right' | 'up', profileId: string) => {
    const action = dir === 'right' ? 'like' : dir === 'up' ? 'superlike' : 'pass';
    
    // Remove from stack
    setProfiles(prev => prev.filter(p => p.id !== profileId));

    try {
      const res = await fetch('/api/matches/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: profileId, action })
      });
      const data = await res.json();
      
      if (data.matched) {
        setMatchedProfile(data.matchDetails);
        setShowMatchModal(true);
      }
    } catch (error) {
      console.error('Error reporting action:', error);
    }
  };

  const currentProfile = profiles[0];

  return (
    <div className="relative w-full max-w-md mx-auto h-[700px] flex flex-col">
      {/* Card Stack Area */}
      <div className="relative flex-1 w-full perspective-1000">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/10 animate-pulse">
            <Loader2 className="w-8 h-8 text-lavender-500 animate-spin mb-4" />
            <p className="text-white/60">Finding your soulmates...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/10">
            <Sparkles className="w-12 h-12 text-amber-400 mb-4 opacity-50" />
            <p className="text-white/60 text-lg font-medium">Looking for more soulmates...</p>
            <p className="text-white/40 text-sm mt-2 text-center px-8">We are analyzing thousands of profiles to find your perfect match.</p>
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

      {/* Controls */}
      <div className="h-24 mt-6 flex items-center justify-center gap-6">
        <button 
          onClick={() => currentProfile && handleSwipe('left', currentProfile.id)}
          disabled={!currentProfile || loading}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          <X className="w-8 h-8" strokeWidth={3} />
        </button>
        <button 
          onClick={() => currentProfile && handleSwipe('up', currentProfile.id)}
          disabled={!currentProfile || loading}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          <Star className="w-6 h-6 fill-white" strokeWidth={2} />
        </button>
        <button 
          onClick={() => currentProfile && handleSwipe('right', currentProfile.id)}
          disabled={!currentProfile || loading}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-green-500 shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          <Heart className="w-8 h-8 fill-green-500" />
        </button>
      </div>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && matchedProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-b from-[#8B5FBF] to-plum-black p-8 rounded-3xl w-full max-w-sm text-center border border-white/20 shadow-2xl"
            >
              <h2 className="text-5xl font-display font-bold text-white mb-2 tracking-tighter">It's a Match!</h2>
              <p className="text-white/80 mb-8">You and {matchedProfile.name} have liked each other.</p>
              
              <div className="flex justify-center gap-4 mb-10">
                <div className="w-24 h-24 rounded-full border-4 border-amber-400 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="You" className="w-full h-full object-cover" />
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-amber-400 overflow-hidden relative">
                  <img src={matchedProfile.photo} alt={matchedProfile.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <button 
                className="w-full bg-white text-plum-black font-bold py-4 rounded-full mb-4 hover:bg-white/90 transition-colors"
                onClick={() => {
                  setShowMatchModal(false);
                  // Redirect to chat or open chat
                }}
              >
                Start 7-Day Chat
              </button>
              <button 
                className="w-full text-white/60 font-medium py-2 hover:text-white transition-colors"
                onClick={() => setShowMatchModal(false)}
              >
                Keep Swiping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
