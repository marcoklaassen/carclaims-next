// amplify/functions/verifyTokenFunction/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const token = body?.token;
    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Kein Token übermittelt' }) };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not set in Lambda environment');
      return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Server misconfiguration' }) };
    }

    const decoded = jwt.verify(token, jwtSecret);
    return { statusCode: 200, body: JSON.stringify({ success: true, payload: decoded }) };
  } catch (err: any) {
    console.error('JWT verification error', err);
    return {
      statusCode: err?.name === 'TokenExpiredError' ? 401 : 401,
      body: JSON.stringify({ success: false, message: 'Token ungültig oder abgelaufen', error: err?.message }),
    };
  }
};
