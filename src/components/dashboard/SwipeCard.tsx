'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Sparkles, MapPin, Heart, X, Star, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SwipeCardProps {
  profile: any;
  onSwipe: (dir: 'left' | 'right' | 'up', profileId: string) => void;
  active?: boolean;
}

export default function SwipeCard({ profile, onSwipe, active = true }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);

  // Rotate card as it moves
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  
  // Opacity of LIKE / PASS indicators
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);
  const superLikeOpacity = useTransform(y, [-20, -100], [0, 1]);

  const handleDragEnd = async (e: any, info: any) => {
    const offset = info.offset.x;
    const offsetY = info.offset.y;
    const velocity = info.velocity.x;
    const swipeThreshold = 100;

    if (offsetY < -swipeThreshold) {
      setExitY(-500);
      await controls.start({ y: -500, transition: { duration: 0.2 } });
      onSwipe('up', profile.id);
    } else if (offset > swipeThreshold || velocity > 500) {
      setExitX(500);
      await controls.start({ x: 500, transition: { duration: 0.2 } });
      onSwipe('right', profile.id);
    } else if (offset < -swipeThreshold || velocity < -500) {
      setExitX(-500);
      await controls.start({ x: -500, transition: { duration: 0.2 } });
      onSwipe('left', profile.id);
    } else {
      controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  if (!active) return null;

  const photoUrl = profile.photos?.[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';
  const compatibilityScore = profile.compatibility || profile.compatibilityScore || 92;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, y, rotate }}
      className="absolute top-0 w-full h-[620px] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(244,63,94,0.3)] bg-plum-black cursor-grab active:cursor-grabbing border-2 border-pink-400/40 dark:border-pink-500/30"
      initial={{ scale: 0.95, opacity: 0 }}
      exit={{ x: exitX, y: exitY, opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="relative w-full h-full">
        {/* Profile Image with Rosy Warm Tone */}
        <Image
          src={photoUrl}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 450px"
          priority
        />
        
        {/* Vibrant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140417] via-[#140417]/50 via-50% to-pink-900/20 pointer-events-none" />

        {/* Swipe Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-pink-500 rounded-2xl px-5 py-2 rotate-[-15deg] pointer-events-none bg-pink-500/20 backdrop-blur-md shadow-lg">
          <span className="text-4xl font-black text-pink-400 tracking-widest drop-shadow-md">LIKE ❤️</span>
        </motion.div>
        <motion.div style={{ opacity: passOpacity }} className="absolute top-8 right-8 border-4 border-purple-500 rounded-2xl px-5 py-2 rotate-[15deg] pointer-events-none bg-purple-500/20 backdrop-blur-md shadow-lg">
          <span className="text-4xl font-black text-purple-400 tracking-widest drop-shadow-md">PASS ✖</span>
        </motion.div>
        <motion.div style={{ opacity: superLikeOpacity }} className="absolute bottom-1/2 left-1/2 -translate-x-1/2 border-4 border-amber-400 rounded-2xl px-6 py-2.5 pointer-events-none bg-amber-500/20 backdrop-blur-md shadow-lg">
          <span className="text-4xl font-black text-amber-300 tracking-widest drop-shadow-md">SUPER LIKE ⭐</span>
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-pink-500/80 backdrop-blur-md text-white border border-white/30 shadow-md">
            ✨ AI Verified
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck size={14} /> ID Confirmed
          </div>
        </div>

        {/* Info Content at Bottom */}
        <div className="absolute bottom-0 w-full p-6 sm:p-7 text-white flex flex-col gap-3.5 pointer-events-none">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black flex items-center gap-2 drop-shadow-md">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-pink-200/90 text-sm sm:text-base font-medium flex items-center gap-1.5 mt-0.5">
                <MapPin size={14} className="text-pink-400" />
                {profile.city || profile.location} {profile.occupation ? `• ${profile.occupation}` : ''}
              </p>
            </div>
            
            {/* Compatibility Glowing Dial Badge */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600/60 to-purple-600/60 backdrop-blur-xl border-2 border-pink-400/60 shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                <span className="text-xl font-black text-white">{compatibilityScore}%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                  <circle 
                    cx="30" 
                    cy="30" 
                    r="27" 
                    fill="none" 
                    stroke="#FF2E93" 
                    strokeWidth="4" 
                    strokeDasharray={`${(compatibilityScore / 100) * 170} 170`} 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-300 mt-1">Match</span>
            </div>
          </div>

          {/* AI Explanation Pill Box */}
          <div className="bg-white/15 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-pink-300/30 shadow-lg pointer-events-auto">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 p-1 rounded-lg bg-gradient-to-tr from-pink-500 to-amber-400 text-white shrink-0">
                <Sparkles size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-0.5">AI Compatibility Highlight</p>
                <p className="text-xs sm:text-sm text-white/95 italic leading-relaxed">
                  "{profile.aiExplanation || profile.aiExplanationSnippet || 'Strong alignment in family values, career ambition, and preferred lifestyle rhythm.'}"
                </p>
              </div>
            </div>
          </div>

          {/* Full Report Link */}
          <div className="flex items-center gap-2 pt-1 pointer-events-auto">
            <Link 
              href={`/matches/${profile.id}`} 
              className="flex-1 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-rose-500/40 hover:from-pink-500/60 hover:to-rose-500/60 backdrop-blur-xl border border-white/25 transition-all py-3 rounded-2xl text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-white shadow-md active:scale-95"
            >
              <Info size={15} />
              View Full Compatibility Report
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
