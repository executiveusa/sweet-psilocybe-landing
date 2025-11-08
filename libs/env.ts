import { z } from 'zod';

// Define environment variable schema
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('http://localhost:3000'),
  
  // Supabase Configuration (optional for demo mode)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  
  // Analytics (optional)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
});

// Parse and validate environment variables
function validateEnv() {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    });

    // Validate Supabase configuration consistency
    if (env.NEXT_PUBLIC_SUPABASE_URL && !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL is set but NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Supabase will run in demo mode.');
    }
    
    if (!env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY is set but NEXT_PUBLIC_SUPABASE_URL is missing. Supabase will run in demo mode.');
    }

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Environment validation failed');
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
