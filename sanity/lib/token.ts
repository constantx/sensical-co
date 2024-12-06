import 'server-only';

// eslint-disable-next-line camelcase
import { experimental_taintUniqueValue } from 'react';

export const token = process.env.SANITY_API_READ_TOKEN;
export const tokenEditor = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}

if (!tokenEditor) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN');
}

experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  token,
);

experimental_taintUniqueValue(
  'Do not pass the sanity API write token to the client.',
  process,
  tokenEditor,
);
