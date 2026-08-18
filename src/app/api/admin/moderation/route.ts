import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const reports = [
    { id: '1', type: 'profile', targetId: '123', reason: 'Fake profile', status: 'pending', reportedBy: '456', createdAt: new Date().toISOString() },
    { id: '2', type: 'message', targetId: '124', reason: 'Inappropriate language', status: 'pending', reportedBy: '457', createdAt: new Date().toISOString() },
  ];
  
  return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Mock resolve action
  return NextResponse.json({ message: 'Report resolved', data: body });
}
