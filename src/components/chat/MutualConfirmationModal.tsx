'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, HeartHandshake } from 'lucide-react';

interface MutualConfirmationModalProps {
  isOpen: boolean;
  partnerName: string;
  onConfirm: () => Promise<void>;
  onDecline: () => Promise<void>;
}

export function MutualConfirmationModal({ isOpen, partnerName, onConfirm, onDecline }: MutualConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAction = async (action: 'confirm' | 'decline') => {
    setIsSubmitting(true);
    try {
      if (action === 'confirm') await onConfirm();
      else await onDecline();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F0B13]/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-[#1a1523] w-full max-w-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#8B5FBF]/20 via-[#E8A0BF]/20 to-transparent pointer-events-none" />
          
          <div className="p-8 relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8B5FBF] to-[#E8A0BF] rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
              <HeartHandshake size={32} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
              The 7-Day Milestone
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              You and {partnerName} have been chatting for 7 days! Would you like to take this connection forward and unlock deeper compatibility insights?
            </p>
            
            <div className="flex flex-col w-full gap-3">
              <button
                disabled={isSubmitting}
                onClick={() => handleAction('confirm')}
                className="w-full py-3.5 bg-gradient-to-r from-[#8B5FBF] to-[#E8A0BF] text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Heart size={18} className="fill-white/20" />
                Yes, continue our journey
              </button>
              
              <button
                disabled={isSubmitting}
                onClick={() => handleAction('decline')}
                className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <X size={18} />
                Politely move on
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
