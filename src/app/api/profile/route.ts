import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return mock profile for now
    const mockProfile = {
      id: 'demo-user-1',
      name: 'Demo User',
      age: 28,
      location: 'Mumbai, Maharashtra',
      preferences: {
        ageRange: [25, 32],
        location: ['Mumbai', 'Pune'],
      },
    };

    return NextResponse.json({ profile: mockProfile });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real app, update DB here
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      profile: data
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
