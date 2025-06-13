import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/authentication/store/authStore'
import { sendConnectionRequestApi } from '@/api/connection'

export function sendConnectionMutation() {
  const { data: user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (profileId: string) => {
      if (!user?.id) throw new Error('User not logged in')
      return sendConnectionRequestApi(user.id, profileId)
    },
    onSuccess: () => {
      // Invalidate relevant queries to update the UI
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['connections', 'pending'] })
    },
    onError: (error) => {
      console.error('Failed to send connection request:', error)
    }
  })
}