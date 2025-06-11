import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import type { Startup } from '@/utils/supa-types';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 10;

export default function SearchStartups() {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['startups', searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('startups')
        .select('*')
        .range(from, to)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Startup[];
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

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search startups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {status === 'pending' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <div>Error loading startups</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.pages.map((page, i) => (
            page.map((startup) => (
              <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{startup.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{startup.description}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm"><strong>Location:</strong> {startup.location}</p>
                    <p className="text-sm"><strong>Team Size:</strong> {startup.team_size}</p>
                    <p className="text-sm"><strong>Funding:</strong> ${startup.funding.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ))}
          
          <div ref={ref} className="col-span-full h-10 flex items-center justify-center">
            {isFetchingNextPage ? (
              <div>Loading more...</div>
            ) : hasNextPage ? (
              <div>Load more</div>
            ) : (
              <div>No more startups to load</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
