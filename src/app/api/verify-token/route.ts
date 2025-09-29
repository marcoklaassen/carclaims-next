import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const secretsManagerClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

async function getJwtSecret(): Promise<string> {
  try {

    console.log('AWS_REGION:', process.env.AWS_REGION);
    const secretName = process.env.JWT_SECRET_NAME;

    console.log('Name of the JWT Secret from environment variables:', secretName);

    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });

    const response = await secretsManagerClient.send(command);

    if (response.SecretString) {
      try {
        const secretObj = JSON.parse(response.SecretString);
        return secretObj.jwt_secret || secretObj.JWT_SECRET || response.SecretString;
      } catch {
        return response.SecretString;
      }
    }

    throw new Error('Secret value not found');
  } catch (error) {
    console.error('Error retrieving JWT secret from AWS Secrets Manager:', error);
    throw new Error('JWT secret not available from Secrets Manager');
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { token } = data;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Kein Token übermittelt',
        },
        { status: 400 },
      );
    }

    try {
      // JWT Secret aus AWS Secrets Manager abrufen
      const jwtSecret = await getJwtSecret();

      const decoded = jwt.verify(token, jwtSecret);

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
