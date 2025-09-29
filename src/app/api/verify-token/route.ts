import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// AWS Secrets Manager Client konfigurieren
const secretsManagerClient = new SecretsManagerClient({
  region: process.env.AWS_REGION || 'eu-central-1' // Fallback-Region
});

// Initial Debug beim Import
console.log('=== Secrets Manager Client Debug ===');
console.log('Client initialized with region:', process.env.AWS_REGION || 'eu-central-1 (fallback)');
console.log('====================================');

async function getJwtSecret(): Promise<string> {
  try {
    // Debug-Informationen für Produktion
    console.log('=== AWS Secrets Manager Debug ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('AWS_REGION:', process.env.AWS_REGION);
    console.log('JWT_SECRET_NAME:', process.env.JWT_SECRET_NAME);
    console.log('Available AWS env vars:', Object.keys(process.env).filter(key => key.startsWith('AWS_')));
    console.log('Available JWT env vars:', Object.keys(process.env).filter(key => key.includes('JWT')));
    console.log('================================');

    const secretName = process.env.JWT_SECRET_NAME;

    if (!secretName) {
      throw new Error('JWT_SECRET_NAME environment variable is not set');
    }

    console.log('Retrieving secret with name:', secretName);

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
      console.log('=== POST Debug Info ===');
      console.log('Request received at:', new Date().toISOString());
      console.log('AWS_REGION from POST:', process.env.AWS_REGION);
      console.log('JWT_SECRET_NAME from POST:', process.env.JWT_SECRET_NAME);
      console.log('=======================');

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

      // Debug-Informationen in die Response einbauen
      const debugInfo = {
        NODE_ENV: process.env.NODE_ENV,
        AWS_REGION: process.env.AWS_REGION,
        JWT_SECRET_NAME: process.env.JWT_SECRET_NAME,
        AWS_VARS: Object.keys(process.env).filter(key => key.startsWith('AWS_')),
        JWT_VARS: Object.keys(process.env).filter(key => key.includes('JWT')),
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        timestamp: new Date().toISOString()
      };

      if (error instanceof jwt.JsonWebTokenError) {
        return NextResponse.json({
          success: false,
          message: 'Ungültiges Token',
          debug: debugInfo
        }, { status: 400 });
      } else if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json({
          success: false,
          message: 'Token abgelaufen',
          debug: debugInfo
        }, { status: 401 });
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Fehler bei der Token-Verifizierung',
          debug: debugInfo
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Server error:', error);

    const debugInfo = {
      NODE_ENV: process.env.NODE_ENV,
      AWS_REGION: process.env.AWS_REGION,
      JWT_SECRET_NAME: process.env.JWT_SECRET_NAME,
      AWS_VARS: Object.keys(process.env).filter(key => key.startsWith('AWS_')),
      JWT_VARS: Object.keys(process.env).filter(key => key.includes('JWT')),
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorName: error instanceof Error ? error.name : 'Unknown',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: false,
      message: 'Interner Serverfehler',
      debug: debugInfo
    }, { status: 500 });
  }
}
