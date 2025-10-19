import { defineFunction, secret } from '@aws-amplify/backend';

export const handler = defineFunction({
  entry: './handler.ts',
  environment: {
    JWT_SECRET: secret("JWT_SECRET"),
  },
});