export interface Profile {
  id?: string;
  user_id?: string;
  username?: string;
  location?: string;
  skills?: string[];
  interests?: string[];
  github_url?: string;
  linkedin_url?: string;
  user_type?: 'Creator/Collaborator' | 'Mentor' | 'Investor';
  work_type?: 'Full-Time' | 'Part-Time' | 'Contract';
  created_at?: string;
  updated_at?: string;
} 