import { CityCache } from '../types/weather';
import { config } from '../config';

class CacheService {
  private readonly STORAGE_KEY = 'recentCities';

  save(cities: CityCache[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cities));
    } catch (error) {
      console.error('Failed to save cities to cache:', error);
    }
  }

  load(): CityCache[] {
    try {
      const cachedData = localStorage.getItem(this.STORAGE_KEY);
      if (!cachedData) return [];

      const cities: CityCache[] = JSON.parse(cachedData);
      return this.filterExpiredCities(cities);
    } catch (error) {
      console.error('Failed to load cities from cache:', error);
      return [];
    }
  }

  addCity(city: CityCache): CityCache[] {
    try {
      const cities = this.load();
      const filteredCities = cities.filter(c => c.name !== city.name);
      const updatedCities = [city, ...filteredCities]
        .slice(0, config.CACHE.MAX_RECENT_CITIES);
      
      this.save(updatedCities);
      return updatedCities;
    } catch (error) {
      console.error('Failed to add city to cache:', error);
      return [];
    }
  }

  private filterExpiredCities(cities: CityCache[]): CityCache[] {
    const now = Date.now();
    return cities.filter(
      city => now - city.lastUpdated < config.CACHE.EXPIRATION_TIME
    );
  }

  clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }
}

export const cacheService = new CacheService(); 