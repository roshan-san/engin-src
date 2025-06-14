import type { StartupInsert } from "@/types/supa-types"
import supabase from "@/utils/supabase"

export async function getAllStartupsByIdApi(id:string) {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq("founder_id",id)
  if (error) {
    throw new Error(`Error fetching startups: ${error.message}`)
  }
  return data
}

export async function createStartupApi(data: StartupInsert) {
  const { data: startup, error } = await supabase
    .from('startups')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating startup: ${error.message}`);
  }

  return startup;
}

export async function getMyStartupsApi() {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('User not authenticated')
  }
  return getAllStartupsByIdApi(user.id)
}


