'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock data
const MOCK_MATCHES = [
  { id: 'match1', name: 'Aarav Patel', avatar: 'https://i.pravatar.cc/150?u=match1', lastMessage: 'That sounds like a lovely idea!', unread: 2, timestamp: '10:42 AM', dayOf7: 3 },
  { id: 'match2', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=match2', lastMessage: 'Are we still on for the call later?', unread: 0, timestamp: 'Yesterday', dayOf7: 7 },
];

export default function ChatListPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col pt-6 px-4 pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with your matches</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#8B5FBF]/20 to-[#E8A0BF]/20 rounded-2xl flex items-center justify-center">
          <Heart className="text-[#8B5FBF]" size={24} />
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search matches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-[#1a1523] border border-gray-200 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8B5FBF] shadow-sm text-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-6 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-3 min-w-max">
          <div className="flex items-center gap-2 bg-[#8B5FBF]/10 text-[#8B5FBF] px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles size={16} /> Suggestions
          </div>
          <button className="bg-white dark:bg-[#1a1523] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            "What's your favorite weekend activity?"
          </button>
          <button className="bg-white dark:bg-[#1a1523] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            "Tell me about your family."
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-[#1a1523] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1 p-2">
          {MOCK_MATCHES.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/chat/${match.id}`} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors cursor-pointer relative group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#E8A0BF] transition-colors relative">
                    <Image src={match.avatar} alt={match.name} fill className="object-cover" />
                  </div>
                  {match.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B5FBF] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-[#1a1523]">
                      {match.unread}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{match.name}</h3>
                    <span className="text-xs text-gray-400 shrink-0">{match.timestamp}</span>
                  </div>
                  <p className={`text-sm truncate ${match.unread > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    {match.lastMessage}
                  </p>
                </div>
                
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <div className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${match.dayOf7 === 7 ? 'bg-[#F59E0B]/20 text-[#F59E0B] font-bold' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    <Clock size={12} />
                    Day {match.dayOf7}/7
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
