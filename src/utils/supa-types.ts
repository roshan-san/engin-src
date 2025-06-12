import type { Database } from '@/database.types'
export type Startup = Database['public']['Tables']['startups']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Connection = Database['public']['Tables']['connections']['Row']
