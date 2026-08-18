import { NextResponse } from 'next/server';
import { extractPreferences } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const conversationHistory = Array.isArray(messages)
      ? messages.map((m: any) => `${m.role || m.sender || 'User'}: ${m.content || m.text || ''}`).join('\n')
      : String(messages);

    // Call OpenAI helper
    const extractionResult = await extractPreferences(conversationHistory);

    return NextResponse.json(extractionResult);
  } catch (error) {
    console.error('Error in extract-preferences API:', error);
    return NextResponse.json(
      { error: 'Failed to extract preferences' },
      { status: 500 }
    );
  }
}
