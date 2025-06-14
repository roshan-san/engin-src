import { getProfileById } from "@/api/profile"
import { getUserApi } from "@/api/auth";
import { useQuery } from "@tanstack/react-query"

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
