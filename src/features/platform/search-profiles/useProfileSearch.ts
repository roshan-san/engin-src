import { useState } from "react";
import { useQuery } from "convex/react";
import { useInView } from "react-intersection-observer";
import { api } from "@/../convex/_generated/api";

export const useProfileSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const profiles = useQuery(
    api.profile.profileSearch.getProfiles,
    { 
      searchQuery,
      paginationOpts: {
        numItems: 9,
        cursor: null
      }
    }
  );

  const { ref } = useInView({
    threshold: 0.5,
    onChange: () => {
      // Handle infinite scroll if needed
    },
  });

  return {
    searchQuery,
    setSearchQuery,
    profiles: profiles?.page || [],
    status: profiles?.isDone ? "Exhausted" : "CanLoadMore",
    loadMore: () => {}, // Implement if needed
    isLoading: false,
    ref,
  };
};
