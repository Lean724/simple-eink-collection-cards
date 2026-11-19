import './cards/hero-metric-card';
import './cards/grid-metrics-card';
import './cards/status-list-card';
import './cards/alert-banner-card';
import './cards/sparkline-bar-card';
import './cards/schedule-agenda-card';
import './cards/time-card';
import './cards/forecast-card';

// Register all cards in the Lovelace card catalog
const customCards = ((window as any).customCards = (window as any).customCards || []);

const einkCards = [
  {
    type: 'eink-hero-metric',
    name: 'E-ink Hero Metric',
    description: 'High-contrast large single metric with optional trend indicator for E-ink screens.'
  },
  {
    type: 'eink-grid-metrics',
    name: 'E-ink Grid Metrics',
    description: 'Strict solid-divider grid displaying 2 to 4 related sensor metrics.'
  },
  {
    type: 'eink-status-list',
    name: 'E-ink Status List',
    description: 'Clean list of discrete or binary states with inverted solid badges for active items.'
  },
  {
    type: 'eink-alert-banner',
    name: 'E-ink Alert Banner',
    description: 'Conditional high-contrast alert block that remains 0px when condition is clear.'
  },
  {
    type: 'eink-sparkline-bar',
    name: 'E-ink Sparkline Bar',
    description: 'Discrete 12/24h trend bars or solid line with crisp edges and zero antialiasing blur.'
  },
  {
    type: 'eink-schedule-agenda',
    name: 'E-ink Schedule Agenda',
    description: 'Chronological calendar agenda with bold times and 1px dividers.'
  },
  {
    type: 'eink-time',
    name: 'E-ink Clock & Date',
    description: 'Minute-synchronized digital clock with date formats and zero second ghosting.'
  },
  {
    type: 'eink-forecast',
    name: 'E-ink Weather Forecast',
    description: 'Weather status, temperature, extended multi-day forecast and extra metric slot.'
  }
];

for (const card of einkCards) {
  if (!customCards.some((c: any) => c.type === card.type)) {
    customCards.push(card);
  }
}

console.info(
  `%c SIMPLE-EINK-COLLECTION-CARDS %c v1.0.1 `,
  'color: #ffffff; background: #000000; font-weight: 700; border: 1px solid #ffffff;',
  'color: #000000; background: #ffffff; font-weight: 700; border: 1px solid #000000;'
);
