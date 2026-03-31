'use server';

import { draftMode } from 'next/headers';

export async function disableDraftMode () {
  'use server';
  await Promise.allSettled([
    draftMode().disable(),
    // Simulate a delay to show the loading state
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}

export async function enableDraftMode () {
  'use server';
  await Promise.allSettled([
    draftMode().enable(),
    // Simulate a delay to show the loading state
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}