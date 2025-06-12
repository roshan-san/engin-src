import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from '@/utils/supabase'
import { redirect } from '@tanstack/react-router'

const userQueryKey = ['user']

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

export function useProfile() {
  const { data: user } = useUser()
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID')
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!user
  })
}

// Hook for GitHub sign in
export function useSignInWithGithub() {  
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
      queryClient.clear()
      redirect({ to: "/" })
    },
    onError: (error: Error) => {
      console.error('Sign out error:', error.message)
    }
  })
} 