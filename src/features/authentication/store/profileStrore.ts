import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "@/api/profile";
import { getUserApi } from "@/api/auth";

export function useProfile(){
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