import { type NextRequest, NextResponse } from 'next/server';
import { type ApiData, verifyAccess } from '@vercel/flags';

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      omnisearch: {
        description: 'Controls whether the omnisearch is supported',
        options: [
          { value: false, label: 'Off', },
          { value: true, label: 'On', }
        ],
      },

      dailyLinks: {
        description: 'Controls whether the Daily Links on homagepage is supported',
        options: [
          { value: false, label: 'Off', },
          { value: true, label: 'On', }
        ],
      },

      stories: {
        description: 'Controls whether the Stories is supported',
        options: [
          { value: false, label: 'Off', },
          { value: true, label: 'On', }
        ],
      },
    },
  });
}