'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import SoulmateLogoMark from '@/components/icons/SoulmateLogoMark';
import { Button } from '@/components/ui/Button';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col mesh-pink-bg text-plum-black dark:text-cream font-sans">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/85 dark:bg-[#18051E]/90 backdrop-blur-2xl py-3 border-b border-pink-300/40 dark:border-pink-800/40 shadow-[0_8px_30px_rgba(244,63,94,0.12)]' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 opacity-40 group-hover:opacity-80 blur-sm transition-opacity" />
              <SoulmateLogoMark size={36} className="relative transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl tracking-tight gradient-brand-text">
                SoulMate AI
              </span>
              <span className="text-[10px] font-bold text-pink-500 -mt-1 tracking-widest uppercase">
                Find Your True Match
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <Link href="#how-it-works" className="text-plum-black/80 dark:text-cream/80 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-plum-black/80 dark:text-cream/80 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-plum-black/80 dark:text-cream/80 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              Love Stories
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-bold text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="shadow-md">
                <Heart size={14} className="mr-1.5 fill-white" /> Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-plum-black dark:text-cream p-2 rounded-xl bg-pink-500/10 border border-pink-500/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#18051E]/95 backdrop-blur-2xl border-t border-pink-200 dark:border-pink-900/50 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            <Link href="#how-it-works" className="px-4 py-2.5 font-bold hover:text-pink-600 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
            <Link href="#features" className="px-4 py-2.5 font-bold hover:text-pink-600 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="#testimonials" className="px-4 py-2.5 font-bold hover:text-pink-600 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Love Stories</Link>
            <div className="border-t border-pink-200 dark:border-pink-900/50 my-2 pt-4 flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">Sign In</Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#140417] text-cream pt-16 pb-12 border-t border-pink-900/40 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <SoulmateLogoMark size={32} />
                <span className="font-display font-extrabold text-2xl tracking-tight gradient-brand-text">
                  SoulMate AI
                </span>
              </Link>
              <p className="text-cream/70 max-w-sm text-sm leading-relaxed">
                The only matchmaking AI that tells you why. Fostering deep compatibility, verified trust, and authentic lifelong partnerships.
              </p>
              <div className="flex gap-3 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  💖 Made with Love for India
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif font-bold text-base mb-4 text-pink-400 uppercase tracking-wider">Product</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-cream/70">
                <li><Link href="#how-it-works" className="hover:text-pink-400 transition-colors">How it Works</Link></li>
                <li><Link href="#features" className="hover:text-pink-400 transition-colors">Explainable AI</Link></li>
                <li><Link href="#testimonials" className="hover:text-pink-400 transition-colors">Love Stories</Link></li>
                <li><Link href="/profile/create" className="hover:text-pink-400 transition-colors">AI Matchmaker Chat</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-base mb-4 text-rose-400 uppercase tracking-wider">Company</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-cream/70">
                <li><Link href="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/admin" className="hover:text-pink-400 transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-14 pt-8 border-t border-pink-900/30 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
            <p>&copy; {new Date().getFullYear()} SoulMate AI Platform. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
              <Link href="/api/health" className="hover:underline">System Status</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
