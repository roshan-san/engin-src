import type { Profile } from "@/utils/supa-types"
import supabase from "@/utils/supabase"

export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`)
  }
  return data
}

export async function getProfileByUsername(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`)
  }
  return data
}

export async function updateProfile(id: string, updatedData: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updatedData)
    .eq('id', id)

  if (error) {
    throw new Error(`Error updating user: ${error.message}`)
  }
  return data
}

