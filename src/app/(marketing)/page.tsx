'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { 
  MessageSquareHeart, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Video, 
  Sparkles, 
  MapPin, 
  Check, 
  Heart, 
  Flame, 
  Stars, 
  Zap, 
  ArrowRight,
  ShieldAlert,
  Users
} from 'lucide-react';
import { springs, cardStaggerContainer, cardStaggerItem } from '@/lib/design-tokens';
import { SoulmateLogoMark } from '@/components/icons/SoulmateLogoMark';

const stats = [
  { label: 'Meaningful Matches', value: 50, suffix: 'K+' },
  { label: 'Avg Compatibility', value: 92, suffix: '%' },
  { label: 'Happily Married', value: 12, suffix: 'K+' },
  { label: 'Verified Profiles', value: 99, suffix: '%' },
];

const interactiveScenarios = [
  {
    title: "Values & Life Goals",
    pair: "Aarav & Meera",
    score: 96,
    badge: "Exceptional Match",
    quote: "Both prioritize family harmony, love outdoor trekking, and envision settling in Pune.",
    flags: ["Family-Oriented", "Active Lifestyle", "Same City Preference", "Long-term Intent"]
  },
  {
    title: "Career & Ambition",
    pair: "Rohan & Sneha",
    score: 91,
    badge: "Strong Dynamic",
    quote: "Complementary personalities — her creative design flair balances his structured tech leadership.",
    flags: ["Equal Partnership", "Creative Match", "Vegetarian", "Mutual Respect"]
  },
  {
    title: "Cultural & Traditions",
    pair: "Kabir & Ananya",
    score: 89,
    badge: "High Alignment",
    quote: "Deep cultural roots blended with modern outlooks. Both cherish weekend temple visits & music.",
    flags: ["Cultural Harmony", "Educated Background", "Family Verified", "Art Lovers"]
  }
];

export default function MarketingPage() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);
  const explainRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const explainInView = useInView(explainRef, { once: true, margin: "-100px" });

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      if (res.ok) {
        setWaitlistStatus('success');
        setWaitlistEmail('');
      } else {
        setWaitlistStatus('error');
      }
    } catch {
      setWaitlistStatus('error');
    }
  };

  return (
    <div className="w-full overflow-hidden mesh-pink-bg text-plum-black dark:text-cream">
      {/* ── Floating Aurora Gradient Lights ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/25 via-fuchsia-500/20 to-rose-400/20 blur-[130px] animate-float-slow" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-500/20 via-pink-400/25 to-amber-300/15 blur-[150px] animate-float-reverse" />
        <div className="absolute bottom-20 left-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-fuchsia-600/20 via-pink-500/20 to-purple-600/15 blur-[140px] animate-float-slow" />
      </div>

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center pt-24 pb-28 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col gap-6 text-left"
            >
              {/* Pulsing Pink Category Pill */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-purple-500/15 border border-pink-500/30 backdrop-blur-md w-fit shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="text-xs md:text-sm font-bold tracking-wide uppercase bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-300 bg-clip-text text-transparent">
                  Next-Gen AI Matrimonial & Relationship Platform
                </span>
              </motion.div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.08] tracking-tight">
                <span className="block text-plum-black dark:text-cream">Find Your True</span>
                <span className="gradient-brand-text block drop-shadow-sm">
                  Soulmate with AI.
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-plum-black/80 dark:text-cream/80 max-w-2xl font-medium leading-relaxed">
                The only matchmaking AI that <strong className="text-pink-600 dark:text-pink-400 font-bold">tells you why</strong>. Move beyond superficial swipes to deep, verified values compatibility.
              </p>
              
              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/signup">
                  <Button variant="primary" size="lg" className="text-lg px-9 py-4 shadow-xl">
                    <Heart className="w-5 h-5 mr-2 fill-white animate-pulse" />
                    Find My Soulmate
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="flex items-center gap-6 pt-3 text-xs md:text-sm font-semibold text-plum-black/70 dark:text-cream/70">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={18} /> 100% ID Verified
                </span>
                <span className="flex items-center gap-1.5 text-pink-600 dark:text-pink-400">
                  <HeartHandshake size={18} /> Family Trust Mode
                </span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <Stars size={18} /> Privacy First
                </span>
              </div>

              {/* Animated Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-pink-200/50 dark:border-pink-900/40">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 + (i * 0.1), ...springs.bouncy }}
                    className="p-3 rounded-2xl bg-white/40 dark:bg-plum-card/40 border border-pink-200/30 dark:border-pink-900/30 backdrop-blur-sm"
                  >
                    <div className="text-2xl md:text-3xl font-display font-black gradient-brand-text">
                      <Counter value={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-xs font-bold text-plum-black/60 dark:text-cream/60 tracking-wider uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: 3D-Styled Luminous Interactive Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.88 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Outer Radiant Glow Halo */}
              <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-rose-400 blur-3xl opacity-40 animate-pulse" />

              {/* Central Floating Luminous Card Stack */}
              <div className="relative w-full max-w-[420px]">
                
                {/* Floating Badge Top Left */}
                <motion.div 
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 z-20 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-plum-card/90 backdrop-blur-xl border border-pink-300 dark:border-pink-500/30 shadow-[0_8px_30px_rgba(236,72,153,0.3)] flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-sm">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-plum-black dark:text-cream">96% High Alignment</div>
                    <div className="text-[10px] text-pink-600 dark:text-pink-400 font-medium">Verified Compatibility</div>
                  </div>
                </motion.div>

                {/* Floating Badge Bottom Right */}
                <motion.div 
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 z-20 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-plum-card/90 backdrop-blur-xl border border-rose-300 dark:border-rose-500/30 shadow-[0_8px_30px_rgba(244,63,94,0.3)] flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-sm">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-plum-black dark:text-cream">100% ID Verified</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Family Approved</div>
                  </div>
                </motion.div>

                {/* Main Hero Visual Card */}
                <GlassCard className="p-8 sm:p-10 flex flex-col items-center text-center gap-6 shadow-[0_20px_60px_rgba(236,72,153,0.25)] border-pink-400/40 dark:border-pink-500/30 animate-pulse-pink">
                  
                  {/* Glowing 3D Rotating Logo Centerpiece */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/30 via-fuchsia-500/30 to-rose-500/30 animate-spin-slow blur-md" />
                    <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-white via-pink-50 to-rose-100 dark:from-plum-card dark:via-plum-card dark:to-plum-hover p-2 shadow-inner border border-pink-300/60 dark:border-pink-500/40 flex items-center justify-center">
                      <SoulmateLogoMark size={84} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-pink-500/15 text-pink-600 dark:text-pink-300 border border-pink-500/30">
                      💖 Soulmate of the Day
                    </span>
                    <h3 className="font-display text-2xl font-bold text-plum-black dark:text-cream">
                      Priya & Arjun
                    </h3>
                    <p className="text-xs sm:text-sm text-plum-black/75 dark:text-cream/75 leading-relaxed max-w-xs">
                      "Connected over shared trekking goals and deep family values. 7-day chat unlocked mutual confirmation."
                    </p>
                  </div>

                  {/* Compatibility Dial Ring */}
                  <div className="w-full pt-4 border-t border-pink-200/50 dark:border-pink-900/50 flex items-center justify-between px-2">
                    <div className="text-left">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-pink-500">Compatibility</div>
                      <div className="text-sm font-extrabold text-plum-black dark:text-cream">Mutual Intent</div>
                    </div>
                    <ProgressRing progress={94} size={58} strokeWidth={6} />
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE AI COMPATIBILITY SIMULATOR ── */}
      <section ref={explainRef} className="py-28 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30 uppercase tracking-widest">
              Live AI Compatibility Engine
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Every Match Comes with a <span className="gradient-brand-text">Clear Reason.</span>
            </h2>
            <p className="text-base sm:text-xl text-plum-black/75 dark:text-cream/75">
              Select an algorithmic scenario below to see how SoulMate AI calculates compatibility with explainable reasoning:
            </p>

            {/* Scenario Selector Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {interactiveScenarios.map((sc, idx) => (
                <button
                  key={sc.title}
                  onClick={() => setActiveScenario(idx)}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    activeScenario === idx 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_4px_20px_rgba(244,63,94,0.4)] scale-105' 
                      : 'bg-white/60 dark:bg-plum-card/60 border border-pink-200 dark:border-pink-900/40 text-plum-black dark:text-cream hover:bg-pink-100/50'
                  }`}
                >
                  ✨ {sc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Scenario Presentation Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-8 sm:p-12 border-2 border-pink-400/40 dark:border-pink-500/30 shadow-[0_20px_50px_rgba(244,63,94,0.2)] bg-white/80 dark:bg-plum-card/80">
                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Progress Dial & Match Identity */}
                    <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 border-b md:border-b-0 md:border-r border-pink-200/60 dark:border-pink-900/50 pb-6 md:pb-0 md:pr-6">
                      <ProgressRing progress={interactiveScenarios[activeScenario].score} size={130} strokeWidth={10} />
                      <div>
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm">
                          {interactiveScenarios[activeScenario].badge}
                        </span>
                        <h4 className="font-serif text-2xl font-bold mt-2 text-plum-black dark:text-cream">
                          {interactiveScenarios[activeScenario].pair}
                        </h4>
                      </div>
                    </div>

                    {/* Right: AI Explanation & Verified Tags */}
                    <div className="md:col-span-8 space-y-5 text-left">
                      <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-extrabold text-sm uppercase tracking-wider">
                        <Sparkles size={18} />
                        <span>AI Matchmaker Synthesis</span>
                      </div>

                      <blockquote className="text-lg sm:text-xl font-serif italic text-plum-black/90 dark:text-cream/95 leading-relaxed bg-pink-50/80 dark:bg-pink-950/30 p-5 rounded-2xl border-l-4 border-pink-500">
                        "{interactiveScenarios[activeScenario].quote}"
                      </blockquote>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-plum-black/60 dark:text-cream/60 mb-2.5">
                          Detected Compatible Strengths:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {interactiveScenarios[activeScenario].flags.map((flag) => (
                            <span 
                              key={flag}
                              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500/15 text-pink-700 dark:text-pink-300 border border-pink-500/30 flex items-center gap-1.5 shadow-sm"
                            >
                              <CheckCircle size={14} className="text-pink-600 dark:text-pink-400" />
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" ref={howItWorksRef} className="py-28 relative z-10 bg-white/40 dark:bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-500/30 uppercase tracking-widest">
              The 3-Step SoulMate Journey
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Designed for <span className="gradient-brand-text">Depth & Romance</span>
            </h2>
            <p className="text-lg text-plum-black/75 dark:text-cream/75">
              A gentle, AI-guided progression from conversational profiling to meaningful marriage.
            </p>
          </div>

          <motion.div 
            variants={cardStaggerContainer}
            initial="hidden"
            animate={howItWorksInView ? "show" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Natural Language Chat',
                desc: 'Speak naturally to our AI Matchmaker. It understands your nuanced values, lifestyle pace, family outlook, and life dreams.',
                icon: <MessageSquareHeart className="w-8 h-8 text-pink-500" />,
                gradient: 'from-pink-500/20 to-rose-500/20'
              },
              {
                step: '02',
                title: 'Curated Explanations',
                desc: 'Receive AI compatibility scores paired with plain-language explanations of why you match on values, culture, and life goals.',
                icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                gradient: 'from-amber-500/20 to-pink-500/20'
              },
              {
                step: '03',
                title: '7-Day Intentional Chat',
                desc: 'Chat in a focused 7-day window. On Day 7, mutually confirm continued interest to unlock video calls and family introductions.',
                icon: <HeartHandshake className="w-8 h-8 text-rose-500" />,
                gradient: 'from-rose-500/20 to-purple-500/20'
              }
            ].map((item) => (
              <motion.div key={item.step} variants={cardStaggerItem}>
                <GlassCard className="h-full p-8 relative overflow-hidden group hover:border-pink-500/60 hover:shadow-[0_15px_40px_rgba(244,63,94,0.25)] transition-all duration-300">
                  <div className="absolute -right-4 -top-4 text-8xl font-display font-black text-pink-500/10 dark:text-pink-400/10 group-hover:text-pink-500/20 transition-colors">
                    {item.step}
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-sm border border-white/20`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-plum-black dark:text-cream">{item.title}</h3>
                  <p className="text-plum-black/75 dark:text-cream/75 leading-relaxed text-sm">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CORE DIFFERENTIATORS / FEATURES GRID ── */}
      <section id="features" ref={featuresRef} className="py-28 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/15 text-pink-600 dark:text-pink-300 border border-pink-500/30 uppercase tracking-widest">
              Flagship Differentiators
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Why Serious Singles Choose <span className="gradient-brand-text">SoulMate AI</span>
            </h2>
            <p className="text-lg text-plum-black/75 dark:text-cream/75">
              Engineered with cultural nuance for long-term matrimonial confidence.
            </p>
          </div>

          <motion.div 
            variants={cardStaggerContainer}
            initial="hidden"
            animate={featuresInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { 
                title: 'Natural Language Preferences', 
                desc: 'No more 50-field forms. Describe your ideal partner conversationally and let AI extract structured parameters.', 
                icon: <MessageSquareHeart className="text-pink-500" /> 
              },
              { 
                title: 'Explainable Compatibility', 
                desc: 'Every recommendation reveals why you match, highlight green flags, and suggest thoughtful conversation topics.', 
                icon: <Sparkles className="text-amber-500" /> 
              },
              { 
                title: 'Multi-Tier Trust Badges', 
                desc: 'Dedicated verification badges for Government ID, Video Authenticity, and Family Member confirmation.', 
                icon: <ShieldCheck className="text-emerald-500" /> 
              },
              { 
                title: '7-Day Intentional Window', 
                desc: 'Dedicated countdown clock encouraging meaningful conversation before mutual Day 7 progression.', 
                icon: <Clock className="text-rose-500" /> 
              },
              { 
                title: 'Marriage Readiness Score', 
                desc: 'A private, self-reflective rating assessing emotional readiness, timeline alignment, and life maturity.', 
                icon: <Heart className="text-purple-500" /> 
              },
              { 
                title: 'AI Video Intros', 
                desc: '30-second AI-prompted responses revealing natural voice, personality, and authenticity.', 
                icon: <Video className="text-pink-600" /> 
              },
            ].map((feat, i) => (
              <motion.div key={i} variants={cardStaggerItem}>
                <GlassCard className="p-7 h-full hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(244,63,94,0.2)] border-pink-200/50 dark:border-pink-900/40 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/15 to-rose-500/15 border border-pink-300/40 dark:border-pink-600/30 flex items-center justify-center mb-5 shadow-sm">
                    {feat.icon}
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-2.5 text-plum-black dark:text-cream">{feat.title}</h3>
                  <p className="text-plum-black/75 dark:text-cream/75 text-sm leading-relaxed">{feat.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section id="testimonials" className="py-28 relative z-10 bg-white/40 dark:bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/15 text-pink-600 dark:text-pink-300 border border-pink-500/30 uppercase tracking-widest">
              Real Love Stories
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
              Matches That Led to <span className="gradient-brand-text">"I Do"</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Ananya & Rahul", 
                location: "Mumbai, Maharashtra", 
                quote: "The AI explanation revealed our shared values about family caregiving that we would have never known from ordinary bio lines. Married for 8 months now!",
                score: "94% Match"
              },
              { 
                name: "Vikram & Sneha", 
                location: "Bangalore, Karnataka", 
                quote: "The 7-day chat window gave us the perfect space to focus on one another without the overwhelming noise of casual swipe apps.",
                score: "91% Match"
              },
              { 
                name: "Karan & Meera", 
                location: "Delhi NCR", 
                quote: "The multi-tier trust badges and family verification gave both our parents complete peace of mind. Truly the best matrimonial experience.",
                score: "97% Match"
              }
            ].map((story, i) => (
              <GlassCard key={i} className="p-8 flex flex-col justify-between border-pink-200/60 dark:border-pink-900/40 shadow-lg hover:shadow-[0_15px_40px_rgba(244,63,94,0.2)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-lg">★★★★★</div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-pink-500/15 text-pink-600 dark:text-pink-300 border border-pink-500/30">
                      {story.score}
                    </span>
                  </div>
                  <p className="text-base font-serif italic text-plum-black/85 dark:text-cream/90 leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-6 border-t border-pink-100 dark:border-pink-900/30 mt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-plum-black dark:text-cream">{story.name}</h4>
                    <p className="text-xs text-plum-black/60 dark:text-cream/60 flex items-center gap-1">
                      <MapPin size={11} className="text-pink-500" /> {story.location}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / WAITLIST BANNER ── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <GlassCard className="max-w-4xl mx-auto p-12 md:p-16 text-center border-2 border-pink-400/40 dark:border-pink-500/40 bg-gradient-to-br from-white/90 via-pink-50/70 to-rose-100/60 dark:from-plum-card dark:via-plum-card dark:to-plum-hover shadow-[0_25px_60px_rgba(244,63,94,0.35)] relative overflow-hidden">
            
            {/* Background Halo */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/15 text-pink-600 dark:text-pink-300 border border-pink-500/30 uppercase tracking-widest inline-block mb-6">
              Begin Your Love Story
            </span>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-plum-black dark:text-cream">
              Ready to Find Your <span className="gradient-brand-text">Soulmate?</span>
            </h2>

            <p className="text-base sm:text-xl text-plum-black/80 dark:text-cream/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of conscious singles exploring genuine compatibility with SoulMate AI.
            </p>
            
            <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email or phone"
                className="flex-1 px-5 py-4 rounded-2xl border border-pink-300 dark:border-pink-700/50 bg-white/90 dark:bg-black/50 text-plum-black dark:text-cream placeholder:text-plum-black/40 dark:placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
              />
              <Button type="submit" variant="primary" size="lg" disabled={waitlistStatus === 'loading'} className="py-4 px-8 shadow-lg">
                {waitlistStatus === 'loading' ? 'Joining...' : 'Get Early Access'}
              </Button>
            </form>

            {waitlistStatus === 'success' && (
              <p className="text-emerald-600 dark:text-emerald-400 mt-4 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle size={16} /> You're on the priority list! Welcome to SoulMate AI.
              </p>
            )}
            {waitlistStatus === 'error' && (
              <p className="text-rose-500 mt-4 font-semibold">Something went wrong. Please try again.</p>
            )}
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

// Counter animation
function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 1800;
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, value]);

  return <span ref={nodeRef}>{count}</span>;
}
