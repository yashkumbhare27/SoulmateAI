import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Demo data for full match details
    const matchDetails = {
      id,
      name: id === 'm2' ? 'Marcus' : id === 'm3' ? 'Sophia' : 'Elena',
      age: id === 'm2' ? 31 : id === 'm3' ? 27 : 28,
      city: id === 'm2' ? 'San Francisco' : id === 'm3' ? 'London' : 'New York',
      occupation: id === 'm2' ? 'Product Manager' : id === 'm3' ? 'UX Designer' : 'Architect',
      compatibility: id === 'm2' ? 89 : id === 'm3' ? 91 : 94,
      aiBreakdown: {
        whyYouFit: 'Your profiles indicate a strong complementary dynamic. You tend to be the visionary, while they excel at practical execution. This balance can lead to a highly supportive partnership.',
        communicationStyle: 'Both of you score high in "active listening." You prefer deep, meaningful conversations over small talk, which should make your early dates very engaging.',
        longTermOutlook: 'Highly aligned. You both expressed a desire for a family within 3-5 years and prefer living in urban environments with access to nature.'
      },
      greenFlags: [
        'Financially responsible',
        'Close relationships with family',
        'Consistent communication patterns'
      ],
      redFlags: [
        'Works long hours occasionally',
        'Needs alone time to recharge (discuss boundaries)'
      ],
      sharedInterests: ['Modern Art', 'Hiking', 'Specialty Coffee', 'Indie Films'],
      photos: [
        id === 'm2' ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800' :
        id === 'm3' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' :
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'
      ],
      values: ['Growth Mindset', 'Integrity', 'Empathy']
    };

    return NextResponse.json({ match: matchDetails });
  } catch (error) {
    console.error('Error fetching match details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
