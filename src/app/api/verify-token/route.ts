import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || 'eu-north-1',
});

async function invokeVerifyTokenFunction(token: string) {
  const payload = {
    body: JSON.stringify({ token }),
    httpMethod: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const command = new InvokeCommand({
    FunctionName: process.env.VERIFY_TOKEN_FUNCTION_NAME || 'verifyTokenFunction',
    Payload: new TextEncoder().encode(JSON.stringify(payload)), // Uint8Array expected
    // InvocationType: 'RequestResponse' // default = sync
  });

  const response = await lambdaClient.send(command);

  if (!response.Payload) throw new Error('No response from function');

  // response.Payload ist Uint8Array — zuverlässig decoden:
  const decoded = Buffer.from(response.Payload as Uint8Array).toString('utf-8');
  // Lambda returns a JSON string for the Lambda Proxy response { statusCode, body }
  return JSON.parse(decoded);
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
      // Amplify Function aufrufen
      console.log('=== POST Debug Info ===');
      console.log('Request received at:', new Date().toISOString());
      console.log('AWS_REGION from POST:', process.env.AWS_REGION);
      console.log('VERIFY_TOKEN_FUNCTION_NAME:', process.env.VERIFY_TOKEN_FUNCTION_NAME);
      console.log('=======================');

      const functionResult = await invokeVerifyTokenFunction(token);

      // Function Result direkt zurückgeben
      return NextResponse.json(JSON.parse(functionResult.body), {
        status: functionResult.statusCode,
      });
    } catch (error) {
      // Debug-Informationen in die Response einbauen
      const debugInfo = {
        NODE_ENV: process.env.NODE_ENV,
        AWS_REGION: process.env.AWS_REGION,
        VERIFY_TOKEN_FUNCTION_NAME: process.env.VERIFY_TOKEN_FUNCTION_NAME,
        AWS_VARS: Object.keys(process.env).filter((key) => key.startsWith('AWS_')),
        JWT_VARS: Object.keys(process.env).filter((key) => key.includes('JWT')),
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorCause: error instanceof Error ? error.cause : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        timestamp: new Date().toISOString(),
      };

      console.log('=== ERROR Debug Info ===');
      console.log('Error invoking function:', error);
      console.log('Debuginfo:', debugInfo);
      console.log('========================');

      return NextResponse.json(
        {
          success: false,
          message: 'Fehler bei der Token-Verifizierung',
          debug: debugInfo,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Server error:', error);

    const debugInfo = {
      NODE_ENV: process.env.NODE_ENV,
      AWS_REGION: process.env.AWS_REGION,
      VERIFY_TOKEN_FUNCTION_NAME: process.env.VERIFY_TOKEN_FUNCTION_NAME,
      AWS_VARS: Object.keys(process.env).filter((key) => key.startsWith('AWS_')),
      JWT_VARS: Object.keys(process.env).filter((key) => key.includes('JWT')),
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorName: error instanceof Error ? error.name : 'Unknown',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: false,
        message: 'Interner Serverfehler',
        debug: debugInfo,
      },
      { status: 500 },
    );
  }
}
