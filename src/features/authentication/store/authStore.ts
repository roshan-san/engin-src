import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from '@/utils/supabase'

// Query key for the current user
export const userQueryKey = ['user'] as const

// Hook to get the current user
export function useUser() {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    }
  })
}

// Hook for GitHub sign in
export function useSignInWithGithub() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${import.meta.env.VITE_APP_URL}/register`
        }
      })
      if (error) throw error
    },
    onError: (error: Error) => {
      console.error('GitHub sign in error:', error.message)
    }
  })
}

// Hook for Google sign in
export function useSignInWithGoogle() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${import.meta.env.VITE_APP_URL}/register`
        }
      })
      if (error) throw error
    },
    onError: (error: Error) => {
      console.error('Google sign in error:', error.message)
    }
  })
}

// Hook for sign out
export function useSignOut() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.setQueryData(userQueryKey, null)
    },
    onError: (error: Error) => {
      console.error('Sign out error:', error.message)
    }
  })
} 