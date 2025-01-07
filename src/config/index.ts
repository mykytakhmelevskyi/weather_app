interface Config {
  WEATHER_API: {
    KEY: string;
    BASE_URL: string;
    GEO_URL: string;
    UNITS: 'metric' | 'imperial';
  };
  CACHE: {
    EXPIRATION_TIME: number; // in milliseconds
    MAX_RECENT_CITIES: number;
  };
  DEFAULT_CITIES: string[];
}

export const config: Config = {
  WEATHER_API: {
    KEY: process.env.OPENWEATHERMAP_API_KEY || '',
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'https://api.openweathermap.org/geo/1.0/direct',
    UNITS: 'metric',
  },
  CACHE: {
    EXPIRATION_TIME: 3600000, // 1 hour
    MAX_RECENT_CITIES: 3,
  },
  DEFAULT_CITIES: process.env.DEFAULT_CITIES?.split(',') || ['London', 'New York', 'Tokyo'],
};

// Validation to ensure required environment variables are set
if (!config.WEATHER_API.KEY) {
  throw new Error('OPENWEATHERMAP_API_KEY is required');
} 