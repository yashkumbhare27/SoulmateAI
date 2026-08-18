import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Mock data for users
  const users = [
    { id: '1', name: 'Aarav Patel', email: 'aarav@example.com', status: 'active', verified: true, badges: ['id', 'video'], marriageReadiness: 85 },
    { id: '2', name: 'Priya Sharma', email: 'priya@example.com', status: 'active', verified: false, badges: ['linkedin'], marriageReadiness: 70 },
  ];
  return NextResponse.json(users);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  // Mock update action
  return NextResponse.json({ message: 'User updated successfully', data: body });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  // Mock patch action
  return NextResponse.json({ message: 'User patched successfully', data: body });
}
