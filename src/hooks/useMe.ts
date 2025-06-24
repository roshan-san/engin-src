import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useMe = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const me = useQuery(
    api.profile.queries.getMyProfile,
    isAuthenticated ? undefined : "skip"
  );
  return me;
}; 