import type { Database } from "@/database.types";
import supabase from "@/utils/supabase"

type StartupInsert = Database['public']['Tables']['startups']['Insert'];

export async function getAllStartupsById(id:string) {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('user_id',id)
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


