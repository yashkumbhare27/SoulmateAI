'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  
  const users = [
    { id: '1', name: 'Aarav Patel', email: 'aarav@example.com', badges: ['ID', 'Video'], score: 85, status: 'Active' },
    { id: '2', name: 'Priya Sharma', email: 'priya@example.com', badges: ['LinkedIn'], score: 72, status: 'Active' },
    { id: '3', name: 'Rohan Gupta', email: 'rohan@example.com', badges: ['ID'], score: 45, status: 'Suspended' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-display font-bold text-white">User Management</h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5FBF]"
          />
          <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-white">
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Trust Badges</th>
              <th className="px-6 py-4 font-medium">Readiness Score</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={user.id} 
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5FBF] to-[#E8A0BF]"></div>
                  <span className="font-medium text-white">{user.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {user.badges.map(b => (
                      <span key={b} className="px-2 py-1 text-xs rounded-md bg-white/10 text-[#F59E0B] border border-white/10">{b}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-white/10 rounded-full h-2 max-w-[100px]">
                      <div className="bg-[#8B5FBF] h-2 rounded-full" style={{ width: `${user.score}%` }}></div>
                    </div>
                    <span className="text-gray-300">{user.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-sm text-[#E8A0BF] hover:text-white transition">Edit</button>
                  <button className="text-sm text-red-400 hover:text-red-300 transition">Ban</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
