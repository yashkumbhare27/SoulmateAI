'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MoreVertical, Send, Smile, Paperclip, ShieldCheck } from 'lucide-react';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { CountdownTimer } from '@/components/chat/CountdownTimer';
import { MutualConfirmationModal } from '@/components/chat/MutualConfirmationModal';

// Mock data
const PARTNER = {
  id: 'partner-id',
  name: 'Aarav Patel',
  avatar: 'https://i.pravatar.cc/150?u=match1',
  verified: true
};

const ICEBREAKERS = [
  "✨ Ask about family traditions",
  "✨ Suggest a weekend plan",
  "✨ Ask about favorite travel destination"
];

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;
  
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(); // 6 days ago

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages/${matchId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages");
      }
    };
    fetchMessages();
    
    // In a real app, subscribe to Pusher here
    // const channel = pusherClient.subscribe(`private-chat-${matchId}`);
    // channel.bind('new-message', (msg: any) => {
    //   setMessages(prev => [...prev, msg]);
    // });
    // return () => { pusherClient.unsubscribe(`private-chat-${matchId}`); };
  }, [matchId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;
    
    const tempMessage = {
      _id: Date.now().toString(),
      content,
      senderId: 'user-id',
      createdAt: new Date().toISOString(),
      read: false
    };
    
    setMessages(prev => [...prev, tempMessage]);
    setInputValue('');
    
    try {
      await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, content, senderId: 'user-id' })
      });
    } catch (error) {
      console.error("Failed to send");
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col bg-[#FCFAF7] dark:bg-[#0F0B13]">
      {/* Header */}
      <div className="bg-white/80 dark:bg-[#1a1523]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-col gap-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/chat')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300">
              <ArrowLeft size={20} />
            </button>
            
            <Link href={`/profile/${PARTNER.id}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={PARTNER.avatar} alt={PARTNER.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#8B5FBF] transition-colors">{PARTNER.name}</h2>
                  {PARTNER.verified && <ShieldCheck size={14} className="text-green-500" />}
                </div>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </Link>
          </div>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300">
            <MoreVertical size={20} />
          </button>
        </div>
        
        <CountdownTimer startDate={startDate} onExpire={() => setShowConfirmation(true)} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar">
        <div className="text-center my-6">
          <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            Connection started
          </span>
        </div>
        
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            content={msg.content}
            isSender={msg.senderId === 'user-id'}
            timestamp={msg.createdAt}
            read={msg.read}
            avatarUrl={msg.senderId !== 'user-id' ? PARTNER.avatar : undefined}
          />
        ))}

        {messages.length < 5 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {ICEBREAKERS.map((ib, i) => (
              <MessageBubble
                key={i}
                content={ib.replace('✨ ', '')}
                isSender={false}
                timestamp={new Date().toISOString()}
                isSuggestion={true}
                onSuggestionClick={handleSend}
              />
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/80 dark:bg-[#1a1523]/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-gray-50 dark:bg-[#0F0B13] rounded-3xl p-2 border border-gray-200 dark:border-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-[#8B5FBF]/50 transition-all">
          <button className="p-2.5 text-gray-400 hover:text-[#8B5FBF] transition-colors rounded-full hover:bg-white dark:hover:bg-gray-800">
            <Paperclip size={20} />
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(inputValue);
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-2.5 px-2 text-gray-900 dark:text-white outline-none"
            rows={1}
          />
          
          <button className="p-2.5 text-gray-400 hover:text-[#8B5FBF] transition-colors rounded-full hover:bg-white dark:hover:bg-gray-800">
            <Smile size={20} />
          </button>
          
          <button
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim()}
            className="p-3 bg-gradient-to-br from-[#8B5FBF] to-[#6d4b96] text-white rounded-full hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none transition-all ml-1"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </div>
      </div>

      <MutualConfirmationModal
        isOpen={showConfirmation}
        partnerName={PARTNER.name}
        onConfirm={async () => {
          await fetch('/api/matches/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchId, confirmed: true })
          });
          setShowConfirmation(false);
          alert("Stage Unlocked! 🎉");
        }}
        onDecline={async () => {
          await fetch('/api/matches/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchId, confirmed: false })
          });
          setShowConfirmation(false);
          router.push('/chat');
        }}
      />
    </div>
  );
}
