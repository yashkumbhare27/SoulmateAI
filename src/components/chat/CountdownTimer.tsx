'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  startDate: string; // ISO string
  onExpire?: () => void;
}

export function CountdownTimer({ startDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const start = new Date(startDate).getTime();
    const end = start + SEVEN_DAYS_MS;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = end - now;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
        onExpire?.();
        clearInterval(interval);
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setProgress(((SEVEN_DAYS_MS - remaining) / SEVEN_DAYS_MS) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, onExpire]);

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-[#F59E0B]/20 via-[#E8A0BF]/20 to-[#8B5FBF]/20 border border-[#F59E0B]/30 rounded-xl p-3 flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-2 text-[#8B5FBF] dark:text-[#E8A0BF] font-medium">
          <Clock className="text-[#F59E0B]" size={18} />
          <span>Mutual Confirmation Stage Active</span>
        </div>
        <div className="text-sm font-semibold text-[#F59E0B]">Day 7 Unlocked</div>
      </motion.div>
    );
  }

  const currentDay = 7 - timeLeft.days;

  return (
    <div className="w-full bg-white/60 dark:bg-[#0F0B13]/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#8B5FBF]" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Day {Math.max(1, currentDay)} of 7: Getting to know each other
          </span>
        </div>
        <div className="text-xs font-semibold bg-[#E8A0BF]/20 text-[#8B5FBF] dark:text-[#E8A0BF] px-2 py-1 rounded-md">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </div>
      </div>
      
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#E8A0BF] to-[#8B5FBF]"
        />
      </div>
    </div>
  );
}
