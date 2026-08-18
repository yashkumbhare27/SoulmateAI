'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminModeration() {
  const reports = [
    { id: 'REP-001', type: 'Profile', target: 'User #9234', reason: 'Suspected fake profile/scam', severity: 'High', date: '2 hours ago' },
    { id: 'REP-002', type: 'Message', target: 'Chat #442', reason: 'Inappropriate language', severity: 'Medium', date: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Moderation Queue</h2>
        <p className="text-gray-400">Review flagged profiles and reported messages.</p>
      </div>

      <div className="grid gap-6">
        {reports.map((report, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={report.id} 
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
          >
            <div className="flex gap-4 items-start">
              <div className={`p-3 rounded-xl ${report.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {/* Icon Placeholder */}
                <div className="w-6 h-6 rounded-full bg-current"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-medium text-white">{report.id}</h3>
                  <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-300">{report.type}</span>
                  <span className="text-xs text-gray-500">{report.date}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">Target: <span className="text-white">{report.target}</span></p>
                <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-sm text-gray-300">
                  <span className="font-medium text-gray-400 mr-2">Reason:</span>{report.reason}
                </div>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm text-white">
                Dismiss
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 transition text-sm">
                Warn User
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition text-sm">
                Suspend
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
