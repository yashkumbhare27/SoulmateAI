import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, fetch from database
  const stats = {
    totalUsers: 1420,
    activeMatches: 342,
    dailySignups: 45,
    reportsPending: 12
  };
  
  return NextResponse.json(stats);
}
