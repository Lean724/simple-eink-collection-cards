import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- RUNNING SIMPLE-EINK-COLLECTION-CARDS VERIFICATION ---');

// 1. Verify 10 required language files
const languages = ['en', 'es', 'zh_Hans', 'de', 'it', 'fr', 'pt', 'ru', 'pl', 'nl'];
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

// 2. Verify all 8 languages have all required sections and exact deep key parity with English
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

function collectKeyPaths(obj, prefix = '') {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      paths.push(...collectKeyPaths(value, fullKey));
    } else {
      paths.push(fullKey);
    }
  }
  return paths;
}

function getByPath(obj, dotPath) {
  return dotPath.split('.').reduce((acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined), obj);
}

const enKeyPaths = collectKeyPaths(loadedLangs.en);
assert(enKeyPaths.includes('schedule_agenda.all_day'), 'Missing schedule_agenda.all_day in en.json');

for (const lang of languages) {
  const langPaths = new Set(collectKeyPaths(loadedLangs[lang]));
  for (const keyPath of enKeyPaths) {
    if (!langPaths.has(keyPath)) {
      console.error(`✗ Language '${lang}' missing translation key: '${keyPath}'`);
      process.exit(1);
    }
    const val = getByPath(loadedLangs[lang], keyPath);
    if (typeof val !== 'string' || val.trim().length === 0) {
      console.error(`✗ Language '${lang}' has empty/non-string translation for '${keyPath}'`);
      process.exit(1);
    }
  }
  for (const extraPath of langPaths) {
    if (!enKeyPaths.includes(extraPath)) {
      console.error(`✗ Language '${lang}' has unexpected extra key not in en.json: '${extraPath}'`);
      process.exit(1);
    }
  }
}
console.log(`✓ All 10 languages contain all ${requiredSections.length} sections and match all ${enKeyPaths.length} translation keys.`);

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

// 5. Verify bundle files exist, match byte-for-byte, and contain expected API calls
const bundlePath = path.join(rootDir, 'dist', 'simple-eink-collection-cards.js');
const rootBundlePath = path.join(rootDir, 'simple-eink-collection-cards.js');

if (!fs.existsSync(bundlePath) || !fs.existsSync(rootBundlePath)) {
  console.error(`✗ Compiled bundle missing in dist/ or repository root. Run npm run build first.`);
  process.exit(1);
}

const distBytes = fs.readFileSync(bundlePath);
const rootBytes = fs.readFileSync(rootBundlePath);
assert(distBytes.equals(rootBytes), 'dist/simple-eink-collection-cards.js and root simple-eink-collection-cards.js differ');

const bundleContent = distBytes.toString('utf8');
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
  assert(bundleContent.includes(tag), `Compiled bundle missing registration for tag: '${tag}'`);
}
assert(bundleContent.includes('weather/subscribe_forecast'), 'Compiled bundle missing weather/subscribe_forecast');
assert(bundleContent.includes('subscribeMessage'), 'Compiled bundle missing subscribeMessage');
assert(!bundleContent.includes('calendar/get_events'), 'Compiled bundle must not call nonexistent calendar/get_events');
console.log(`✓ Compiled bundle matches root copy, registers all 8 cards, and uses valid Home Assistant APIs.`);

// 6. Behavioral tests using a minimal zero-dependency Node DOM shim
function setupDomShim() {
  const registry = new Map();
  globalThis.window = globalThis;
  globalThis.HTMLElement = class HTMLElement {
    constructor() {
      this.isConnected = false;
      this._attrs = new Map();
      this._listeners = new Map();
    }
    setAttribute(k, v) {
      this._attrs.set(k, v);
    }
    removeAttribute(k) {
      this._attrs.delete(k);
    }
    addEventListener(type, fn) {
      if (!this._listeners.has(type)) this._listeners.set(type, []);
      this._listeners.get(type).push(fn);
    }
    dispatchEvent(event) {
      const list = this._listeners.get(event.type) || [];
      for (const fn of list) fn(event);
      return true;
    }
    attachShadow() {
      return {
        adoptedStyleSheets: [],
        firstChild: null,
        appendChild() {},
        insertBefore(n) {
          return n;
        },
        querySelector() {
          return null;
        }
      };
    }
  };
  globalThis.Element = globalThis.HTMLElement;
  globalThis.Node = { ELEMENT_NODE: 1, TEXT_NODE: 3, COMMENT_NODE: 8 };
  globalThis.Document = class Document {};
  globalThis.CSSStyleSheet = class CSSStyleSheet {
    replaceSync() {}
  };
  globalThis.ShadowRoot = class ShadowRoot {};
  globalThis.document = Object.assign(new globalThis.Document(), {
    adoptedStyleSheets: [],
    createElement: tag => ({ tagName: tag, content: { cloneNode: () => ({}) }, appendChild() {} }),
    createComment: () => ({}),
    createTreeWalker: () => ({ nextNode: () => null }),
    importNode: n => n
  });
  globalThis.customElements = {
    define(name, ctor) {
      registry.set(name, ctor);
    },
    get(name) {
      return registry.get(name);
    }
  };
  return registry;
}

function flattenTemplate(value) {
  if (value === null || value === undefined || typeof value === 'boolean') return '';
  if (Array.isArray(value)) return value.map(flattenTemplate).join('');
  if (typeof value === 'object' && Array.isArray(value.strings) && Array.isArray(value.values)) {
    let out = value.strings[0];
    for (let i = 0; i < value.values.length; i++) {
      out += flattenTemplate(value.values[i]) + value.strings[i + 1];
    }
    return out;
  }
  return String(value);
}

function getReactiveElementProto(instance) {
  let proto = Object.getPrototypeOf(instance);
  while (proto && Object.getPrototypeOf(proto) !== globalThis.HTMLElement.prototype) {
    proto = Object.getPrototypeOf(proto);
  }
  return proto;
}

function mountTestCard(registry, tagName) {
  const Ctor = registry.get(tagName);
  assert(Ctor, `Custom element '${tagName}' was not registered`);
  const el = new Ctor();
  const reactiveProto = getReactiveElementProto(el);
  el._lastTemplate = null;
  el._rendered = '';
  el.update = function (changedProps) {
    this._lastTemplate = this.render();
    this._rendered = flattenTemplate(this._lastTemplate);
    reactiveProto.update.call(this, changedProps);
  };
  return el;
}

async function flushMicrotasks(ticks = 4) {
  for (let i = 0; i < ticks; i++) {
    await Promise.resolve();
  }
}

const registry = setupDomShim();
await import(pathToFileURL(bundlePath).href);

// Verify all 8 cards and 8 editors registered
const expectedTags = [
  ...cardTags,
  ...cardTags.map(tag => `${tag}-editor`)
];
for (const tag of expectedTags) {
  assert(registry.has(tag), `Missing customElements registration for '${tag}'`);
}
assert(Array.isArray(globalThis.window.customCards), 'window.customCards must be an array');
for (const tag of cardTags) {
  assert(
    globalThis.window.customCards.some(c => c.type === tag),
    `window.customCards missing card '${tag}'`
  );
}
console.log(`✓ All 8 cards and 8 editors register cleanly in customElements & window.customCards.`);

// 6A. Behavioral tests for eink-forecast
{
  const el = mountTestCard(registry, 'eink-forecast');
  const subscribeCalls = [];
  const unsubCalls = [];
  const callWSCalls = [];
  const callbacks = new Map();

  const connection = {
    async subscribeMessage(cb, msg) {
      subscribeCalls.push(msg);
      callbacks.set(msg.entity_id, cb);
      return () => {
        unsubCalls.push(msg.entity_id);
      };
    }
  };

  el.setConfig({ type: 'custom:eink-forecast', entity: 'weather.home', days_to_show: 4 });
  el.hass = {
    language: 'en',
    states: {
      'weather.home': { entity_id: 'weather.home', state: 'sunny', attributes: { temperature: 22 } },
      'weather.work': { entity_id: 'weather.work', state: 'cloudy', attributes: { temperature: 19 } }
    },
    connection,
    async callWS(msg) {
      callWSCalls.push(msg);
      return null;
    }
  };

  el.isConnected = true;
  el.connectedCallback();
  await el.updateComplete;
  await flushMicrotasks();

  assert.equal(callWSCalls.length, 0, 'eink-forecast must not call hass.callWS');
  assert.equal(subscribeCalls.length, 1, 'eink-forecast must open exactly 1 subscription on connect');
  assert.deepEqual(subscribeCalls[0], {
    type: 'weather/subscribe_forecast',
    forecast_type: 'daily',
    entity_id: 'weather.home'
  });

  // Deliver forecast event asynchronously
  callbacks.get('weather.home')({
    type: 'daily',
    forecast: [
      { datetime: '2026-11-20', condition: 'sunny', temperature: 24, templow: 16 },
      { datetime: '2026-11-21', condition: 'rainy', temperature: 18, templow: 11 }
    ]
  });
  await el.updateComplete;

  assert(el._rendered.includes('24°'), 'eink-forecast should render daily forecast high temperature');
  assert(el._rendered.includes('16°'), 'eink-forecast should render daily forecast low temperature');

  // Repeated hass updates must NOT open additional subscriptions
  el.hass = { ...el.hass, states: { ...el.hass.states } };
  await el.updateComplete;
  el.hass = { ...el.hass, states: { ...el.hass.states } };
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(subscribeCalls.length, 1, 'hass updates must not leak duplicate forecast subscriptions');

  // Changing entity must unsubscribe old entity and subscribe to new entity
  el.setConfig({ type: 'custom:eink-forecast', entity: 'weather.work', days_to_show: 4 });
  await el.updateComplete;
  await flushMicrotasks();
  assert.deepEqual(unsubCalls, ['weather.home'], 'Changing entity must unsubscribe previous entity');
  assert.equal(subscribeCalls.length, 2, 'Changing entity must subscribe to new entity');
  assert.equal(subscribeCalls[1].entity_id, 'weather.work');

  // Disconnecting must unsubscribe active entity
  el.isConnected = false;
  el.disconnectedCallback();
  assert.deepEqual(unsubCalls, ['weather.home', 'weather.work'], 'disconnectedCallback must unsubscribe active forecast');

  // Reconnecting must re-subscribe
  el.isConnected = true;
  el.connectedCallback();
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(subscribeCalls.length, 3, 'Reconnecting must re-subscribe to forecast');

  // Disconnect before async subscribeMessage resolves -> must immediately unsubscribe on resolve
  el.isConnected = false;
  el.disconnectedCallback();
  let resolvePendingUnsub;
  const raceUnsubCalls = [];
  el.hass = {
    ...el.hass,
    connection: {
      subscribeMessage() {
        return new Promise(resolve => {
          resolvePendingUnsub = () => resolve(() => raceUnsubCalls.push('unsub_after_disconnect'));
        });
      }
    }
  };
  el.isConnected = true;
  el.connectedCallback();
  await el.updateComplete;
  el.isConnected = false;
  el.disconnectedCallback();
  resolvePendingUnsub();
  await flushMicrotasks();
  assert.deepEqual(
    raceUnsubCalls,
    ['unsub_after_disconnect'],
    'Must unsubscribe immediately if disconnected before subscribeMessage resolves'
  );

  // Rejected subscribeMessage falls back to attributes.forecast and does not retry on hass updates
  const failingSubCalls = [];
  const elFallback = mountTestCard(registry, 'eink-forecast');
  elFallback.setConfig({ type: 'custom:eink-forecast', entity: 'weather.legacy', days_to_show: 4 });
  elFallback.hass = {
    language: 'en',
    states: {
      'weather.legacy': {
        entity_id: 'weather.legacy',
        state: 'cloudy',
        attributes: {
          temperature: 15,
          forecast: [{ datetime: '2026-11-20', condition: 'cloudy', temperature: 17, templow: 9 }]
        }
      }
    },
    connection: {
      async subscribeMessage(_cb, msg) {
        failingSubCalls.push(msg);
        throw new Error('Unsupported command');
      }
    }
  };
  elFallback.isConnected = true;
  elFallback.connectedCallback();
  await elFallback.updateComplete;
  await flushMicrotasks();
  await elFallback.updateComplete;

  assert.equal(failingSubCalls.length, 1);
  assert(elFallback._rendered.includes('17°'), 'Should fall back to attributes.forecast when subscribeMessage fails');
  elFallback.hass = { ...elFallback.hass, states: { ...elFallback.hass.states } };
  await elFallback.updateComplete;
  await flushMicrotasks();
  assert.equal(failingSubCalls.length, 1, 'Failed subscribeMessage must not retry on every hass update');

  // Unknown condition & imperial pressure_unit rendering
  const elUnits = mountTestCard(registry, 'eink-forecast');
  elUnits.setConfig({
    type: 'custom:eink-forecast',
    entity: 'weather.us',
    extra_attribute: 'pressure'
  });
  elUnits.hass = {
    language: 'en',
    states: {
      'weather.us': {
        entity_id: 'weather.us',
        state: 'tropical-storm',
        attributes: {
          temperature: 75,
          temperature_unit: '°F',
          pressure: 29.92,
          pressure_unit: 'inHg'
        }
      }
    }
  };
  elUnits.isConnected = true;
  elUnits.connectedCallback();
  await elUnits.updateComplete;
  assert(elUnits._rendered.includes('tropical-storm'), 'Unknown weather condition should fall back to condition string');
  assert(!elUnits._rendered.includes('weather.tropical_storm'), 'Unknown weather condition must not render raw localization key');
  assert(elUnits._rendered.includes('29.92 inHg'), 'Forecast card should respect entity pressure_unit attribute');
  elUnits.isConnected = false;
  elUnits.disconnectedCallback();

  console.log('✓ eink-forecast behavioral tests passed (subscribeMessage, cleanup, race guard, legacy fallback, units).');
}

// 6B. Behavioral tests for eink-schedule-agenda
{
  const el = mountTestCard(registry, 'eink-schedule-agenda');
  const callApiCalls = [];
  const callWSCalls = [];

  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const todayYmd = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const todayTimed = new Date(now);
  todayTimed.setHours(14, 30, 0, 0);

  const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
  const futureYmd = `${futureDate.getFullYear()}-${pad(futureDate.getMonth() + 1)}-${pad(futureDate.getDate())}`;
  const expectedFutureDateStr = `${pad(futureDate.getDate())}/${pad(futureDate.getMonth() + 1)}`;

  el.setConfig({ type: 'custom:eink-schedule-agenda', entity: 'calendar.family', max_items: 5 });
  el.hass = {
    language: 'en',
    states: {},
    async callWS(msg) {
      callWSCalls.push(msg);
      return {};
    },
    async callApi(method, apiPath) {
      callApiCalls.push({ method, apiPath });
      if (apiPath.startsWith('calendars/calendar.family')) {
        return [
          { start: { dateTime: todayTimed.toISOString() }, summary: 'Dentist Appointment', location: 'Clinic' },
          { start: { date: todayYmd }, summary: 'Recycling Day' },
          { start: { date: futureYmd }, summary: 'School Holiday' }
        ];
      }
      if (apiPath.startsWith('calendars/calendar.empty')) {
        return [];
      }
      if (apiPath.startsWith('calendars/calendar.error')) {
        throw new Error('500 Internal Server Error');
      }
      return [];
    }
  };

  el.isConnected = true;
  el.connectedCallback();
  await el.updateComplete;
  await flushMicrotasks();
  await el.updateComplete;

  assert.equal(callWSCalls.length, 0, 'eink-schedule-agenda must not call hass.callWS');
  assert.equal(callApiCalls.length, 1, 'eink-schedule-agenda must fetch calendar via hass.callApi');
  assert.equal(callApiCalls[0].method, 'GET');
  assert(
    callApiCalls[0].apiPath.startsWith('calendars/calendar.family?start=') &&
      callApiCalls[0].apiPath.includes('&end='),
    `Unexpected callApi path: ${callApiCalls[0].apiPath}`
  );
  assert(!el._rendered.includes('[object Object]'), 'Agenda must not render raw [object Object] dates');
  assert(el._rendered.includes('14:30'), 'Agenda should render timed event start HH:MM');
  assert(el._rendered.includes('Dentist Appointment'), 'Agenda should render timed event summary');
  assert(el._rendered.includes('All day'), 'Agenda should render localized All day for today date-only event');
  assert(el._rendered.includes('Recycling Day'), 'Agenda should render all-day event summary');
  assert(el._rendered.includes(expectedFutureDateStr), 'Agenda should render DD/MM for future all-day event');

  // Changing entity clears old events and fetches new entity
  el.setConfig({ type: 'custom:eink-schedule-agenda', entity: 'calendar.empty', max_items: 5 });
  await el.updateComplete;
  await flushMicrotasks();
  await el.updateComplete;

  assert.equal(callApiCalls.length, 2, 'Changing calendar entity must fetch new entity immediately');
  assert(!el._rendered.includes('Dentist Appointment'), 'Changing entity must clear old events');
  assert(el._rendered.includes('No upcoming events'), 'Empty calendar should show empty state');

  // Subsequent hass updates with empty events must NOT refetch within cache window
  el.hass = { ...el.hass, states: {} };
  await el.updateComplete;
  el.hass = { ...el.hass, states: {} };
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(callApiCalls.length, 2, 'Empty calendar response must still respect 5-minute cache');

  // Rejected callApi must NOT spam retries on every hass update
  el.setConfig({ type: 'custom:eink-schedule-agenda', entity: 'calendar.error', max_items: 5 });
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(callApiCalls.length, 3);
  el.hass = { ...el.hass, states: {} };
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(callApiCalls.length, 3, 'Failed callApi must not refetch on every hass update');

  console.log('✓ eink-schedule-agenda behavioral tests passed (callApi REST, dateTime/date parsing, cache guard).');
}

// 6C. Behavioral tests for eink-sparkline-bar
{
  const el = mountTestCard(registry, 'eink-sparkline-bar');
  const wsCalls = [];

  el.setConfig({
    type: 'custom:eink-sparkline-bar',
    entity: 'sensor.temp',
    hours_to_show: 12,
    chart_type: 'line'
  });
  el.hass = {
    language: 'en',
    states: {
      'sensor.temp': { entity_id: 'sensor.temp', state: '23.4', attributes: { unit_of_measurement: '°C', humidity: 48 } },
      'sensor.empty': { entity_id: 'sensor.empty', state: '10', attributes: {} },
      'sensor.err': { entity_id: 'sensor.err', state: '15', attributes: {} }
    },
    async callWS(msg) {
      wsCalls.push(msg);
      const entityId = msg.entity_ids[0];
      if (entityId === 'sensor.temp' && msg.no_attributes === true) {
        return {
          'sensor.temp': Array.from({ length: 30 }, (_, i) => ({ s: String(10 + i), lu: i }))
        };
      }
      if (entityId === 'sensor.temp' && msg.no_attributes === false) {
        return {
          'sensor.temp': [{ s: '20', a: { humidity: 41 } }, { s: '21', a: { humidity: 48 } }]
        };
      }
      if (entityId === 'sensor.empty') {
        return { 'sensor.empty': [] };
      }
      if (entityId === 'sensor.err') {
        throw new Error('History unavailable');
      }
      return {};
    }
  };

  el.isConnected = true;
  el.connectedCallback();
  await el.updateComplete;
  await flushMicrotasks();
  await el.updateComplete;

  assert.equal(wsCalls.length, 1);
  assert.equal(wsCalls[0].minimal_response, true);
  assert.equal(wsCalls[0].no_attributes, true);
  assert(el._rendered.includes('MIN: 10°C'), 'Downsampling must preserve first point');
  assert(el._rendered.includes('MAX: 39°C'), 'Downsampling must preserve final point');
  const svgMatches = el._rendered.match(/<svg/g) || [];
  assert.equal(svgMatches.length, 1, 'Sparkline must render exactly one <svg> element without nesting');

  // Attribute history must set minimal_response: false and no_attributes: false and read entry.a[attr]
  el.setConfig({
    type: 'custom:eink-sparkline-bar',
    entity: 'sensor.temp',
    attribute: 'humidity',
    hours_to_show: 12,
    chart_type: 'line'
  });
  await el.updateComplete;
  await flushMicrotasks();
  await el.updateComplete;
  assert.equal(wsCalls.length, 2);
  assert.equal(wsCalls[1].minimal_response, false);
  assert.equal(wsCalls[1].no_attributes, false);
  assert(el._rendered.includes('MIN: 41'), 'Attribute sparkline must read entry.a[attribute]');
  assert(el._rendered.includes('MAX: 48'), 'Attribute sparkline must read max entry.a[attribute]');

  // Single point line chart renders horizontal 2-point polyline across full width (0,y 300,y)
  el.setConfig({
    type: 'custom:eink-sparkline-bar',
    entity: 'sensor.empty',
    hours_to_show: 12,
    chart_type: 'line'
  });
  await el.updateComplete;
  await flushMicrotasks();
  await el.updateComplete;
  assert.equal(wsCalls.length, 3);
  assert(el._rendered.includes('points="0,') && el._rendered.includes(' 300,'), 'Single-point line must span full width');

  // Empty history response must NOT refetch on subsequent hass updates
  el.hass = { ...el.hass, states: { ...el.hass.states } };
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(wsCalls.length, 3, 'Empty history must still respect 5-minute cache');

  // Rejected history callWS falls back without retrying on hass updates
  el.setConfig({ type: 'custom:eink-sparkline-bar', entity: 'sensor.err', hours_to_show: 24 });
  await el.updateComplete;
  await flushMicrotasks();
  await el.updateComplete;
  assert.equal(wsCalls.length, 4);
  assert(el._rendered.includes('MIN: 15'), 'Failed history should fall back to current state');
  el.hass = { ...el.hass, states: { ...el.hass.states } };
  await el.updateComplete;
  await flushMicrotasks();
  assert.equal(wsCalls.length, 4, 'Failed history must not retry on hass updates');

  el.isConnected = false;
  el.disconnectedCallback();
  console.log('✓ eink-sparkline-bar behavioral tests passed (state/attribute history, downsampling, cache guard, SVG).');
}

// 6D. Behavioral tests for visual editors
{
  function createHaFormEvent(value) {
    let stopped = false;
    const ev = new CustomEvent('value-changed', { detail: { value } });
    Object.defineProperty(ev, 'target', { value: { tagName: 'HA-FORM' } });
    ev.stopPropagation = () => {
      stopped = true;
    };
    return { ev, wasStopped: () => stopped };
  }

  // Grid Metrics Editor
  const gridEd = mountTestCard(registry, 'eink-grid-metrics-editor');
  const gridConfigs = [];
  gridEd.addEventListener('config-changed', e => gridConfigs.push(e.detail.config));
  gridEd.hass = { language: 'en', states: {} };
  gridEd.setConfig({
    type: 'custom:eink-grid-metrics',
    columns: 2,
    metrics: [{ entity: 'sensor.temp', name: 'Temp', unit: '°C', icon: 'mdi:thermometer', attribute: 'x' }]
  });
  gridEd.isConnected = true;
  gridEd.connectedCallback();
  await gridEd.updateComplete;

  const gridData = gridEd._lastTemplate.values[1];
  const gridSchema = gridEd._lastTemplate.values[2];
  const gridHandler = gridEd._lastTemplate.values[4];
  assert.equal(gridData.columns, '2', 'columns in form data must be string for ha-selector-select');
  assert.equal(gridData.metric_1, 'sensor.temp');
  assert.equal(gridData.metric_1_name, 'Temp');
  const colField = gridSchema.find(s => s.name === 'columns');
  assert.deepEqual(
    colField.selector.select.options.map(o => o.value),
    ['2', '3', '4'],
    'columns selector options must use strings'
  );

  // Adding metric_2 preserves metric_1 + extra fields (unit, icon, attribute)
  const evAdd2 = createHaFormEvent({
    ...gridData,
    metric_2: 'sensor.hum',
    metric_2_name: 'Humidity'
  });
  gridHandler.call(gridEd, evAdd2.ev);
  assert(evAdd2.wasStopped(), 'Editor must call stopPropagation on value-changed');
  assert.equal(gridConfigs.length, 1);
  assert.equal(gridConfigs[0].columns, 2);
  assert.equal(gridConfigs[0].metrics.length, 2);
  assert.deepEqual(gridConfigs[0].metrics[0], {
    entity: 'sensor.temp',
    name: 'Temp',
    unit: '°C',
    icon: 'mdi:thermometer',
    attribute: 'x'
  });
  assert.deepEqual(gridConfigs[0].metrics[1], { entity: 'sensor.hum', name: 'Humidity' });

  // Clearing all metric slots yields empty array []
  const evClearAll = createHaFormEvent({ columns: '3', inverted: false });
  gridHandler.call(gridEd, evClearAll.ev);
  assert.deepEqual(gridConfigs[1].metrics, [], 'Clearing all metric slots must yield empty metrics array');
  assert.equal('title' in gridConfigs[1], false, 'Cleared title should be omitted');

  // Status List Editor
  const statusEd = mountTestCard(registry, 'eink-status-list-editor');
  const statusConfigs = [];
  statusEd.addEventListener('config-changed', e => statusConfigs.push(e.detail.config));
  statusEd.hass = { language: 'en', states: {} };
  statusEd.setConfig({
    type: 'custom:eink-status-list',
    entities: [{ entity: 'binary_sensor.door', name: 'Door', icon: 'mdi:door', active_state: 'open', invert_when_active: false }]
  });
  statusEd.isConnected = true;
  statusEd.connectedCallback();
  await statusEd.updateComplete;

  const statusData = statusEd._lastTemplate.values[1];
  const statusSchema = statusEd._lastTemplate.values[2];
  const statusHandler = statusEd._lastTemplate.values[4];
  assert.equal(statusData.entity_1, 'binary_sensor.door');
  assert(statusSchema.some(s => s.name === 'name_4') && statusSchema.some(s => s.name === 'name_5'));

  const evStatusAdd = createHaFormEvent({ ...statusData, entity_2: 'lock.front', name_2: 'Front Lock' });
  statusHandler.call(statusEd, evStatusAdd.ev);
  assert.deepEqual(statusConfigs[0].entities[0], {
    entity: 'binary_sensor.door',
    name: 'Door',
    icon: 'mdi:door',
    active_state: 'open',
    invert_when_active: false
  });
  assert.deepEqual(statusConfigs[0].entities[1], { entity: 'lock.front', name: 'Front Lock' });
  statusHandler.call(statusEd, createHaFormEvent({ inverted: true }).ev);
  assert.deepEqual(statusConfigs[1].entities, [], 'Clearing all status slots must yield empty entities array');

  // Hero Metric & Sparkline Bar editors: attribute selector hidden when entity is empty, shown when set
  const heroEd = mountTestCard(registry, 'eink-hero-metric-editor');
  const heroConfigs = [];
  heroEd.addEventListener('config-changed', e => heroConfigs.push(e.detail.config));
  heroEd.hass = { language: 'en', states: {} };
  heroEd.setConfig({ type: 'custom:eink-hero-metric', entity: '', title: 'Old Title' });
  heroEd.isConnected = true;
  heroEd.connectedCallback();
  await heroEd.updateComplete;
  assert(!heroEd._lastTemplate.values[2].some(s => s.name === 'attribute'), 'Empty entity must omit attribute selector');

  heroEd.setConfig({ type: 'custom:eink-hero-metric', entity: 'sensor.power', title: 'Old Title' });
  await heroEd.updateComplete;
  assert(heroEd._lastTemplate.values[2].some(s => s.name === 'attribute'), 'Set entity must include attribute selector');

  // BaseEditor clearing optional fields removes deleted key from emitted config
  const heroHandler = heroEd._lastTemplate.values[4];
  heroHandler.call(heroEd, createHaFormEvent({ entity: 'sensor.power' }).ev);
  assert.equal('title' in heroConfigs[0], false, 'Clearing optional field in BaseEditor must remove it from config');

  const sparkEd = mountTestCard(registry, 'eink-sparkline-bar-editor');
  sparkEd.hass = { language: 'en', states: {} };
  sparkEd.setConfig({ type: 'custom:eink-sparkline-bar', entity: '' });
  sparkEd.isConnected = true;
  sparkEd.connectedCallback();
  await sparkEd.updateComplete;
  assert(!sparkEd._lastTemplate.values[2].some(s => s.name === 'attribute'));
  sparkEd.setConfig({ type: 'custom:eink-sparkline-bar', entity: 'sensor.power' });
  await sparkEd.updateComplete;
  assert(sparkEd._lastTemplate.values[2].some(s => s.name === 'attribute'));

  const alertEd = mountTestCard(registry, 'eink-alert-banner-editor');
  alertEd.hass = { language: 'en', states: {} };
  alertEd.setConfig({ type: 'custom:eink-alert-banner', entity: 'binary_sensor.smoke' });
  alertEd.isConnected = true;
  alertEd.connectedCallback();
  await alertEd.updateComplete;
  assert(alertEd._lastTemplate.values[2].some(s => s.name === 'inverted'), 'Alert banner editor must include inverted option');

  console.log('✓ Visual editor behavioral tests passed (grid-metrics, status-list, attribute guards, base-editor).');
}

// 6E. Behavioral tests for eink-alert-banner, eink-grid-metrics, eink-status-list, and eink-time
{
  // Alert banner: missing entity must NOT trigger not_equals alert
  const alertEl = mountTestCard(registry, 'eink-alert-banner');
  alertEl.setConfig({
    type: 'custom:eink-alert-banner',
    entity: 'sensor.missing',
    condition: 'not_equals',
    value: 'ok',
    message: 'Broken!'
  });
  alertEl.hass = { language: 'en', states: {} };
  alertEl.isConnected = true;
  alertEl.connectedCallback();
  await alertEl.updateComplete;
  assert.equal(alertEl.getCardSize(), 0, 'Missing entity must not trigger alert banner');
  assert.equal(alertEl._rendered, '', 'Missing entity must render empty 0px alert banner');

  // Grid metrics: multi-row border-bottom removal + empty config without title
  const gridEl = mountTestCard(registry, 'eink-grid-metrics');
  gridEl.setConfig({ type: 'custom:eink-grid-metrics', metrics: [] });
  gridEl.hass = { language: 'en', states: {} };
  gridEl.isConnected = true;
  gridEl.connectedCallback();
  await gridEl.updateComplete;
  assert(gridEl._rendered.includes('Card not configured'));

  gridEl.setConfig({
    type: 'custom:eink-grid-metrics',
    columns: 2,
    metrics: [
      { entity: 'sensor.a' },
      { entity: 'sensor.b' },
      { entity: 'sensor.c' },
      { entity: 'sensor.d' }
    ]
  });
  gridEl.hass = {
    language: 'en',
    states: {
      'sensor.a': { entity_id: 'sensor.a', state: '1', attributes: {} },
      'sensor.b': { entity_id: 'sensor.b', state: '2', attributes: {} },
      'sensor.c': { entity_id: 'sensor.c', state: '3', attributes: {} },
      'sensor.d': { entity_id: 'sensor.d', state: '4', attributes: {} }
    }
  };
  await gridEl.updateComplete;
  const bottomNoneCount = (gridEl._rendered.match(/border-bottom: none;/g) || []).length;
  assert.equal(bottomNoneCount, 2, 'Last row cells in 2x2 grid must omit border-bottom');

  // Status list: empty config without title
  const statusEl = mountTestCard(registry, 'eink-status-list');
  statusEl.setConfig({ type: 'custom:eink-status-list', entities: [] });
  statusEl.hass = { language: 'en', states: {} };
  statusEl.isConnected = true;
  statusEl.connectedCallback();
  await statusEl.updateComplete;
  assert(statusEl._rendered.includes('Card not configured'));

  // Time card: regional locale pt-BR + timezone synchronization across UTC day boundary
  const RealDate = globalThis.Date;
  const fixedInstant = new RealDate('2026-11-20T01:30:00Z').getTime();
  globalThis.Date = class MockDate extends RealDate {
    constructor(...args) {
      super(args.length === 0 ? fixedInstant : args[0]);
    }
    static now() {
      return fixedInstant;
    }
  };
  try {
    const timeEl = mountTestCard(registry, 'eink-time');
    timeEl.hass = { language: 'pt-BR', states: {} };
    timeEl.setConfig({
      type: 'custom:eink-time',
      time_format: '24h',
      show_date: true,
      date_format: 'long',
      timezone: 'America/New_York'
    });
    timeEl.isConnected = true;
    timeEl.connectedCallback();
    await timeEl.updateComplete;
    assert(timeEl._rendered.includes('20:30'), 'America/New_York at 01:30Z must render 20:30');
    assert(
      timeEl._rendered.includes('Quinta-feira, 19 de Novembro'),
      `Expected pt-BR long date for America/New_York, got: ${timeEl._rendered}`
    );

    timeEl.setConfig({
      type: 'custom:eink-time',
      time_format: '24h',
      show_date: true,
      date_format: 'long',
      timezone: 'Asia/Tokyo'
    });
    await timeEl.updateComplete;
    assert(timeEl._rendered.includes('10:30'), 'Asia/Tokyo at 01:30Z must render 10:30');
    assert(
      timeEl._rendered.includes('Sexta-feira, 20 de Novembro'),
      `Expected pt-BR long date for Asia/Tokyo, got: ${timeEl._rendered}`
    );
    timeEl.isConnected = false;
    timeEl.disconnectedCallback();
  } finally {
    globalThis.Date = RealDate;
  }

  console.log('✓ Remaining card behavioral tests passed (alert-banner, grid-metrics, status-list, time-card).');
}

console.log('✓ All verification checks passed!');
