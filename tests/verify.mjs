import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- RUNNING SIMPLE-EINK-COLLECTION-CARDS VERIFICATION ---');

// 1. Verify 8 required language files
const languages = ['en', 'es', 'zh_Hans', 'de', 'it', 'fr', 'pt', 'ru'];
const langDir = path.join(rootDir, 'src', 'localize', 'languages');

const loadedLangs = {};
for (const lang of languages) {
  const filePath = path.join(langDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`✗ Missing translation file: ${filePath}`);
    process.exit(1);
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  loadedLangs[lang] = content;
  console.log(`✓ Language '${lang}' loaded successfully (${Object.keys(content).length} top sections).`);
}

// 2. Verify all 8 languages have common, hero_metric, grid_metrics, status_list, alert_banner, sparkline_bar, schedule_agenda, time, forecast, weather, days, months
const requiredSections = [
  'common',
  'conditions',
  'hero_metric',
  'grid_metrics',
  'status_list',
  'alert_banner',
  'sparkline_bar',
  'schedule_agenda',
  'time',
  'forecast',
  'weather',
  'days',
  'months'
];

for (const lang of languages) {
  for (const sec of requiredSections) {
    if (!loadedLangs[lang][sec]) {
      console.error(`✗ Language '${lang}' missing required section: '${sec}'`);
      process.exit(1);
    }
  }
}
console.log(`✓ All 8 languages contain all ${requiredSections.length} required sections.`);

// 3. Verify all 8 card files exist
const requiredCards = [
  'hero-metric-card.ts',
  'grid-metrics-card.ts',
  'status-list-card.ts',
  'alert-banner-card.ts',
  'sparkline-bar-card.ts',
  'schedule-agenda-card.ts',
  'time-card.ts',
  'forecast-card.ts'
];

for (const cardFile of requiredCards) {
  const cardPath = path.join(rootDir, 'src', 'cards', cardFile);
  if (!fs.existsSync(cardPath)) {
    console.error(`✗ Missing card file: ${cardPath}`);
    process.exit(1);
  }
}
console.log(`✓ All 8 card source files exist.`);

// 4. Verify all 8 editor files exist
const requiredEditors = [
  'hero-metric-editor.ts',
  'grid-metrics-editor.ts',
  'status-list-editor.ts',
  'alert-banner-editor.ts',
  'sparkline-bar-editor.ts',
  'schedule-agenda-editor.ts',
  'time-editor.ts',
  'forecast-editor.ts'
];

for (const edFile of requiredEditors) {
  const edPath = path.join(rootDir, 'src', 'editors', edFile);
  if (!fs.existsSync(edPath)) {
    console.error(`✗ Missing editor file: ${edPath}`);
    process.exit(1);
  }
}
console.log(`✓ All 8 visual editor source files exist.`);

// 5. Verify bundle file if built
const bundlePath = path.join(rootDir, 'dist', 'simple-eink-collection-cards.js');
if (fs.existsSync(bundlePath)) {
  const bundleContent = fs.readFileSync(bundlePath, 'utf8');
  const cardTags = [
    'eink-hero-metric',
    'eink-grid-metrics',
    'eink-status-list',
    'eink-alert-banner',
    'eink-sparkline-bar',
    'eink-schedule-agenda',
    'eink-time',
    'eink-forecast'
  ];
  for (const tag of cardTags) {
    if (!bundleContent.includes(tag)) {
      console.error(`✗ Compiled bundle missing registration for tag: '${tag}'`);
      process.exit(1);
    }
  }
  console.log(`✓ Compiled bundle contains registrations for all 8 card tags.`);
} else {
  console.log(`(Bundle not yet built - run npm run build to verify bundle content)`);
}

console.log('✓ All verification checks passed!');
