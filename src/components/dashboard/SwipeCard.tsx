'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Info } from 'lucide-react';
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
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
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

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, y, rotate }}
      className="absolute top-0 w-full h-[600px] rounded-3xl overflow-hidden shadow-xl bg-plum-black cursor-grab active:cursor-grabbing border border-white/10"
      initial={{ scale: 0.95, opacity: 0 }}
      exit={{ x: exitX, y: exitY, opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="relative w-full h-full">
        {/* Profile Image */}
        <Image
          src={profile.photos[0] || ''}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Swipe Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-15deg] pointer-events-none">
          <span className="text-4xl font-bold text-green-500 tracking-widest drop-shadow-md">LIKE</span>
        </motion.div>
        <motion.div style={{ opacity: passOpacity }} className="absolute top-8 right-8 border-4 border-rose-500 rounded-lg px-4 py-2 rotate-[15deg] pointer-events-none">
          <span className="text-4xl font-bold text-rose-500 tracking-widest drop-shadow-md">PASS</span>
        </motion.div>
        <motion.div style={{ opacity: superLikeOpacity }} className="absolute bottom-1/2 left-1/2 -translate-x-1/2 border-4 border-amber-500 rounded-lg px-4 py-2 pointer-events-none">
          <span className="text-4xl font-bold text-amber-500 tracking-widest drop-shadow-md">SUPER LIKE</span>
        </motion.div>

        {/* Info Content */}
        <div className="absolute bottom-0 w-full p-6 text-white flex flex-col gap-3 pointer-events-none">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-display font-bold flex items-center gap-2">
                {profile.name}, {profile.age}
                {profile.trustBadges.includes('ID Verified') && (
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                )}
              </h2>
              <p className="text-white/80 text-lg">{profile.occupation} • {profile.city}</p>
            </div>
            
            {/* Compatibility Badge */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <span className="text-xl font-bold text-amber-400">{profile.compatibility}%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                  <circle cx="28" cy="28" r="26" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray={`${(profile.compatibility / 100) * 163} 163`} strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/60 mt-1">Match</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 pointer-events-auto">
            <div className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">Why you match</p>
                <p className="text-sm text-white/90 italic">"{profile.aiExplanation}"</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 pointer-events-auto">
            <Link href={`/matches/${profile.id}`} className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors py-3 rounded-full text-center font-medium text-sm flex items-center justify-center gap-2">
              <Info className="w-4 h-4" />
              View Full Compatibility Report
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
