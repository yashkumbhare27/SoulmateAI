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
    const code = '123456';

    try {
      if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost:27017')) {
        await connectDB();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete existing OTP for this identifier if any
        await OTP.deleteMany({ identifier });

        await OTP.create({
          identifier,
          code,
          expiresAt,
        });
      }

      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully (Demo code: 123456)',
        code: '123456'
      });
    } catch (dbError) {
      console.warn('MongoDB offline. Using instant demo mode OTP.', dbError);
      return NextResponse.json({ 
        success: true, 
        message: 'Demo mode active. Use OTP 123456.',
        code: '123456'
      });
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    return NextResponse.json({ 
      success: true, 
      message: 'Demo OTP active: 123456',
      code: '123456'
    });
  }
}
