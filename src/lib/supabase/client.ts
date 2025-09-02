import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client (with fallback values to prevent build errors)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names (matching your schema)
export const TABLES = {
  GSC_METRICS: 'gsc_metrics',
  DATA_SOURCES: 'data_sources', 
  GSC_SITES: 'gsc_sites',
  AUDIT_LOGS: 'audit_logs',
  CREDENTIALS_STORE: 'credentials_store',
  ORGANIZATION_CONFIGURATIONS: 'organization_configurations',
  ORGANIZATION_INVITATIONS: 'organization_invitations',
  ORGANIZATION_MEMBERS: 'organization_members',
  ORGANIZATIONS: 'organizations',
  USER_PROFILES: 'user_profiles'
} as const;

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
