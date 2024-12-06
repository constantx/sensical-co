import '../globals.css';

import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { draftMode } from 'next/headers';
import { Suspense } from 'react';

import { VisualEditing, toPlainText } from 'next-sanity';
import { cn } from '@/lib/utils';
import * as demo from '@/sanity/lib/demo';
import type { SettingsQueryResult } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/fetch';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

// UI Components
import AlertBanner from '@/components/AlertBanner';
import { StaffToolbar } from '@/components/StaffToolbar';
import MainHeader from '@/components/MainHeader';
import { Providers } from './providers';
import Footer from '@/components/MainFooter';

// use Geist font package
import { GeistSans as fontHeading } from 'geist/font/sans';
import { GeistMono as fontMeta } from 'geist/font/mono';

const fontCopy = fontHeading;

// import {
//   Inter as FontHeading, // Bricolage_Grotesque, Cormorant
//   IBM_Plex_Sans as FontCopy,
//   IBM_Plex_Mono as FontMeta,
// } from 'next/font/google';

// const fontHeading = FontMain({
//   subsets: ['latin'],
//   style: ['normal'],
//   weight: ['400', '700'],
//   variable: '--font-heading',
// });

// const fontCopy = FontMain({
//   subsets: ['latin'],
//   style: ['normal'],
//   weight: ['400', '700'],
//   variable: '--font-copy',
// });

// const fontMeta = FontMeta({
//   subsets: ['latin'],
//   style: ['normal'],
//   weight: ['400', '700'], // regular, bold
//   variable: '--font-meta',
// });

export async function generateMetadata (): Promise<Metadata> {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || 'Untitled';
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: { images: ogImage ? [ogImage] : [] },
  };
}



export default async function RootLayout ({ children }: {
  children: React.ReactNode;
}) {
  const [
    settings, 
  ] = await Promise.all([
    sanityFetch<SettingsQueryResult>({ query: settingsQuery }),
  ]);

  return (
    <html lang="en"
      className={cn(`dark text-foreground bg-background
        ${fontHeading.variable} 
        ${fontCopy.variable}
        ${fontMeta.variable}
      `)}
    >
      <body>
        <Providers>
          <MainHeader
            title={settings?.title}
            description={settings?.description}
            links={[]}
            className="my-4"
          />
          <section className="min-h-screen flex flex-col justify-between items-stretch">
            {draftMode().isEnabled && <AlertBanner />}
            <main>{children}</main>
            <Footer settings={settings} />
          </section>
          {draftMode().isEnabled && <VisualEditing />}
          <SpeedInsights />
          <Suspense>
            <StaffToolbar />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
