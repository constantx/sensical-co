import { FlagOverridesType, decrypt } from '@vercel/flags';
import { unstable_flag as flag } from '@vercel/flags/next';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
 
export async function getFlags(request: NextRequest) {
  const overrideCookie = cookies().get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie
    ? await decrypt<FlagOverridesType>(overrideCookie)
    : {};
 
  const flags = {
    omnisearch: overrides?.omnisearch ?? false,
  };
 
  return flags;
}

export const showOmnisearch = flag({
  key: 'omnisearch',
  decide: () => process.env.HANDBOOK_UI_OMNISEARCH === '1',
});

export const showDailyLinks = flag({
  key: 'dailyLinks',
  decide: () => process.env.HANDBOOK_UI_HOMEPAGE_DAILY_LINKS === '1',
});

export const showStories = flag({
  key: 'stories',
  decide: () => process.env.HANDBOOK_UI_HOMEPAGE_STORIES === '1',
});