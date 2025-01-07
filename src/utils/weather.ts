type IconSize = '2x' | '4x';

export const getWeatherIconUrl = (iconCode: string, size: IconSize = '2x'): string => 
  `https://openweathermap.org/img/wn/${iconCode}@${size}.png`; 