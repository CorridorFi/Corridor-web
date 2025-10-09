/**
 * Application Configuration
 * Centralized configuration management for environment variables
 */

export const config = {
  // Grid API Configuration
  grid: {
    apiKey: process.env.GRID_API_KEY || '',
    environment: (process.env.GRID_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production',
    baseUrl: process.env.GRID_BASE_URL || 'https://grid.squads.xyz',
  },
  
  // Application Configuration
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
} as const;

/**
 * Validates that all required environment variables are set
 * @throws Error if required variables are missing
 */
export function validateConfig() {
  const errors: string[] = [];

  if (!config.grid.apiKey) {
    errors.push('GRID_API_KEY is not set');
  }

  if (errors.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${errors.map(e => `  - ${e}`).join('\n')}`
    );
  }
}

