import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGeolocation } from '../../hooks/useGeolocation';

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get location successfully', async () => {
    const mockPosition = {
      coords: {
        latitude: 51.5074,
        longitude: -0.1278
      }
    };

    // Mock geolocation API
    const mockGeolocation = {
      getCurrentPosition: vi.fn()
        .mockImplementation(success => success(mockPosition))
    };
    
    vi.stubGlobal('navigator', {
      geolocation: mockGeolocation
    });

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      await result.current.getLocation();
    });

    expect(result.current.coords).toEqual(mockPosition.coords);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle geolocation errors', async () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn()
        .mockImplementation((_, error) => 
          error(new Error('Geolocation permission denied'))
        )
    };

    vi.stubGlobal('navigator', {
      geolocation: mockGeolocation
    });

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      await result.current.getLocation();
    });

    expect(result.current.coords).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
}); 