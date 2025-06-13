import type { Profile, ProfileInsert } from "@/types/supa-types"
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
export async function updatePfp(file: File,id:string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${id}-${Math.random()}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`Error uploading avatar: ${uploadError.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  await updateProfile(id, { avatar_url: publicUrl })

  return publicUrl
} 

export async function createProfile(profileData: ProfileInsert) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single()

  if (error) {
    throw new Error(`Error creating profile: ${error.message}`)
  }
  return data
}
