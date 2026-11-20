import { localize } from '../localize/localize';

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const DAY_LONG_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_LONG_KEYS = [
  'january', 'february', 'march', 'april', 'may_long', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
};

interface DateParts {
  year: number;
  monthIndex: number;
  dayOfMonth: number;
  dayOfWeek: number;
  hours: number;
  minutes: number;
}

function getDateParts(date: Date, timezone?: string): DateParts {
  if (timezone) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23'
      }).formatToParts(date);

      const map: Record<string, string> = {};
      for (const p of parts) {
        map[p.type] = p.value;
      }

      const year = Number(map.year);
      const month = Number(map.month);
      const day = Number(map.day);
      const rawHour = Number(map.hour);
      const minute = Number(map.minute);
      const dayOfWeek = WEEKDAY_MAP[map.weekday];

      if (
        !isNaN(year) &&
        !isNaN(month) &&
        !isNaN(day) &&
        !isNaN(rawHour) &&
        !isNaN(minute) &&
        dayOfWeek !== undefined
      ) {
        return {
          year,
          monthIndex: month - 1,
          dayOfMonth: day,
          dayOfWeek,
          hours: rawHour % 24,
          minutes: minute
        };
      }
    } catch {
      // Keep local date if invalid timezone
    }
  }

  return {
    year: date.getFullYear(),
    monthIndex: date.getMonth(),
    dayOfMonth: date.getDate(),
    dayOfWeek: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes()
  };
}

export function formatDate(
  date: Date,
  style: 'short' | 'long' | 'combined',
  language = 'en',
  timezone?: string
): string {
  const { year, monthIndex, dayOfMonth, dayOfWeek } = getDateParts(date, timezone);
  const baseLang = (language || 'en').replace('_', '-').split('-')[0].toLowerCase();

  const dayShort = localize(`days.${DAY_KEYS[dayOfWeek]}`, language);
  const dayLong = localize(`days.${DAY_LONG_KEYS[dayOfWeek]}`, language);
  const monthLong = localize(`months.${MONTH_LONG_KEYS[monthIndex]}`, language);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (style === 'short') {
    if (baseLang === 'zh') {
      return `${year}/${pad(monthIndex + 1)}/${pad(dayOfMonth)}`;
    }
    return `${pad(dayOfMonth)}/${pad(monthIndex + 1)}/${year}`;
  }

  if (style === 'long') {
    if (baseLang === 'zh') {
      return `${year}年${monthIndex + 1}月${dayOfMonth}日 ${dayLong}`;
    }
    if (baseLang === 'de') {
      return `${dayLong}, ${dayOfMonth}. ${monthLong}`;
    }
    if (baseLang === 'es' || baseLang === 'it' || baseLang === 'pt') {
      return `${dayLong}, ${dayOfMonth} de ${monthLong}`;
    }
    if (baseLang === 'fr' || baseLang === 'nl') {
      return `${dayLong} ${dayOfMonth} ${monthLong}`;
    }
    if (baseLang === 'ru' || baseLang === 'pl') {
      return `${dayLong}, ${dayOfMonth} ${monthLong}`;
    }
    return `${dayLong}, ${monthLong} ${dayOfMonth}`;
  }

  // combined
  const shortDate = `${pad(dayOfMonth)}/${pad(monthIndex + 1)}`;
  return `${dayShort}, ${shortDate}`;
}

export function formatTime(date: Date, format: '24h' | '12h' = '24h', timezone?: string): { time: string; ampm?: string } {
  const { hours: rawHours, minutes } = getDateParts(date, timezone);
  let hours = rawHours;
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
