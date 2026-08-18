'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('+91');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && name.trim()) setStep(2);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();
      
      if (data.success) {
        setStep(3);
        if (data.code) {
          console.log('Demo code:', data.code);
        }
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('otp-credentials', {
        redirect: false,
        identifier,
        code,
        name,
      });

      if (result?.error) {
        setError('Invalid or expired OTP');
        setIsLoading(false);
      } else {
        router.push('/dashboard/profile/create');
      }
    } catch (err) {
      setError('An error occurred during verification.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/70 dark:bg-[#0F0B13]/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-serif">Create your account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm backdrop-blur-sm border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleNextStep}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What's your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#8B5FBF] focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="Full Name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-[#8B5FBF] hover:bg-[#724C9E] text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <Link href="/login" className="text-[#8B5FBF] hover:underline">Log in</Link>
            </p>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form 
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSendOtp}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#8B5FBF] focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="+91"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !identifier}
              className="w-full bg-[#8B5FBF] hover:bg-[#724C9E] text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2"
            >
              Back
            </button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleVerifyOtp}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-3 text-center tracking-[0.5em] text-xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#8B5FBF] focus:border-transparent outline-none transition-all dark:text-white font-mono"
                placeholder="------"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || code.length < 6}
              className="w-full bg-[#8B5FBF] hover:bg-[#724C9E] text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Create Account'}
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2"
            >
              Back to edit phone number
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
