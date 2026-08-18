import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matchId, confirmed } = body;

    // Mock update status for 7-day milestone
    return NextResponse.json({ 
      success: true, 
      message: confirmed ? 'Match confirmed' : 'Match declined', 
      matchId, 
      mutualConfirmation: { user1: true, user2: confirmed } 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process confirmation' }, { status: 500 });
  }
}
