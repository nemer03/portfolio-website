import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Project {
  id: number;
  title_ar: string;
  title_en: string;
  category: 'apps' | 'websites' | 'other';
  image_url: string;
  description_ar: string;
  description_en: string;
  technologies: string[];
  purpose_ar: string;
  purpose_en: string;
  goals_ar: string[];
  goals_en: string[];
  github_url?: string;
  live_url?: string;
  video_url?: string;
  screenshots: string[];
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  name_ar: string;
  name_en: string;
  provider: string;
  date: string;
  image_url: string;
  description_ar: string;
  description_en: string;
  skills: string[];
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: number;
  name_ar: string;
  name_en: string;
  type_ar: string;
  type_en: string;
  position_ar: string;
  position_en: string;
  date: string;
  image_url?: string;
  description_ar: string;
  description_en: string;
  experience_ar: string;
  experience_en: string;
  skills: string[];
  gallery: string[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  profile_image_url: string;
  email: string;
  phone: string;
  linkedin_url: string;
  github_url: string;
  location_ar: string;
  location_en: string;
  updated_at: string;
}