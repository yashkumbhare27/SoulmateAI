'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminOverview() {
  const kpis = [
    { title: 'Total Registered Users', value: '14,205', trend: '+12% this week', color: 'from-[#8B5FBF] to-[#6d4a96]' },
    { title: 'Active 7-Day Match Windows', value: '3,420', trend: '+5% this week', color: 'from-[#E8A0BF] to-[#d685a8]' },
    { title: 'Video Verified %', value: '68%', trend: '+2% this week', color: 'from-[#F59E0B] to-[#d97706]' },
    { title: 'Reports in Queue', value: '24', trend: '-8% this week', color: 'from-red-500 to-red-700' },
  ];

  const chartData = [40, 60, 45, 80, 55, 90, 75];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Welcome back to the SoulMate AI Admin Center.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${kpi.color} opacity-20 blur-2xl`}></div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
            <span className="text-xs text-green-400">{kpi.trend}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-medium text-white mb-6">User Signups (Last 7 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((val, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-[#8B5FBF]/80 to-[#E8A0BF]/80 rounded-t-lg transition-all duration-500 group-hover:from-[#8B5FBF] group-hover:to-[#E8A0BF]"
                  style={{ height: `${val}%` }}
                ></div>
                <div className="absolute -top-8 w-full text-center text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {val * 10}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Queue */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col"
        >
          <h3 className="text-lg font-medium text-white mb-4">Verification Queue</h3>
          <div className="flex-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                  <div>
                    <p className="text-sm font-medium text-white">Pending ID Review</p>
                    <p className="text-xs text-gray-400">User #{4839 + i}</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white">
            View All Requests
          </button>
        </motion.div>
      </div>
    </div>
  );
}
