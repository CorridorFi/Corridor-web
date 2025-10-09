/**
 * Grid SDK Client Service
 * Singleton instance for Grid API interactions
 */

import { GridClient } from '@sqds/grid';
import { config } from './config';

// Custom error class for Grid-specific errors
export class GridError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'GridError';
  }
}

export const gridClient = new GridClient({
  environment: 'production',
  apiKey: process.env.GRID_API_KEY!,
  baseUrl: config.grid.baseUrl,
});

console.log('[Grid] Client initialized in production mode');
