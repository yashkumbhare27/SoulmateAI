import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { OTP } from '@/lib/models/OTP';

export const { handlers, auth, signIn, signOut } = NextAuth({
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

        try {
          const db = await connectDB();
          if (!db) throw new Error('Database connection failed');

          // Verify OTP
          const otpRecord = await OTP.findOne({
            identifier: credentials.identifier,
            code: credentials.code,
            expiresAt: { $gt: new Date() },
          });

          if (!otpRecord) {
            // Check for demo fallback if OTP not found or not connected to real DB
            if (
              process.env.NODE_ENV !== 'production' &&
              credentials.identifier === '9999999999' &&
              credentials.code === '123456'
            ) {
              console.log('Demo fallback activated.');
            } else {
              throw new Error('Invalid or expired OTP');
            }
          } else {
            // Delete OTP after successful verification
            await OTP.deleteOne({ _id: otpRecord._id });
          }

          // Find or create user
          let user = await User.findOne({
            $or: [{ phone: credentials.identifier }, { email: credentials.identifier }],
          });

          if (!user) {
            user = await User.create({
              phone: credentials.identifier,
              name: credentials.name || 'New User',
            });
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email || undefined,
            role: user.isAdmin ? 'admin' : 'user',
          };
        } catch (error) {
          console.error('Auth Error:', error);
          
          // Demo fallback when DB isn't available
          if (credentials.identifier === '9999999999' && credentials.code === '123456') {
            return {
              id: 'demo-user-123',
              name: 'Demo User',
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
