import { createStartupApi, getMyStartupsApi, } from "@/api/startups";
import type { StartupInsert } from "@/types/supa-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function createStartupMutation() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["create-startup"],
        mutationFn: (startupCreationData: StartupInsert) => createStartupApi(startupCreationData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["my-startups"] });
            navigate({
                to: "/startups/$startupid",
                params: { startupid: data.id }
            });
        },
        onError: (error) => {
            console.error('Error creating startup:', error);
        }
    });
}

export function useMyStartups() {
    return useQuery({
        queryKey: ["my-startups"],
        queryFn: getMyStartupsApi
    })
}
