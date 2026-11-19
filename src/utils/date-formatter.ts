import { localize } from '../localize/localize';

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const DAY_LONG_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_LONG_KEYS = [
  'january', 'february', 'march', 'april', 'may_long', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

export function formatDate(date: Date, style: 'short' | 'long' | 'combined', language = 'en'): string {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const dayShort = localize(`days.${DAY_KEYS[dayOfWeek]}`, language);
  const dayLong = localize(`days.${DAY_LONG_KEYS[dayOfWeek]}`, language);
  const monthShort = localize(`months.${MONTH_KEYS[monthIndex]}`, language);
  const monthLong = localize(`months.${MONTH_LONG_KEYS[monthIndex]}`, language);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (style === 'short') {
    if (language.startsWith('zh')) {
      return `${year}/${pad(monthIndex + 1)}/${pad(dayOfMonth)}`;
    }
    return `${pad(dayOfMonth)}/${pad(monthIndex + 1)}/${year}`;
  }

  if (style === 'long') {
    if (language.startsWith('zh')) {
      return `${year}年${monthIndex + 1}月${dayOfMonth}日 ${dayLong}`;
    }
    if (language === 'de') {
      return `${dayLong}, ${dayOfMonth}. ${monthLong}`;
    }
    if (language === 'es' || language === 'it' || language === 'pt') {
      return `${dayLong}, ${dayOfMonth} de ${monthLong}`;
    }
    if (language === 'fr') {
      return `${dayLong} ${dayOfMonth} ${monthLong}`;
    }
    if (language === 'ru') {
      return `${dayLong}, ${dayOfMonth} ${monthLong}`;
    }
    return `${dayLong}, ${monthLong} ${dayOfMonth}`;
  }

  // combined
  const shortDate = `${pad(dayOfMonth)}/${pad(monthIndex + 1)}`;
  return `${dayShort}, ${shortDate}`;
}

export function formatTime(date: Date, format: '24h' | '12h' = '24h', timezone?: string): { time: string; ampm?: string } {
  let targetDate = date;
  if (timezone) {
    try {
      const invDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
      targetDate = invDate;
    } catch {
      // Keep local date if invalid timezone
    }
  }

  let hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (format === '12h') {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return {
      time: `${hours}:${pad(minutes)}`,
      ampm
    };
  }

  return {
    time: `${pad(hours)}:${pad(minutes)}`
  };
}
