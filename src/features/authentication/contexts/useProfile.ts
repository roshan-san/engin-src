import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { getProfileByIdApi } from '@/api/profile'

export function useProfile() {
  const { data: user } = useAuth()

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfileByIdApi(user!.id),
    enabled: !!user?.id,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
