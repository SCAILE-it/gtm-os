import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client (with fallback values to prevent build errors)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Table names are now used directly in queries to match your actual Supabase schema:
// - ga4_acquisition_daily
// - ga4_events_daily  
// - ga4_landing_page_daily
// - gsc_page_daily
// - gsc_sitemaps

// Helper function to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const realUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const realKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(realUrl && realKey && realUrl !== '' && realKey !== '' && 
           !realUrl.includes('placeholder') && !realKey.includes('placeholder'));
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'Database connection error';
}
