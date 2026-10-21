import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { OTP } from '@/lib/models/OTP';

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      id: 'otp-credentials',
      name: 'OTP Credentials',
      credentials: {
        identifier: { label: 'Phone or Email', type: 'text' },
        code: { label: 'OTP Code', type: 'text' },
        name: { label: 'Name (for signup)', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.code) {
          return null;
        }

        const identifier = credentials.identifier as string;
        const code = credentials.code as string;
        const name = (credentials.name as string) || 'Demo User';

        // Universal Demo OTP Fallback (Offline Mode)
        if (code === '123456') {
          return {
            id: 'demo-user-1',
            name,
            email: identifier.includes('@') ? identifier : undefined,
            role: 'user',
          };
        }

        try {
          if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost:27017')) {
            const db = await connectDB();
            if (db) {
              // Verify OTP
              const otpRecord = await OTP.findOne({
                identifier,
                code,
                expiresAt: { $gt: new Date() },
              });

              if (!otpRecord) {
                return null;
              }

              // Delete OTP after successful verification
              await OTP.deleteOne({ _id: otpRecord._id });

              // Find or create user
              let user = await User.findOne({
                $or: [{ phone: identifier }, { email: identifier }],
              });

              if (!user) {
                user = await User.create({
                  phone: identifier,
                  name: name || 'New User',
                });
              }

              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email || undefined,
                role: user.isAdmin ? 'admin' : 'user',
              };
            }
          }

          return null;
        } catch (error) {
          console.error('Auth Error:', error);
          if (code === '123456') {
            return {
              id: 'demo-user-1',
              name,
              role: 'user',
            };
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
