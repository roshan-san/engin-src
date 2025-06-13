import supabase from "@/utils/supabase"
export async function getConnectionsApi(userId: string) {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .eq('sender_id', userId)
    .or('receiver_id.eq.' + userId)

  if (error) {
    throw new Error(`Error fetching connections: ${error.message}`)
  }
  console.log(data)
  return data
}

export async function sendConnectionRequestApi(senderId: string, receiverId: string) {
  const { data, error } = await supabase
    .from('connections')
    .insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        status: 'pending'
      }
    ])
    .select()

  if (error) {
    throw new Error(`Error sending connection request: ${error.message}`)
  }

  return data
}

export async function acceptConnectionRequestApi(connectionId: string) {
  const { data, error } = await supabase
    .from('connections')
    .update({ status: 'accepted' })
    .eq('id', connectionId)
    .select()

  if (error) {
    throw new Error(`Error accepting connection request: ${error.message}`)
  }

  return data
}

export async function getPendingConnectionsApi(userId: string) {
  const { data, error } = await supabase
    .from('connections')
    .select('*, profiles!receiver_id(*)')
    .eq('receiver_id', userId)
    .eq('status', 'pending')

  if (error) {
    throw new Error(`Error fetching pending connections: ${error.message}`)
  }

  return data
}

export async function removeConnectionApi(connectionId: string) {
  const { error } = await supabase
    .from('connections')
    .delete()
    .eq('id', connectionId)

  if (error) {
    throw new Error(`Error removing connection: ${error.message}`)
  }
}
