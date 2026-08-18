'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function LoginForm() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('9999999999');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

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
        setStep(2);
        if (data.code) {
          console.log('Demo code:', data.code);
        }
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch {
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
      });

      if (result?.error) {
        setError('Invalid or expired OTP');
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError('An error occurred during verification.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/70 dark:bg-[#0F0B13]/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-serif">Welcome back</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm backdrop-blur-sm border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSendOtp}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number or Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#8B5FBF] focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="Enter your phone or email"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !identifier}
              className="w-full bg-[#8B5FBF] hover:bg-[#724C9E] text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Don&apos;t have an account? <Link href="/signup" className="text-[#8B5FBF] hover:underline">Sign up</Link>
            </p>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
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
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2"
            >
              Back to edit phone/email
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
}
