import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_TOKEN = process.env.JWT_TOKEN as string;

export async function POST(request: NextRequest) {
  try {
    if (!JWT_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: 'Kein Token übermittelt',
          debug: {
            nodeEnv: process.env.NODE_ENV,
            jwtSecretExists: !!process.env.JWT_TOKEN,
            jwtSecretLength: process.env.JWT_TOKEN?.length || 0,
            allJwtEnvVars: Object.keys(process.env).filter((k) => k.includes('JWT')),
            allEnvVars: Object.keys(process.env).slice(0, 10), // Erste 10 Env Vars
          },
        },
        { status: 400 },
      );
    }
    const data = await request.json();
    const { token } = data;

    try {
      if (!JWT_TOKEN) {
        throw new Error('JWT_TOKEN is not defined in environment variables');
      }
      const decoded = jwt.verify(token, JWT_TOKEN);

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
