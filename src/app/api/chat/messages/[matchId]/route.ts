import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const { matchId } = await params;
  
  // Mock fallback for MongoDB data
  const mockMessages = [
    { _id: '1', content: 'Hi there! I saw we matched.', senderId: 'partner-id', receiverId: 'user-id', createdAt: new Date(Date.now() - 3600000).toISOString(), read: true },
    { _id: '2', content: 'Hello! Yes, great to connect with you.', senderId: 'user-id', receiverId: 'partner-id', createdAt: new Date(Date.now() - 3500000).toISOString(), read: true }
  ];

  return NextResponse.json({ messages: mockMessages });
}
