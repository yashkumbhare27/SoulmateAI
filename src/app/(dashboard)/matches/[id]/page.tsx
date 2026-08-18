'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  MessageCircle, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Calendar,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';
import { getDemoMatchById } from '@/lib/demo-data';

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'compatibility' | 'photos'>('overview');

  useEffect(() => {
    async function loadMatch() {
      try {
        const res = await fetch(`/api/matches/${resolvedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setMatch(data.match);
        } else {
          // Fallback to demo data
          const fallback = getDemoMatchById(resolvedParams.id) || getDemoMatchById('match-1');
          setMatch(fallback);
        }
      } catch {
        const fallback = getDemoMatchById(resolvedParams.id) || getDemoMatchById('match-1');
        setMatch(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadMatch();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-medium text-plum-black/60 dark:text-cream/60">Analyzing compatibility metrics...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold font-serif mb-4">Profile Not Found</h2>
        <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const user = match.user;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="flex items-center gap-2 -ml-2"
        >
          <ArrowLeft size={18} />
          <span>Back to Matches</span>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
            <Share2 size={18} />
          </Button>
        </div>
      </div>

      {/* Hero Profile & Compatibility Highlight */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Left: Profile Card Image & Quick Info */}
        <GlassCard className="p-6 md:col-span-1 flex flex-col items-center text-center space-y-4" variant="elevated">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl bg-gradient-to-tr from-primary/30 via-secondary/20 to-cream">
            <div className="w-full h-full flex items-center justify-center font-serif text-5xl font-bold text-primary">
              {user.name.charAt(0)}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-serif font-bold text-plum-black dark:text-cream flex items-center justify-center gap-2">
              {user.name}, {user.age}
            </h1>
            <p className="text-sm text-plum-black/60 dark:text-cream/60 flex items-center justify-center gap-1 mt-1">
              <MapPin size={14} className="text-secondary" />
              {user.location}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {user.trustBadges?.idVerified && <Badge type="id-verified" size="sm" />}
            {user.trustBadges?.videoVerified && <Badge type="video-verified" size="sm" />}
            {user.trustBadges?.familyVerified && <Badge type="family-verified" size="sm" />}
          </div>

          <div className="w-full pt-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-2">
            <Button 
              variant="primary" 
              className="w-full shadow-lg"
              onClick={() => router.push(`/chat/${match.id}`)}
            >
              <MessageCircle size={18} className="mr-2" />
              Start 7-Day Chat
            </Button>
            <Button variant="ghost" className="w-full">
              <Heart size={18} className="mr-2 text-secondary" />
              Send Super Connection
            </Button>
          </div>
        </GlassCard>

        {/* Right: AI Compatibility Score & Report */}
        <div className="md:col-span-2 space-y-6">
          {/* Main AI Compatibility Dial Card */}
          <GlassCard variant="ai-accent" className="p-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="shrink-0">
                <ProgressRing progress={match.compatibilityScore} size={130} strokeWidth={10} />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-ai-gold font-bold text-sm tracking-wider uppercase">
                  <Sparkles size={16} />
                  <span>AI Match Rationale</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-plum-black dark:text-cream">
                  Exceptional Alignment ({match.compatibilityScore}%)
                </h3>
                <p className="text-sm leading-relaxed text-plum-black/80 dark:text-cream/80">
                  {match.aiExplanation}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Green Flags & Areas to Discuss */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Green Flags */}
            <GlassCard className="p-5 space-y-3" variant="default">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Compatible Strengths</span>
              </div>
              <ul className="space-y-2">
                {match.greenFlags?.map((flag: string, idx: number) => (
                  <li key={idx} className="text-xs sm:text-sm text-plum-black/80 dark:text-cream/80 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Red / Amber Flags */}
            <GlassCard className="p-5 space-y-3" variant="default">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <AlertCircle size={18} />
                <span>Conversations to Explore</span>
              </div>
              <ul className="space-y-2">
                {match.redFlags?.length > 0 ? (
                  match.redFlags.map((flag: string, idx: number) => (
                    <li key={idx} className="text-xs sm:text-sm text-plum-black/80 dark:text-cream/80 flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{flag}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs sm:text-sm text-plum-black/60 dark:text-cream/60 italic">
                    No major lifestyle or values friction points detected.
                  </li>
                )}
              </ul>
            </GlassCard>
          </div>

          {/* Shared Interests & Lifestyle Tags */}
          <GlassCard className="p-6 space-y-4" variant="default">
            <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Shared Interests & Passions</h4>
            <div className="flex flex-wrap gap-2">
              {match.sharedInterests?.map((interest: string, idx: number) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  ✨ {interest}
                </span>
              ))}
            </div>

            <h4 className="font-bold text-sm uppercase tracking-wider text-secondary pt-2">About & Lifestyle</h4>
            <p className="text-sm text-plum-black/80 dark:text-cream/80 leading-relaxed">
              {user.bio}
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
