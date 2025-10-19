import { defineBackend } from '@aws-amplify/backend';
import { handler as verifyTokenFunction } from './functions/verify-token/resource';

export const backend = defineBackend({
  verifyTokenFunction,
});