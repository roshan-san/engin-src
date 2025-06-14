import { createProfileApi, getProfileById } from "@/api/profile"
import { getUserApi } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ProfileInsert } from "@/types/supa-types";

export const useProfileById = (profileId: string) => {
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => getProfileById(profileId),
    enabled: !!profileId,
  })
}
export function useMyProfile(){
    return useQuery({
        queryKey:["profile"],
        queryFn:async()=>{
            const user = await getUserApi()
            if (!user) {
                return null;
            }
            return getProfileById(user.id);
        },
        staleTime:Infinity
    })
}
export function createProfileMutation() {
  return useMutation({
    mutationFn: (createProfileData: ProfileInsert) => createProfileApi(createProfileData),
    onSuccess: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}


