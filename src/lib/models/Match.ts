import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  users: [mongoose.Types.ObjectId, mongoose.Types.ObjectId];
  compatibilityScore: number;
  aiExplanation?: string;
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
  updatedAt: Date;
}

const MatchSchema = new Schema<IMatch>(
  {
    users: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    compatibilityScore: { type: Number, required: true, min: 0, max: 100 },
    aiExplanation: { type: String },
    greenFlags: [{ type: String }],
    redFlags: [{ type: String }],
    sharedInterests: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'matched', 'rejected', 'expired'],
      default: 'pending',
    },
    chatWindowStart: { type: Date },
    chatWindowEnd: { type: Date },
    mutualConfirmation: {
      user1: { type: Boolean, default: false },
      user2: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

MatchSchema.index({ users: 1 });

export const Match = mongoose.models.Match || mongoose.model<IMatch>('Match', MatchSchema);
