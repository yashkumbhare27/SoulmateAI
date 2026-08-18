'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { MessageSquareHeart, CheckCircle, ShieldCheck, Clock, HeartHandshake, Video, Sparkles, MapPin, Check } from 'lucide-react';
import { springs, stagger, cardStaggerContainer, cardStaggerItem } from '@/lib/design-tokens';

const stats = [
  { label: 'Matches', value: 50, suffix: 'K+' },
  { label: 'Compatibility', value: 92, suffix: '%' },
  { label: 'Rating', value: 4.8, suffix: '★' },
];

export default function MarketingPage() {
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
    } catch (err) {
      setWaitlistStatus('error');
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        {/* Background Particles/Dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20 dark:bg-primary/40"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) 
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                <span className="block">Find Your Perfect</span>
                <span className="gradient-brand-text block">Soulmate with AI</span>
              </h1>
              <p className="text-xl text-plum-black/70 dark:text-cream/70 max-w-lg font-medium leading-relaxed">
                The only matchmaking AI that tells you why.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Button variant="primary" size="lg" className="text-lg px-8">Get Started</Button>
                <Button variant="ghost" size="lg" className="text-lg px-8">See How It Works</Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-black/10 dark:border-white/10">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + (i * 0.1), ...springs.bouncy }}
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold gradient-gold-text">
                      <Counter value={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-sm font-medium text-plum-black/60 dark:text-cream/60 uppercase tracking-wider mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Visual Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Gradient Orb Placeholder */}
              <motion.div 
                animate={{ 
                  y: [-15, 15, -15],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tr from-primary via-secondary to-ai-gold blur-3xl opacity-60 dark:opacity-40"
              />
              <GlassCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 p-6 flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-plum-black flex items-center justify-center">
                    <Sparkles className="text-ai-gold w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">AI Match Found</h3>
                  <p className="text-sm text-plum-black/70 dark:text-cream/70">92% Compatibility Based on Core Values</p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-24 bg-white/50 dark:bg-black/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-plum-black/70 dark:text-cream/70">A thoughtful, guided journey to find a partner who truly aligns with your life goals.</p>
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
                title: 'Tell AI About You',
                desc: 'Describe your ideal partner conversationally. Our AI extracts deeper preferences beyond just filters.',
                icon: <MessageSquareHeart className="w-8 h-8 text-primary" />
              },
              {
                step: '02',
                title: 'Get Matched',
                desc: 'AI finds compatible matches and tells you exactly why you align on core values and lifestyles.',
                icon: <Sparkles className="w-8 h-8 text-ai-gold" />
              },
              {
                step: '03',
                title: 'Connect & Grow',
                desc: 'Start with a guided 7-day chat window to explore compatibility before deeper commitment.',
                icon: <HeartHandshake className="w-8 h-8 text-secondary" />
              }
            ].map((item) => (
              <motion.div key={item.step} variants={cardStaggerItem}>
                <GlassCard className="h-full p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute -right-6 -top-6 text-9xl font-display font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-primary/10 transition-colors">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-plum-black/70 dark:text-cream/70 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Explainability Section */}
      <section ref={explainRef} className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={explainInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Every Match Comes with a Reason</h2>
              <p className="text-lg text-plum-black/70 dark:text-cream/70 mb-8 leading-relaxed">
                Stop guessing why you matched. SoulMate AI analyzes hundreds of data points and natural language inputs to present exactly why you and your match are compatible.
              </p>
              <ul className="flex flex-col gap-4">
                {['Shared core values and beliefs', 'Compatible lifestyle preferences', 'Aligned future goals'].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Check size={14} />
                    </div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={explainInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ duration: 0.8, ...springs.bouncy }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-20 dark:opacity-30 rounded-full" />
              <div className="glass-ai-accent p-8 rounded-3xl relative z-10 shadow-2xl border border-white/20 dark:border-white/10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex -space-x-4">
                    <div className="w-16 h-16 rounded-full border-4 border-white dark:border-plum-black bg-gradient-to-br from-blue-400 to-purple-500" />
                    <div className="w-16 h-16 rounded-full border-4 border-white dark:border-plum-black bg-gradient-to-br from-pink-400 to-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl">Rohan & Priya</h4>
                    <p className="text-sm text-plum-black/60 dark:text-cream/60">Matched 2 hours ago</p>
                  </div>
                  <div className="w-16 h-16">
                    <ProgressRing progress={92} size={64} strokeWidth={6} color="var(--color-ai-gold)" />
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-black/30 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-ai-gold w-5 h-5" />
                    <span className="font-bold text-sm text-ai-gold">AI Insight</span>
                  </div>
                  <p className="font-medium italic text-plum-black/80 dark:text-cream/80 leading-relaxed">
                    "You both value family closely, enjoy trekking, and are looking to settle in Maharashtra."
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Shared values', 'Compatible lifestyles', 'Same city preference'].map((flag) => (
                    <span key={flag} className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-700 dark:text-green-300 text-sm font-medium flex items-center gap-1.5">
                      <CheckCircle size={14} /> {flag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" ref={featuresRef} className="py-24 bg-white/50 dark:bg-black/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Built for Intentional Dating</h2>
            <p className="text-lg text-plum-black/70 dark:text-cream/70">Features designed to foster trust, depth, and genuine connection.</p>
          </div>

          <motion.div 
            variants={cardStaggerContainer}
            initial="hidden"
            animate={featuresInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: 'AI Natural-Language Preferences', desc: 'Chat naturally to define what you want.', icon: <MessageSquareHeart /> },
              { title: 'Explainable Compatibility', desc: 'See the exact reasons why you matched.', icon: <Sparkles /> },
              { title: 'Trust Badge System', desc: 'ID, Video, and Family verifications.', icon: <ShieldCheck /> },
              { title: '7-Day Chat Window', desc: 'Focus on one connection at a time.', icon: <Clock /> },
              { title: 'Marriage Readiness Score', desc: 'Ensure you align on timelines.', icon: <CheckCircle /> },
              { title: 'AI Video Intros', desc: 'Safe, guided introductions before meeting.', icon: <Video /> },
            ].map((feat, i) => (
              <motion.div key={i} variants={cardStaggerItem}>
                <GlassCard className="p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary flex items-center justify-center mb-4">
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feat.title}</h3>
                  <p className="text-plum-black/70 dark:text-cream/70">{feat.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Success Stories</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ananya & Rahul", location: "Mumbai", quote: "The AI explanation showed us we matched on values we hadn't even thought to list on other apps. We've been married for 6 months now!" },
              { name: "Vikram & Sneha", location: "Bangalore", quote: "I loved the 7-day chat window. It forced us to actually talk and build a connection without the pressure of a million other matches." },
              { name: "Karan & Meera", location: "Delhi", quote: "The trust badges made me feel incredibly safe. Knowing his family details were verified gave me peace of mind from day one." }
            ].map((testimonial, i) => (
              <GlassCard key={i} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex text-ai-gold mb-6">
                    {'★★★★★'}
                  </div>
                  <p className="text-lg font-medium italic mb-8">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-plum-black/60 dark:text-cream/60 flex items-center gap-1">
                      <MapPin size={12} /> {testimonial.location}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-ai-gold opacity-10 dark:opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <GlassCard className="max-w-4xl mx-auto p-12 md:p-16 text-center border-primary/20 bg-white/60 dark:bg-plum-black/60 backdrop-blur-xl shadow-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Soulmate?</h2>
            <p className="text-xl text-plum-black/80 dark:text-cream/80 mb-10 max-w-2xl mx-auto">
              Join thousands of singles who are finding true, lasting connections based on deep compatibility and shared values.
            </p>
            
            <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Button type="submit" variant="primary" size="lg" disabled={waitlistStatus === 'loading'} className="py-4">
                {waitlistStatus === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </form>
            {waitlistStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 mt-4 font-medium">You're on the list! We'll be in touch soon.</p>
            )}
            {waitlistStatus === 'error' && (
              <p className="text-red-500 mt-4 font-medium">Something went wrong. Please try again.</p>
            )}
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

// Simple counter component for stats animation
function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
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
