import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: NextRequest) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Kein Token übermittelt' },
        { status: 400 },
      );
    }
    const data = await request.json();
    const { token } = data;

    try {
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
