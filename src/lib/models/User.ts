import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone?: string;
  email?: string;
  passwordHash?: string;
  name: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  location?: {
    city?: string;
    state?: string;
    country?: string;
    coordinates?: [number, number];
  };
  photos: string[];
  bio?: string;
  preferences?: any;
  aiExtractedPreferences?: any;
  trustBadges: {
    idVerified: boolean;
    videoVerified: boolean;
    familyVerified: boolean;
  };
  marriageReadinessScore: number;
  profileCompleteness: number;
  language: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: { type: [Number], index: '2dsphere' },
    },
    photos: [{ type: String }],
    bio: { type: String, maxlength: 500 },
    preferences: { type: Schema.Types.Mixed }, // Maps to UserPreferences type
    aiExtractedPreferences: { type: Schema.Types.Mixed },
    trustBadges: {
      idVerified: { type: Boolean, default: false },
      videoVerified: { type: Boolean, default: false },
      familyVerified: { type: Boolean, default: false },
    },
    marriageReadinessScore: { type: Number, default: 0, min: 0, max: 100 },
    profileCompleteness: { type: Number, default: 0, min: 0, max: 100 },
    language: { type: String, default: 'en' },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
