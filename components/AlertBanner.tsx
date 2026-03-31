/* eslint-disable @stylistic/max-len */
'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSyncExternalStore, useTransition } from 'react';

import { disableDraftMode } from '../app/(blog)/actions';

// eslint-disable-next-line func-style
const emptySubscribe = () => () => {};

export default function AlertBanner() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const shouldShow = useSyncExternalStore(
    emptySubscribe,
    () => window.top === window,
    () => false,
  );

  if (!shouldShow) return null;

  const classes = cn(
    'fixed bottom-0 left-0 z-50 w-full border-b bg-background text-foreground',
    {
      'animate-pulse': pending,
      'bg-red-500': true,
    },
  );

  if (!shouldShow) return null;

  return (
    <div className={classes}>
      <div className="py-2 text-center text-sm">
        {pending ? (
          'hodl...'
        ) : (
          <>
            {'In Draft Mode.'}
            <button
              type="button"
              onClick={() =>
                startTransition(() =>
                  disableDraftMode().then(() => {
                    router.refresh();
                  }),
                )}
              className="hover:text-cyan underline transition-colors duration-200"
            >
              {'Disable Draft Mode'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
