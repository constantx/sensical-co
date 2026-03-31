'use client';
import { VercelToolbar } from '@vercel/toolbar/next';
 
export function StaffToolbar () {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development';
  return shouldInjectToolbar ? <VercelToolbar /> : null;
}