import { useState } from 'react';

interface GeolocationState {
  coords: GeolocationCoordinates | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
    loading: true,
  });

  const getLocation = async (): Promise<GeolocationCoordinates | null> => {
    if (!('geolocation' in navigator)) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported', loading: false }));
      return null;
    }

    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 5000);
      });

      // Create geolocation promise
      const geolocationPromise = new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false
        });
      });

      // Race between timeout and geolocation
      const position = await Promise.race([geolocationPromise, timeoutPromise]);

      setState({
        coords: position.coords,
        error: null,
        loading: false,
      });

      return position.coords;
    } catch (error) {
      setState({
        coords: null,
        error: null,
        loading: false,
      });
      return null;
    }
  };

  return { ...state, getLocation };
}; 