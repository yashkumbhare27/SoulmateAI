import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { OTP } from '@/lib/models/OTP';

export async function POST(req: Request) {
  try {
    const { identifier, code } = await req.json();

    if (!identifier || !code) {
      return NextResponse.json({ success: false, message: 'Identifier and code are required' }, { status: 400 });
    }

    // Universal Demo OTP Fallback
    if (code === '123456') {
      return NextResponse.json({ 
        success: true, 
        message: 'OTP verified successfully (Demo mode)',
        user: { id: 'demo-user-1', name: 'Demo User', identifier }
      });
    }

    try {
      await connectDB();
      
      const otpRecord = await OTP.findOne({
        identifier,
        code,
        expiresAt: { $gt: new Date() },
      });

      if (!otpRecord) {
        return NextResponse.json({ success: false, message: 'Invalid or expired OTP' }, { status: 400 });
      }

      return NextResponse.json({ 
        success: true, 
        message: 'OTP verified successfully',
        user: { id: identifier, identifier }
      });
    } catch (dbError) {
      console.warn('DB not connected or failed to verify OTP.', dbError);
      if (code === '123456') {
        return NextResponse.json({ success: true, message: 'Demo OTP verified' });
      }
      return NextResponse.json({ success: false, message: 'Invalid OTP. Please use demo code 123456.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
