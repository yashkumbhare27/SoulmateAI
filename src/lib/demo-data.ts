/**
 * Demo/mock data for SoulMate AI
 * Used when MongoDB is not connected or for testing/development
 * All data is realistic Indian demographic data
 */

import type { User, Match, MatchCard } from '@/types';

export const demoUsers: Partial<User>[] = [
  {
    id: 'demo-user-1',
    name: 'Priya Sharma',
    dateOfBirth: new Date('1997-03-15'),
    gender: 'female',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    photos: [],
    bio: 'Software engineer by day, classical dancer by evening. Looking for someone who values family as much as career growth. Love traveling to hill stations and trying new cuisines.',
    preferences: {
      ageRange: { min: 26, max: 33 },
      gender: 'male',
      location: { cities: ['Mumbai', 'Pune', 'Bangalore'], maxDistance: 200 },
      values: ['family-oriented', 'ambitious', 'respectful'],
      lifestyle: ['vegetarian', 'non-smoker', 'fitness enthusiast', 'travel lover'],
      education: 'postgraduate',
      religion: 'Hindu',
      occupation: 'professional',
    },
    trustBadges: { idVerified: true, videoVerified: true, familyVerified: false },
    marriageReadinessScore: 82,
    profileCompleteness: 90,
    language: 'en',
  },
  {
    id: 'demo-user-2',
    name: 'Arjun Mehta',
    dateOfBirth: new Date('1995-08-22'),
    gender: 'male',
    location: { city: 'Pune', state: 'Maharashtra', country: 'India' },
    photos: [],
    bio: 'Product manager at a tech startup. Weekend trekker and amateur photographer. Believe in equal partnerships and shared responsibilities. Family means everything to me.',
    preferences: {
      ageRange: { min: 24, max: 30 },
      gender: 'female',
      location: { cities: ['Mumbai', 'Pune'], maxDistance: 150 },
      values: ['family-oriented', 'independent', 'kind'],
      lifestyle: ['non-smoker', 'social drinker', 'fitness enthusiast'],
      education: 'graduate',
      religion: 'Hindu',
      occupation: 'professional',
    },
    trustBadges: { idVerified: true, videoVerified: false, familyVerified: true },
    marriageReadinessScore: 75,
    profileCompleteness: 85,
    language: 'en',
  },
  {
    id: 'demo-user-3',
    name: 'Ananya Reddy',
    dateOfBirth: new Date('1998-11-07'),
    gender: 'female',
    location: { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    photos: [],
    bio: 'Doctor completing her residency. Passionate about healthcare and community service. Love reading, painting, and long conversations over chai. Looking for a thoughtful partner who shares my values.',
    preferences: {
      ageRange: { min: 27, max: 34 },
      gender: 'male',
      location: { cities: ['Hyderabad', 'Bangalore', 'Chennai'], maxDistance: 300 },
      values: ['compassionate', 'educated', 'family-oriented'],
      lifestyle: ['vegetarian', 'non-smoker', 'book lover'],
      education: 'postgraduate',
      religion: 'Hindu',
    },
    trustBadges: { idVerified: true, videoVerified: true, familyVerified: true },
    marriageReadinessScore: 88,
    profileCompleteness: 95,
    language: 'en',
  },
  {
    id: 'demo-user-4',
    name: 'Rahul Kapoor',
    dateOfBirth: new Date('1994-05-18'),
    gender: 'male',
    location: { city: 'Delhi', state: 'Delhi', country: 'India' },
    photos: [],
    bio: 'Chartered accountant running my own practice. Gym enthusiast and foodie. Family man at heart — weekend lunches at home are non-negotiable. Looking for someone who balances tradition with modernity.',
    preferences: {
      ageRange: { min: 23, max: 29 },
      gender: 'female',
      location: { cities: ['Delhi', 'Noida', 'Gurgaon'], maxDistance: 50 },
      values: ['traditional', 'family-oriented', 'caring'],
      lifestyle: ['non-smoker', 'fitness enthusiast', 'foodie'],
      education: 'graduate',
    },
    trustBadges: { idVerified: true, videoVerified: false, familyVerified: false },
    marriageReadinessScore: 70,
    profileCompleteness: 80,
    language: 'en',
  },
  {
    id: 'demo-user-5',
    name: 'Sneha Patel',
    dateOfBirth: new Date('1996-01-25'),
    gender: 'female',
    location: { city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    photos: [],
    bio: 'Fashion designer with my own boutique. Creative soul who loves art galleries and music festivals. Looking for someone adventurous yet grounded. Must love dogs!',
    preferences: {
      ageRange: { min: 26, max: 34 },
      gender: 'male',
      location: { cities: ['Ahmedabad', 'Mumbai', 'Bangalore'], maxDistance: 500 },
      values: ['creative', 'open-minded', 'supportive'],
      lifestyle: ['vegetarian', 'non-smoker', 'pet lover', 'travel lover'],
      education: 'graduate',
      religion: 'Hindu',
    },
    trustBadges: { idVerified: true, videoVerified: true, familyVerified: false },
    marriageReadinessScore: 65,
    profileCompleteness: 88,
    language: 'en',
  },
  {
    id: 'demo-user-6',
    name: 'Vikram Singh',
    dateOfBirth: new Date('1993-09-12'),
    gender: 'male',
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    photos: [],
    bio: 'Senior software architect at a global tech company. Weekend warrior — cycling, swimming, and cooking experiments. Value honesty above everything. Ready for a meaningful partnership.',
    preferences: {
      ageRange: { min: 25, max: 31 },
      gender: 'female',
      location: { cities: ['Bangalore', 'Mysore', 'Chennai'], maxDistance: 200 },
      values: ['honest', 'ambitious', 'family-oriented'],
      lifestyle: ['non-smoker', 'fitness enthusiast', 'health-conscious'],
      education: 'postgraduate',
    },
    trustBadges: { idVerified: true, videoVerified: true, familyVerified: true },
    marriageReadinessScore: 92,
    profileCompleteness: 98,
    language: 'en',
  },
  {
    id: 'demo-user-7',
    name: 'Kavya Iyer',
    dateOfBirth: new Date('1997-07-30'),
    gender: 'female',
    location: { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    photos: [],
    bio: 'Classical vocalist and music teacher. Deeply rooted in tradition but progressive in thinking. Weekend temple visits and Carnatic music concerts are my happy place. Looking for a partner who appreciates art.',
    preferences: {
      ageRange: { min: 27, max: 35 },
      gender: 'male',
      location: { cities: ['Chennai', 'Bangalore', 'Coimbatore'], maxDistance: 250 },
      values: ['culturally-rooted', 'respectful', 'supportive'],
      lifestyle: ['vegetarian', 'non-smoker', 'music lover'],
      education: 'graduate',
      religion: 'Hindu',
    },
    trustBadges: { idVerified: true, videoVerified: false, familyVerified: true },
    marriageReadinessScore: 78,
    profileCompleteness: 85,
    language: 'en',
  },
  {
    id: 'demo-user-8',
    name: 'Aditya Joshi',
    dateOfBirth: new Date('1995-12-03'),
    gender: 'male',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    photos: [],
    bio: 'Investment banker who knows how to switch off after work. Love playing cricket on weekends, watching Bollywood films, and planning road trips. Seeking a partner who is equally driven and fun-loving.',
    preferences: {
      ageRange: { min: 24, max: 30 },
      gender: 'female',
      location: { cities: ['Mumbai', 'Pune', 'Thane'], maxDistance: 100 },
      values: ['fun-loving', 'ambitious', 'family-oriented'],
      lifestyle: ['non-smoker', 'social drinker', 'sports enthusiast'],
      education: 'postgraduate',
    },
    trustBadges: { idVerified: true, videoVerified: true, familyVerified: false },
    marriageReadinessScore: 73,
    profileCompleteness: 82,
    language: 'en',
  },
];

export const demoMatches: MatchCard[] = [
  {
    id: 'match-1',
    user: {
      id: 'demo-user-1',
      name: 'Priya Sharma',
      age: 28,
      location: 'Mumbai, Maharashtra',
      bio: 'Software engineer by day, classical dancer by evening. Looking for someone who values family as much as career growth.',
      photos: [],
      trustBadges: { idVerified: true, videoVerified: true, familyVerified: false },
      profileCompleteness: 90,
    },
    compatibilityScore: 92,
    aiExplanation:
      'You both value family closely, enjoy an active lifestyle, and are looking to settle in Maharashtra. Your shared appreciation for cultural traditions and career ambition creates a strong foundation.',
    greenFlags: [
      'Strong family values alignment',
      'Compatible lifestyle choices',
      'Same region preference',
      'Shared interest in fitness',
      'Both career-driven',
    ],
    redFlags: [],
    sharedInterests: ['Travel', 'Fitness', 'Cultural events', 'Cooking', 'Hill stations'],
  },
  {
    id: 'match-2',
    user: {
      id: 'demo-user-3',
      name: 'Ananya Reddy',
      age: 27,
      location: 'Hyderabad, Telangana',
      bio: 'Doctor completing her residency. Passionate about healthcare and community service.',
      photos: [],
      trustBadges: { idVerified: true, videoVerified: true, familyVerified: true },
      profileCompleteness: 95,
    },
    compatibilityScore: 87,
    aiExplanation:
      'Both of you are highly educated professionals who value compassion and community. Your similar lifestyle preferences and family-first approach make this a promising match.',
    greenFlags: [
      'Both highly educated',
      'Shared compassionate values',
      'Vegetarian lifestyle match',
      'Family-oriented',
    ],
    redFlags: ['Distance may require planning'],
    sharedInterests: ['Reading', 'Community service', 'Art', 'Chai conversations', 'Nature'],
  },
  {
    id: 'match-3',
    user: {
      id: 'demo-user-5',
      name: 'Sneha Patel',
      age: 29,
      location: 'Ahmedabad, Gujarat',
      bio: 'Fashion designer with my own boutique. Creative soul who loves art galleries and music festivals.',
      photos: [],
      trustBadges: { idVerified: true, videoVerified: true, familyVerified: false },
      profileCompleteness: 88,
    },
    compatibilityScore: 78,
    aiExplanation:
      'You complement each other well — her creative energy balances your structured approach. Shared love for travel and openness to new experiences could make this exciting.',
    greenFlags: [
      'Complementary personalities',
      'Shared travel enthusiasm',
      'Both entrepreneurial',
    ],
    redFlags: ['Different city preferences', 'Lifestyle pace difference'],
    sharedInterests: ['Travel', 'Art', 'Music', 'Dogs', 'Food exploration'],
  },
  {
    id: 'match-4',
    user: {
      id: 'demo-user-7',
      name: 'Kavya Iyer',
      age: 28,
      location: 'Chennai, Tamil Nadu',
      bio: 'Classical vocalist and music teacher. Deeply rooted in tradition but progressive in thinking.',
      photos: [],
      trustBadges: { idVerified: true, videoVerified: false, familyVerified: true },
      profileCompleteness: 85,
    },
    compatibilityScore: 84,
    aiExplanation:
      'A beautiful blend of tradition and modernity. You both value cultural roots while maintaining progressive outlooks. Her artistic nature and your appreciation for fine things align well.',
    greenFlags: [
      'Shared cultural values',
      'Both progressive yet traditional',
      'Vegetarian match',
      'Family-approved profiles',
    ],
    redFlags: ['Geographic distance'],
    sharedInterests: ['Music', 'Cultural events', 'Temple visits', 'Art appreciation'],
  },
  {
    id: 'match-5',
    user: {
      id: 'demo-user-2',
      name: 'Arjun Mehta',
      age: 30,
      location: 'Pune, Maharashtra',
      bio: 'Product manager at a tech startup. Weekend trekker and amateur photographer.',
      photos: [],
      trustBadges: { idVerified: true, videoVerified: false, familyVerified: true },
      profileCompleteness: 85,
    },
    compatibilityScore: 89,
    aiExplanation:
      'Arjun believes in equal partnerships and shares your passion for an active lifestyle. His family-first values and professional drive align closely with what you are looking for.',
    greenFlags: [
      'Believes in equal partnerships',
      'Family-first values',
      'Active lifestyle match',
      'Tech professional compatibility',
    ],
    redFlags: [],
    sharedInterests: ['Trekking', 'Photography', 'Technology', 'Travel', 'Fitness'],
  },
];

/**
 * Get demo match cards for a given user
 */
export function getDemoMatchCards(userId?: string): MatchCard[] {
  // In demo mode, return all demo matches shuffled
  return [...demoMatches].sort(() => Math.random() - 0.5);
}

/**
 * Get a specific demo match by ID
 */
export function getDemoMatchById(matchId: string): MatchCard | undefined {
  return demoMatches.find((m) => m.id === matchId);
}

/**
 * Get a demo user by ID
 */
export function getDemoUserById(userId: string): Partial<User> | undefined {
  return demoUsers.find((u) => u.id === userId);
}
