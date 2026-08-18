'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-cream dark:bg-plum-black text-plum-black dark:text-cream font-sans">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-card py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <SoulmateLogoMark className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-xl tracking-tight">SoulMate AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#testimonials" className="hover:text-primary transition-colors">About</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="font-medium hover:text-primary transition-colors">Log In</Link>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-plum-black dark:text-cream"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full glass-card border-t border-white/10 p-4 flex flex-col gap-4 md:hidden shadow-lg"
          >
            <Link href="#how-it-works" className="px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
            <Link href="#features" className="px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="#testimonials" className="px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <div className="border-t border-black/10 dark:border-white/10 my-2 pt-4 flex flex-col gap-2">
              <Link href="/login" className="px-4 py-2 text-center font-medium" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
              <Button variant="primary" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Button>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-plum-black text-cream py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <SoulmateLogoMark className="w-8 h-8 text-secondary" />
                <span className="font-display font-bold text-2xl tracking-tight">SoulMate AI</span>
              </Link>
              <p className="text-cream/70 max-w-sm mb-6">
                The only matchmaking AI that tells you why. Find your perfect partner with deeper compatibility, trust, and natural communication.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">𝕏</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">IN</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="flex flex-col gap-2 text-cream/70">
                <li><Link href="#how-it-works" className="hover:text-secondary transition-colors">How it Works</Link></li>
                <li><Link href="#features" className="hover:text-secondary transition-colors">Features</Link></li>
                <li><Link href="#testimonials" className="hover:text-secondary transition-colors">Success Stories</Link></li>
                <li><Link href="/pricing" className="hover:text-secondary transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="flex flex-col gap-2 text-cream/70">
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-cream/50 text-sm">
            <p>&copy; {new Date().getFullYear()} SoulMate AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
