import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import jwt from 'jsonwebtoken';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('=== JWT Secret Debug ===');
    console.log('JWT_SECRET available:', !!process.env.JWT_SECRET);
    console.log('========================');

    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { token } = body;

    if (!token) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          message: 'Kein Token übermittelt',
        }),
      };
    }

    try {
      // JWT Secret aus Umgebungsvariable (injiziert von defineFunction)
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not set');
      }

      console.log('JWT_SECRET successfully retrieved from environment');

      const decoded = jwt.verify(token, jwtSecret);

      // Überprüfe, ob die erforderlichen Felder vorhanden sind
      if (!decoded || typeof decoded !== 'object') {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: false,
            message: 'Ungültiges Token-Format',
          }),
        };
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          data: decoded,
        }),
      };
    } catch (error) {
      console.error('JWT-Verifizierungsfehler:', error);

      // Debug-Informationen in die Response einbauen
      const debugInfo = {
        NODE_ENV: process.env.NODE_ENV,
        JWT_SECRET_available: !!process.env.JWT_SECRET,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        timestamp: new Date().toISOString(),
      };

      if (error instanceof jwt.JsonWebTokenError) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: false,
            message: 'Ungültiges Token',
            debug: debugInfo,
          }),
        };
      } else if (error instanceof jwt.TokenExpiredError) {
        return {
          statusCode: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: false,
            message: 'Token abgelaufen',
            debug: debugInfo,
          }),
        };
      }

      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          message: 'Fehler bei der Token-Verifizierung',
          debug: debugInfo,
        }),
      };
    }
  } catch (error) {
    console.error('Server error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        message: 'Interner Serverfehler',
        debug: {
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        },
      }),
    };
  }
};