import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import type { Startup } from '@/utils/supa-types';
import type { StartupCreationFormValues } from '../validations/startup';
import { useUser } from '@/features/authentication/store/authStore';

// Query to get startups by user ID
export function useMyStartups() {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ['my-startups', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User ID is required');
      
      const { data, error } = await supabase
        .from('startups')
        .select('*')
        .eq('founder_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Startup[];
    },
    enabled: !!user?.id,
  });
}

// Query to get startup profile with founder details
export function useStartupProfile(startupId: string) {
  return useQuery({
    queryKey: ['startup-profile', startupId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startups')
        .select(`
          *,
          founder:profiles!founder_id(*)
        `)
        .eq('id', startupId)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

// Mutation to create a new startup
export function useCreateStartup() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async (startupData: StartupCreationFormValues) => {
      if (!user?.id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('startups')
        .insert({
          name: startupData.name,
          description: startupData.description,
          location: startupData.location,
          problem: startupData.problem,
          solution: startupData.solution,
          team_size: startupData.teamSize,
          funding: startupData.funding,
          founder_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data as Startup;
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['my-startups'] });
    },
  });
}
