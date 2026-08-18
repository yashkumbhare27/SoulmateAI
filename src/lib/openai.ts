/**
 * OpenAI integration for SoulMate AI
 * Handles AI preference extraction, match explanations, and conversational AI
 * 
 * DEMO MODE: When OPENAI_API_KEY is not set, returns realistic mock responses
 * so the app can be tested without an API key.
 */

import type { UserPreferences } from '@/types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Call OpenAI chat completions API
 */
async function callOpenAI(messages: ChatMessage[], jsonMode = false): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured - using demo mode');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      ...(jsonMode && { response_format: { type: 'json_object' } }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Extract structured preferences from natural language conversation
 */
export async function extractPreferences(
  conversationHistory: string
): Promise<{
  preferences: Partial<UserPreferences>;
  summary: string;
  confidence: number;
  followUpQuestions: string[];
}> {
  const systemPrompt = `You are a matchmaking AI assistant for SoulMate AI, an Indian matrimonial platform.
Your job is to extract structured partner preferences from a natural language conversation.

Extract the following fields when mentioned:
- ageRange (min and max age)
- gender (preferred partner gender)
- location (preferred cities, max distance)
- values (family values, religious values, etc.)
- lifestyle (vegetarian, non-smoker, fitness, travel, etc.)
- education (minimum education level)
- religion (preferred religion)
- occupation (preferred occupation type)
- height (preferred height range in cm)

Also provide:
- A natural language summary of what they're looking for
- A confidence score (0-1) of how well you understood their preferences
- Follow-up questions for any unclear areas

Respond in JSON format with keys: preferences, summary, confidence, followUpQuestions`;

  try {
    const result = await callOpenAI(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: conversationHistory },
      ],
      true
    );
    return JSON.parse(result);
  } catch {
    // Demo mode fallback
    return {
      preferences: {
        ageRange: { min: 25, max: 32 },
        gender: 'female',
        location: { cities: ['Mumbai', 'Pune'], maxDistance: 100 },
        values: ['family-oriented', 'ambitious', 'caring'],
        lifestyle: ['vegetarian', 'non-smoker', 'fitness enthusiast'],
        education: 'postgraduate',
        religion: 'Hindu',
        occupation: 'professional',
      },
      summary:
        'Looking for a family-oriented, educated woman aged 25-32 in Mumbai or Pune who values health and ambition.',
      confidence: 0.85,
      followUpQuestions: [
        'Do you have a preference for caste or community?',
        'How important is the same mother tongue?',
        'Would you prefer someone who is working or open to homemakers as well?',
      ],
    };
  }
}

/**
 * Generate AI explanation for a match between two users
 */
export async function generateMatchExplanation(
  user1Profile: {
    name: string;
    preferences: Partial<UserPreferences>;
    values?: string[];
    lifestyle?: string[];
    bio?: string;
    location?: { city?: string; state?: string };
  },
  user2Profile: {
    name: string;
    preferences: Partial<UserPreferences>;
    values?: string[];
    lifestyle?: string[];
    bio?: string;
    location?: { city?: string; state?: string };
  }
): Promise<{
  compatibilityScore: number;
  explanation: string;
  greenFlags: string[];
  redFlags: string[];
  sharedInterests: string[];
}> {
  const systemPrompt = `You are a matchmaking AI for SoulMate AI, an Indian matrimonial platform.
Analyze compatibility between two users and provide:
1. A compatibility score (0-100)
2. A warm, natural-language explanation of why they might be a good match (2-3 sentences)
3. Green flags (positive compatibility indicators, 3-5 items)
4. Red flags (potential concerns, 0-2 items, be gentle)
5. Shared interests (things they both enjoy)

Be culturally sensitive to Indian matrimonial context. Focus on values, family orientation, and lifestyle compatibility.
Respond in JSON with keys: compatibilityScore, explanation, greenFlags, redFlags, sharedInterests`;

  try {
    const result = await callOpenAI(
      [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `User 1: ${JSON.stringify(user1Profile)}\n\nUser 2: ${JSON.stringify(user2Profile)}`,
        },
      ],
      true
    );
    return JSON.parse(result);
  } catch {
    // Demo mode fallback with realistic data
    return {
      compatibilityScore: 87,
      explanation: `${user1Profile.name} and ${user2Profile.name} share a strong foundation of family values and both enjoy an active lifestyle. Their preference for settling in the same region and similar educational backgrounds make them a promising match.`,
      greenFlags: [
        'Shared family values',
        'Compatible lifestyle choices',
        'Same city preference',
        'Similar educational background',
        'Aligned life goals',
      ],
      redFlags: ['Slight age gap to discuss'],
      sharedInterests: [
        'Travel',
        'Fitness',
        'Family gatherings',
        'Reading',
        'Cooking',
      ],
    };
  }
}

/**
 * Generate conversational AI response for preference chat
 */
export async function generateChatResponse(
  conversationHistory: ChatMessage[],
  extractedSoFar: Partial<UserPreferences>
): Promise<string> {
  const systemPrompt = `You are a warm, friendly matchmaking AI assistant for SoulMate AI.
You're having a conversation with a user to understand their ideal partner preferences.
Be conversational, warm, and culturally aware (this is an Indian matrimonial platform).

Current extracted preferences: ${JSON.stringify(extractedSoFar)}

Ask natural follow-up questions to fill in gaps. Don't ask more than one question at a time.
Areas to cover: age preference, location, education, religion/caste (sensitively), lifestyle, values, occupation, appearance preferences.

Keep responses brief (2-3 sentences max). Be encouraging and supportive.`;

  try {
    return await callOpenAI([
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
    ]);
  } catch {
    // Demo mode fallback responses
    const missingFields: string[] = [];
    if (!extractedSoFar.ageRange) missingFields.push('age');
    if (!extractedSoFar.location) missingFields.push('location');
    if (!extractedSoFar.education) missingFields.push('education');
    if (!extractedSoFar.values?.length) missingFields.push('values');
    if (!extractedSoFar.lifestyle?.length) missingFields.push('lifestyle');

    const responses: Record<string, string> = {
      age: "That's a great start! 😊 What age range are you looking for in a partner?",
      location:
        "Wonderful! And where would you ideally like your partner to be from? Any preferred cities or states?",
      education:
        "That helps a lot! What about education — do you have a preference for their educational background?",
      values:
        "I love that! What values are most important to you in a partner? For example, family orientation, ambition, spirituality?",
      lifestyle:
        "Great choices! Any lifestyle preferences? For instance, vegetarian/non-vegetarian, fitness habits, or hobbies you'd love to share?",
    };

    const nextField = missingFields[0] || 'values';
    return (
      responses[nextField] ||
      "Thank you for sharing all that! I have a good understanding of what you're looking for. Shall I summarize your preferences?"
    );
  }
}

/**
 * Generate AI prompt for video intro
 */
export async function generateVideoPrompt(): Promise<string> {
  const prompts = [
    "What does your ideal Sunday look like?",
    "Tell us about a family tradition that's special to you.",
    "What's the most important lesson your parents taught you about relationships?",
    "Describe your dream travel destination and who you'd want to go with.",
    "What does 'home' mean to you?",
    "Share something about yourself that surprises people.",
    "What are you most passionate about outside of work?",
    "How do you handle disagreements with people you care about?",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
