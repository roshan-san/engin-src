import supabase from '@/utils/supabase'

export async function sendConnectionRequestApi(senderId: string, receiverId: string) {
  const { data, error } = await supabase
    .from('connections')
    .insert([{ sender_id: senderId, receiver_id: receiverId, status: 'pending' }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function acceptConnectionRequestApi(connectionId: string) {
  const { data, error } = await supabase
    .from('connections')
    .update({ status: 'accepted' })
    .eq('id', connectionId)
    .select()
    .single()

  if (error) throw error
  return data
}
export async function rejectConnectionRequestApi(connectionId: string) {
  const { data, error } = await supabase
    .from('connections')
    .delete()
    .eq('id', connectionId)
    .select()
    .single()

  if (error) throw error
  return data
}


export async function getPendingConnectionsApi(userId: string) {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .eq('receiver_id', userId)
    .eq('status', 'pending')

  if (error) throw error
  return data
}

export async function getAllConnectionsApi(userId: string) {
  const { data, error } = await supabase
    .from('connections')
    .select('*, sender:profiles!connections_sender_id_fkey(*), receiver:profiles!connections_receiver_id_fkey(*)')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .eq('status', 'accepted')

  if (error) throw error
  return data
} 