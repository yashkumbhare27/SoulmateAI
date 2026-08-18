export interface UserLocation {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  gender: string;
  location: {
    cities: string[];
    maxDistance: number;
  };
  values: string[];
  lifestyle: string[];
  education?: string | string[];
  religion?: string | string[];
  occupation?: string | string[];
  height?: {
    min: number;
    max: number;
  };
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  location: UserLocation;
  photos: string[];
  bio: string;
  preferences: UserPreferences;
  aiExtractedPreferences?: Partial<UserPreferences>;
  trustBadges: {
    idVerified: boolean;
    videoVerified: boolean;
    familyVerified: boolean;
  };
  marriageReadinessScore: number;
  profileCompleteness: number;
  language: string | string[];
  createdAt: Date;
  lastActive: Date;
  isAdmin: boolean;
}

export interface Match {
  id: string;
  users: [string, string];
  compatibilityScore: number;
  aiExplanation: string;
  greenFlags: string[];
  redFlags: string[];
  sharedInterests: string[];
  status: 'pending' | 'matched' | 'rejected' | 'expired';
  chatWindowStart?: Date;
  chatWindowEnd?: Date;
  mutualConfirmation: {
    user1: boolean;
    user2: boolean;
  };
  createdAt: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'system';
  readAt?: Date;
  createdAt: Date;
}

export interface MatchCard {
  id: string;
  user: {
    id: string;
    name: string;
    age: number;
    location: string;
    bio: string;
    photos: string[];
    trustBadges: {
      idVerified: boolean;
      videoVerified: boolean;
      familyVerified: boolean;
    };
    profileCompleteness: number;
    gender?: string;
  };
  compatibilityScore: number;
  aiExplanation: string;
  greenFlags: string[];
  redFlags: string[];
  sharedInterests: string[];
}

export interface ChatRoom {
  matchId: string;
  otherUser: {
    id: string;
    name: string;
    age?: number;
    location?: string;
    photos: string[];
    trustBadges?: {
      idVerified: boolean;
      videoVerified: boolean;
      familyVerified: boolean;
    };
    bio?: string;
  };
  lastMessage?: Message;
  unreadCount: number;
  chatWindowEnd?: Date;
  isConfirmed: boolean;
}

export interface AdminStats {
  totalUsers: number;
  activeMatches: number;
  dailySignups: number;
  pendingModeration: number;
}

export interface AIPreferenceResponse {
  preferences: Partial<UserPreferences>;
  summary: string;
  confidence: number;
  followUpQuestions?: string[];
}
