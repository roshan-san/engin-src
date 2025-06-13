import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { signInApi, signOutApi, getUserApi } from '@/api/auth'
export function useAuth() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    staleTime: Infinity
  })
}

export function signInMutation(provider: 'github' | 'google') {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: () => signInApi(provider),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user','profile'] })
    },
    onError: (error) => {
      console.error('Sign in failed:', error)
    }
  })
}

export function signOutMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Sign out failed:', error)
    }
  })
}

