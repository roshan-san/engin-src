import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import { useUser } from '@/features/authentication/store/authStore';
import type { Database } from '@/database.types';

type Connection = Database['public']['Tables']['connections']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export function useConnectionRequest() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['connections', 'pending', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('connections')
        .select(`
          *,
          sender:profiles!connections_sender_id_profiles_id_fk(*)
        `)
        .eq('receiver_id', user.id)
        .eq('status', 'pending');

      if (error) throw error;
      return data as (Connection & { sender: Profile })[];
    },
    enabled: !!user?.id,
  });

  const acceptMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections', 'pending', user?.id] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'rejected' })
        .eq('id', connectionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections', 'pending', user?.id] });
    },
  });

  return {
    data,
    isLoading,
    acceptConnection: acceptMutation.mutate,
    rejectConnection: rejectMutation.mutate,
    isAccepting: acceptMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
}
