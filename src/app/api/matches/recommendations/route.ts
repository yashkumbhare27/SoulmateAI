import { NextResponse } from 'next/server';

// Demo fallback data
const DEMO_RECOMMENDATIONS = [
  {
    id: 'm1',
    name: 'Elena',
    age: 28,
    city: 'New York',
    occupation: 'Architect',
    compatibility: 94,
    aiExplanation: 'You both value creative problem-solving and have a shared passion for sustainable living.',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'],
    trustBadges: ['ID Verified', 'Video Verified']
  },
  {
    id: 'm2',
    name: 'Marcus',
    age: 31,
    city: 'San Francisco',
    occupation: 'Product Manager',
    compatibility: 89,
    aiExplanation: 'Your communication styles align perfectly, emphasizing directness with empathy.',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'],
    trustBadges: ['ID Verified']
  },
  {
    id: 'm3',
    name: 'Sophia',
    age: 27,
    city: 'London',
    occupation: 'UX Designer',
    compatibility: 91,
    aiExplanation: 'Shared interests in travel and similar long-term family goals create a strong foundation.',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'],
    trustBadges: ['ID Verified', 'Education Verified']
  }
];

export async function GET() {
  try {
    // In a real app, we would:
    // 1. Get current user session
    // 2. Fetch matches from DB where not already swiped
    // 3. Score/sort using AI
    return NextResponse.json({ recommendations: DEMO_RECOMMENDATIONS });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
