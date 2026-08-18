'use client';

import React, { useState } from 'react';
import AIPreferenceChat from '@/components/profile/AIPreferenceChat';
import ManualProfileForm from '@/components/profile/ManualProfileForm';
import { motion } from 'framer-motion';

export default function ProfileCreatePage() {
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');

  return (
    <div className="min-h-screen bg-cream dark:bg-plum-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-lavender-deep/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-dusty-rose/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-fraunces font-bold text-gray-900 dark:text-white mb-4"
          >
            Create Your Profile
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Tell us about yourself so we can find your perfect match.
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/10 dark:bg-black/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 inline-flex shadow-lg">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'ai' 
                  ? 'bg-lavender-deep text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              ✨ AI Conversational Matchmaker (Recommended)
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'manual' 
                  ? 'bg-lavender-deep text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📝 Standard Form Wizard
            </button>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'ai' ? <AIPreferenceChat /> : <ManualProfileForm />}
        </motion.div>
      </div>
    </div>
  );
}
