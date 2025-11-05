import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { get, set, del } from 'idb-keyval';

const idbPersister = {
  persistClient: async (client: any) => {
    await set('REACT_QUERY_OFFLINE_CACHE', client);
  },
  restoreClient: async () => {
    return await get('REACT_QUERY_OFFLINE_CACHE');
  },
  removeClient: async () => {
    await del('REACT_QUERY_OFFLINE_CACHE');
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  },
});

if (typeof window !== 'undefined') {
  persistQueryClient({
    queryClient,
    persister: idbPersister,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    buster: 'v1',
  });
}