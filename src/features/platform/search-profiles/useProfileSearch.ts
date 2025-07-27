import { useState, useCallback, useEffect } from "react";
import { useQuery } from "convex/react";
import { useInView } from "react-intersection-observer";
import { api } from "@/../convex/_generated/api";

export const useProfileSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cursor, setCursor] = useState<string | null>(null);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const profiles = useQuery(
    api.profile.profileSearch.getProfiles,
    { 
      searchQuery,
      paginationOpts: {
        numItems: 9,
        cursor: cursor
      }
    }
  );

  // Update all profiles when new data comes in
  useEffect(() => {
    if (profiles?.page && !isLoadingMore) {
      if (cursor === null) {
        // First page
        setAllProfiles(profiles.page);
      } else {
        // Subsequent pages
        setAllProfiles(prev => [...prev, ...profiles.page]);
      }
    }
  }, [profiles?.page, cursor, isLoadingMore]);

  const loadMore = useCallback(async () => {
    if (profiles?.continueCursor && !isLoadingMore) {
      setIsLoadingMore(true);
      setCursor(profiles.continueCursor);
      // The query will automatically refetch with the new cursor
      setTimeout(() => setIsLoadingMore(false), 500); // Small delay to prevent rapid calls
    }
  }, [profiles?.continueCursor, isLoadingMore]);

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
    onChange: (inView) => {
      if (inView && profiles?.continueCursor && !profiles.isDone && !isLoadingMore) {
        loadMore();
      }
    },
  });

  const resetSearch = useCallback(() => {
    setCursor(null);
    setAllProfiles([]);
    setIsLoadingMore(false);
  }, []);

  // Reset when search query changes
  useEffect(() => {
    if (searchQuery !== "" && cursor !== null) {
      setCursor(null);
      setAllProfiles([]);
    }
  }, [searchQuery, cursor]);

  return {
    searchQuery,
    setSearchQuery,
    profiles: allProfiles,
    status: profiles?.isDone ? "Exhausted" : profiles?.continueCursor ? "CanLoadMore" : "LoadingFirstPage",
    loadMore,
    isLoading: !profiles,
    isLoadingMore,
    ref,
    resetSearch,
  };
};
