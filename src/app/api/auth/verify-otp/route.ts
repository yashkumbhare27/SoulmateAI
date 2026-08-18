import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { OTP } from '@/lib/models/OTP';

export async function POST(req: Request) {
  try {
    const { identifier, code } = await req.json();

    if (!identifier || !code) {
      return NextResponse.json({ success: false, message: 'Identifier and code are required' }, { status: 400 });
    }

    // Demo Mode Check
    if (identifier === '9999999999' && code === '123456') {
      return NextResponse.json({ 
        success: true, 
        message: 'OTP verified (Demo mode)' 
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

      // We don't delete here; we let next-auth authorize do it or we can delete it if we don't rely on it later.
      // Assuming this is an explicit verification step before next-auth, or simply used standalone.
      
      return NextResponse.json({ success: true, message: 'OTP verified successfully' });
    } catch (dbError) {
      console.warn('DB not connected or failed to verify OTP.', dbError);
      return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
