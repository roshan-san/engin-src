import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/authentication/contexts/useAuth'
import { 
  sendConnectionRequestApi, 
  acceptConnectionRequestApi, 
  getPendingConnectionsApi, 
  rejectConnectionRequestApi,
  getAcceptedConnectionsApi,
} from '@/api/connections'

// Hooks
export function sendConnectionMutation() {
  const { data: user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (receiverId: string) => {
      if (!user?.id) throw new Error('User not logged in')
      return sendConnectionRequestApi(user.id, receiverId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['connections', 'pending'] })
    },
    onError: (error) => {
      console.error('Failed to send connection request:', error)
    }
  })
}

export function acceptConnectionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: acceptConnectionRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['connections', 'pending'] })
    },
    onError: (error) => {
      console.error('Failed to accept connection:', error)
    }
  })
}

export function rejectConnectionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (connectionId: string) => rejectConnectionRequestApi(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['connections', 'pending'] })
    },
    onError: (error) => {
      console.error('Failed to reject connection:', error)
    }
  })
}

export function usePendingConnections() {
  const { data: user } = useAuth()

  return useQuery({
    queryKey: ['connections', 'pending', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User not logged in')
      return getPendingConnectionsApi(user.id)
    },
    enabled: !!user?.id
  })
}

export function useAcceptedConnections(userId: string) {
  return useQuery({
    queryKey: ['connections', 'accepted', userId],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required')
      return getAcceptedConnectionsApi(userId)
    },
    enabled: !!userId
  })
}
