import { createProfileApi, getProfileByIdApi } from "@/api/profile"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ProfileInsert } from "@/types/supa-types";
import { useAuth } from "@/features/authentication/store/authStore";

export const useProfileById = (profileId: string) => {
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => getProfileByIdApi(profileId),
    enabled: !!profileId,
  })
}
export function useMyProfile() {
    const { data: user } = useAuth();
    
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => {
            if (!user) {
                return null;
            }
            return getProfileByIdApi(user.id);
        },
        enabled: !!user,
        staleTime: Infinity
    });
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


