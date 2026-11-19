import { localize } from '../localize/localize';

export const WEATHER_ICON_MAP: Record<string, string> = {
  'clear-night': 'mdi:weather-night',
  cloudy: 'mdi:weather-cloudy',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  partlycloudy: 'mdi:weather-partly-cloudy',
  pouring: 'mdi:weather-pouring',
  rainy: 'mdi:weather-rainy',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  sunny: 'mdi:weather-sunny',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
  exceptional: 'mdi:weather-alert'
};

export function getWeatherIcon(condition?: string): string {
  if (!condition) return 'mdi:weather-cloudy';
  const clean = condition.toLowerCase().trim();
  return WEATHER_ICON_MAP[clean] || 'mdi:weather-cloudy';
}

export function getWeatherDescription(condition?: string, language = 'en'): string {
  if (!condition) return '';
  const key = condition.toLowerCase().trim().replace('-', '_');
  return localize(`weather.${key}`, language) || condition;
}
