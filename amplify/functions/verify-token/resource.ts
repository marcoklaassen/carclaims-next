import { defineFunction, secret } from '@aws-amplify/backend';

export const handler = defineFunction({
  entry: './handler.ts',
  name: 'verifyTokenFunction',
  environment: {
    JWT_SECRET: secret("JWT_SECRET"),
  },
});