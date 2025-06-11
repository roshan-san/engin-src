import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import type { Profile } from '@/utils/supa-types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 10;

export function useProfileSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['profiles', searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('profiles')
        .select('*')
        .range(from, to)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`full_name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,username.ilike.%${searchQuery}%,skills.cs.{${searchQuery}},interests.cs.{${searchQuery}}`);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Search error:', error);
        throw error;
      }
      return data as Profile[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return {
    searchQuery,
    setSearchQuery,
    data,
    status,
    isFetchingNextPage,
    hasNextPage,
    ref,
  };
} 