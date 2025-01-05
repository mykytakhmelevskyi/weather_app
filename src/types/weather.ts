export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
  sys?: {
    country: string;
  };
}

export interface CityCache {
  name: string;
  temp: number;
  icon: string;
  lastUpdated: number;
}

export interface CityGeoResponse {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherError {
  message: string;
  code?: number;
}
