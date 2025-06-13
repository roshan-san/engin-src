import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/authentication/store/authStore'
import { sendConnectionRequest } from '@/api/connection'

export function useSendRequest() {
  const { data: user } = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (profileId: string) => {
      if (!user?.id) throw new Error('User not logged in')
      return sendConnectionRequest(user.id, profileId)
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

  return {
    sendRequest: mutation.mutate,
    isSending: mutation.isPending,
    error: mutation.error
  }
}
