import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

// Lambda Client konfigurieren
const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || 'eu-north-1',
});

async function invokeVerifyTokenFunction(token: string) {
  try {
    const payload = {
      body: JSON.stringify({ token }),
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const command = new InvokeCommand({
      FunctionName: process.env.VERIFY_TOKEN_FUNCTION_NAME || 'verifyTokenFunction',
      Payload: new TextEncoder().encode(JSON.stringify(payload)),
    });

    console.log('Invoking Amplify Function with payload:', payload);
    const response = await lambdaClient.send(command);

    if (response.Payload) {
      const result = JSON.parse(new TextDecoder().decode(response.Payload));
      console.log('Function response:', result);
      return result;
    }

    throw new Error('No response from function');
  } catch (error) {
    console.error('Error invoking Amplify Function:', error);
    throw error;
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
      // Amplify Function aufrufen
      console.log('=== POST Debug Info ===');
      console.log('Request received at:', new Date().toISOString());
      console.log('AWS_REGION from POST:', process.env.AWS_REGION);
      console.log('VERIFY_TOKEN_FUNCTION_NAME:', process.env.VERIFY_TOKEN_FUNCTION_NAME);
      console.log('=======================');

      const functionResult = await invokeVerifyTokenFunction(token);

      // Function Result direkt zurückgeben
      return NextResponse.json(
        JSON.parse(functionResult.body),
        { status: functionResult.statusCode }
      );

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
