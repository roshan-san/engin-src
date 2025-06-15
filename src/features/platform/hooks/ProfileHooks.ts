import { createProfileApi, getProfileByIdApi } from "@/api/profile"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ProfileInsert } from "@/types/supa-types";
import { useAuth } from "@/features/authentication/contexts/useAuth";

export const useProfileById = (profileId: string) => {
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => getProfileByIdApi(profileId),
  })
}

export function createProfileMutation() {
  const { data: user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createProfileData: ProfileInsert) => {
      if (!user) throw new Error('User not logged in');
      
      return createProfileApi({
        ...createProfileData,
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || '',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}


