import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
  confirmed: boolean;
};

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '');
};

// Subscribe function with error handling
export const subscribeEmail = async (email: string, source: string = 'website') => {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - running in demo mode');
      return {
        success: true,
        message: '🎉 Demo mode - email captured! (Add Supabase credentials to save)',
        isDemoMode: true,
      };
    }

    // Insert subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email, source }])
      .select()
      .single();

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return {
          success: false,
          message: 'You are already on the list!',
          error: 'duplicate',
        };
      }

      // Handle other errors
      console.error('Supabase error:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
        error: error.message,
      };
    }

    return {
      success: true,
      message: '🎉 You are on the list! Check your email soon.',
      data,
    };
  } catch (error) {
    console.error('Subscribe error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
