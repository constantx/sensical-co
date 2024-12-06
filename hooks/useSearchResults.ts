import useSWR from 'swr';
import { searchQuery } from '@/sanity/lib/queries';
import { SearchQueryResult } from '@/sanity.types';
import { client } from '@/sanity/lib/client';

interface UseSearchResultsReturn {
  data: SearchQueryResult | undefined;
  error?: any;
  isLoading: boolean;
  isValidating: boolean;
}
// write a hook using swr to fetch search results from sanity useing groq query searchQuery and sanityFetch
function useSearchResults(
  query: string | null | undefined,
  opts = {}
): UseSearchResultsReturn {
  async function fetcher() {
    if (query && query.length < 2) return;

    console.time(`useSearchResults fetch ${query}`);
    const rs = await client.fetch<SearchQueryResult>(
      searchQuery,
      { term: query }
    );
    console.timeEnd(`useSearchResults fetch ${query}`);

    return rs;
  };

  // ? https://swr.vercel.app/docs/api
  return useSWR(query ? `/api/search?${query}` : null, fetcher, opts);
};

export default useSearchResults;