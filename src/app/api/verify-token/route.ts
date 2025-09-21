import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: NextRequest) {
  try {
    console.log('=== AMPLIFY ENV DEBUG ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length || 0);
    console.log(
      'All env vars with JWT:',
      Object.keys(process.env).filter((k) => k.includes('JWT')),
    );
    console.log('=== END DEBUG ===');
    if (!JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Kein Token übermittelt' },
        { status: 400 },
      );
    }
    const data = await request.json();
    const { token } = data;

    try {
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      const decoded = jwt.verify(token, JWT_SECRET);

      // Überprüfe, ob die erforderlichen Felder vorhanden sind
      if (!decoded || typeof decoded !== 'object') {
        return NextResponse.json(
          { success: false, message: 'Ungültiges Token-Format' },
          { status: 400 },
        );
      }

      return NextResponse.json({
        success: true,
        data: decoded,
      });
    } catch (error) {
      console.error('JWT-Verifizierungsfehler:', error);

      if (error instanceof jwt.JsonWebTokenError) {
        return NextResponse.json({ success: false, message: 'Ungültiges Token' }, { status: 400 });
      } else if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json({ success: false, message: 'Token abgelaufen' }, { status: 401 });
      }

      return NextResponse.json(
        { success: false, message: 'Fehler bei der Token-Verifizierung' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ success: false, message: 'Interner Serverfehler' }, { status: 500 });
  }
}
