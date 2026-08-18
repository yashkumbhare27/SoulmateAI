'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ManualProfileForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = async () => {
    // API call would go here
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          <span>Basic Info</span>
          <span>Photos & Bio</span>
          <span>Preferences</span>
          <span>Verification</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-lavender-deep h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-fraunces font-bold mb-6 text-gray-900 dark:text-white">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                <select className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep">
                  <option>Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                <input type="date" className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input type="text" placeholder="e.g. Mumbai" className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Occupation</label>
                <input type="text" placeholder="e.g. Software Engineer" className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-fraunces font-bold mb-6 text-gray-900 dark:text-white">Photos & Bio</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Profile Photos</label>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <span className="text-4xl text-gray-400">+</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About Me</label>
                <textarea rows={4} placeholder="Write a little about yourself..." className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep"></textarea>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-fraunces font-bold mb-6 text-gray-900 dark:text-white">Partner Preferences</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age Range</label>
                <div className="flex items-center gap-4">
                  <input type="number" placeholder="Min" className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep" />
                  <span>to</span>
                  <input type="number" placeholder="Max" className="w-full bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Core Values (Select up to 3)</label>
                <div className="flex flex-wrap gap-2">
                  {['Family', 'Career', 'Travel', 'Spirituality', 'Fitness', 'Creativity'].map(val => (
                    <button key={val} className="px-4 py-2 rounded-full border border-gray-300 dark:border-white/20 hover:border-lavender-deep dark:hover:border-lavender-light transition-colors text-sm font-medium">
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-fraunces font-bold mb-6 text-gray-900 dark:text-white">Verification</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Build Trust with Verification</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Verified profiles get 3x more matches. Complete ID or video verification to stand out.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                Verify Now
              </button>
              <p className="mt-4 text-sm text-gray-500 cursor-pointer hover:underline">I'll do this later</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex justify-between pt-6 border-t border-gray-200 dark:border-white/10">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
        >
          Back
        </button>
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-lavender-deep hover:bg-lavender-dark text-white font-medium rounded-xl transition-colors shadow-lg"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="px-8 py-3 bg-accent-gold hover:bg-yellow-500 text-white font-bold rounded-xl transition-colors shadow-lg"
          >
            Complete Profile
          </button>
        )}
      </div>
    </div>
  );
}
