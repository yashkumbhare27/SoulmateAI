import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matchId, action } = body;

    if (!matchId || !action) {
      return NextResponse.json({ error: 'Missing matchId or action' }, { status: 400 });
    }

    // In a real app, record the swipe in DB.
    // Here we simulate a 30% chance of a mutual match if 'like' or 'superlike'
    
    let matched = false;
    let matchDetails = null;

    if (action === 'like' || action === 'superlike') {
      matched = Math.random() > 0.7; // 30% chance
      if (matched) {
        matchDetails = {
          id: matchId,
          name: 'Awesome Match',
          photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
        };
      }
    }

    return NextResponse.json({ success: true, matched, matchDetails });
  } catch (error) {
    console.error('Error processing match action:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
