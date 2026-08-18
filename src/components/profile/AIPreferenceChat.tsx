'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ExtractedPreferences {
  locations?: string[];
  ageRange?: [number, number];
  diet?: string;
  profession?: string;
  [key: string]: any;
}

export default function AIPreferenceChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your SoulMate AI Matchmaker. Let's find your perfect match. To start, where are you currently based, and what's your ideal partner's age range?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [preferences, setPreferences] = useState<ExtractedPreferences>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/extract-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Assuming the API returns extracted preferences and an AI response
        if (data.extractedPreferences) {
          setPreferences(prev => ({ ...prev, ...data.extractedPreferences }));
        }
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.followUpQuestion || "Thanks for sharing! What else is important to you in a partner? Values, lifestyle, or anything specific?",
        }]);
      } else {
        // Fallback for demo/missing API
        setTimeout(() => {
          setPreferences({ locations: ['Mumbai'], ageRange: [25, 30], profession: 'Professional' });
          setMessages(prev => [...prev, { role: 'assistant', content: "Got it! Any specific core values or lifestyle choices like diet?" }]);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto h-[600px]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 bg-white/5">
          <h3 className="text-xl font-fraunces font-semibold text-lavender-deep dark:text-lavender-light">Matchmaker AI ✨</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-lavender-deep text-white rounded-tr-sm' 
                    : 'bg-white/10 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white/10 dark:bg-white/5 rounded-2xl px-4 py-3 rounded-tl-sm flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your answer..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-lavender-deep text-gray-800 dark:text-white"
            />
            <button
              onClick={handleSend}
              className="bg-lavender-deep hover:bg-lavender-dark text-white px-6 py-3 rounded-xl transition-colors font-medium shadow-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Live Extraction Badge Area */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex-1 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Detected Preferences</h3>
          
          <div className="space-y-4">
            {Object.keys(preferences).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                Chat with the AI to extract your preferences automatically...
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {preferences.locations && (
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    📍 {preferences.locations.join(', ')}
                  </span>
                )}
                {preferences.ageRange && (
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    🎂 {preferences.ageRange[0]}-{preferences.ageRange[1]} yrs
                  </span>
                )}
                {preferences.profession && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    💼 {preferences.profession}
                  </span>
                )}
                {preferences.diet && (
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    🌱 {preferences.diet}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={Object.keys(preferences).length === 0}
          className="w-full bg-accent-gold hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Confirm & Save Profile
        </button>
      </div>
    </div>
  );
}
