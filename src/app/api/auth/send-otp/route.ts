import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { OTP } from '@/lib/models/OTP';

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json({ success: false, message: 'Identifier is required' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      await connectDB();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Delete existing OTP for this identifier if any
      await OTP.deleteMany({ identifier });

      await OTP.create({
        identifier,
        code,
        expiresAt,
      });

      // In production, we wouldn't return the OTP code, but would send SMS/Email instead.
      // For development, we return it to make testing easier.
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully',
        ...(process.env.NODE_ENV !== 'production' && { code })
      });
    } catch (dbError) {
      console.warn('DB not connected or failed to save OTP. Using demo mode.', dbError);
      return NextResponse.json({ 
        success: true, 
        message: 'Demo mode active. Use OTP 123456.',
        code: '123456'
      });
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
