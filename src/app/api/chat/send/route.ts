import { NextResponse } from 'next/server';
// import { pusherServer } from '@/lib/pusher-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matchId, content, type, senderId } = body;

    const newMessage = {
      _id: Date.now().toString(),
      matchId,
      content,
      type: type || 'text',
      senderId: senderId || 'user-id',
      createdAt: new Date().toISOString(),
      read: false
    };

    // Trigger pusher event
    // await pusherServer.trigger(`private-chat-${matchId}`, 'new-message', newMessage);

    return NextResponse.json({ message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
