'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import Image from 'next/image';

interface MessageBubbleProps {
  content: string;
  isSender: boolean;
  timestamp: string;
  read?: boolean;
  avatarUrl?: string;
  isSuggestion?: boolean;
  onSuggestionClick?: (content: string) => void;
}

export function MessageBubble({
  content,
  isSender,
  timestamp,
  read,
  avatarUrl,
  isSuggestion,
  onSuggestionClick
}: MessageBubbleProps) {
  const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isSuggestion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => onSuggestionClick?.(content)}
        className="cursor-pointer bg-white/50 backdrop-blur-md border border-[#E8A0BF]/30 rounded-full px-4 py-2 text-sm text-[#8B5FBF] shadow-sm w-fit my-2 flex items-center gap-2 hover:bg-[#E8A0BF]/10 transition-colors"
      >
        <span className="text-[#F59E0B]">✨</span> {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
      className={`flex w-full my-2 ${isSender ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-end gap-2 max-w-[80%] ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isSender && avatarUrl && (
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm relative">
            <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
          </div>
        )}
        
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isSender
              ? 'bg-gradient-to-br from-[#8B5FBF] to-[#6d4b96] text-white rounded-br-sm'
              : 'bg-white/80 backdrop-blur-md border border-white/40 text-gray-800 rounded-bl-sm dark:bg-[#1a1523]/80 dark:border-white/10 dark:text-gray-100'
          }`}
        >
          <p className="text-[15px] leading-relaxed break-words">{content}</p>
          <div className={`flex items-center gap-1 mt-1 text-[11px] ${isSender ? 'text-white/70 justify-end' : 'text-gray-400 justify-start'}`}>
            <span>{timeString}</span>
            {isSender && (
              <span>
                {read ? <CheckCheck size={14} className="text-[#F59E0B]" /> : <Check size={14} />}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
