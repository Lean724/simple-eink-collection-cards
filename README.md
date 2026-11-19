# Simple E-ink Collection Cards

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/default)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)

A cohesive suite of **high-contrast, zero-noise, battery-friendly Lovelace cards** built specifically for **E-ink (E-paper)** screens in Home Assistant.

Designed from the ground up to eliminate ghosting, avoid needless refreshes, and maximize legibility on reflective, non-backlit displays.

---

## The E-ink Design Philosophy

Standard Home Assistant Lovelace cards are crafted for modern emissive screens (LCD, OLED, AMOLED) that boast millions of colors, fast 60Hz/120Hz refresh rates, smooth CSS transitions, and subtle glassmorphism effects.

When these standard cards are displayed on E-ink screens (such as **Boox**, **Kindle**, **reMarkable**, **Inkplate**, or **ESPHome e-paper frames**), they quickly encounter severe usability and visual hurdles.

### 1. Refresh Control & Visual Noise Elimination
* **Every screen redraw has a cost:** On E-ink panels, refreshing pixels causes visual ghosting, screen flash/inversion cycles, and massive battery drain on portable or solar/battery-powered displays.
* **No per-second updates:** Clocks that update every second or cards with animated spinners degrade screen quality within minutes.
* **Smart minute synchronization:** `eink-time` synchronizes with the exact `:00` second boundary of the upcoming minute and only updates once every 60 seconds. Colons (`:`) never blink.
* **Zero transitions:** CSS animations (`transition`, `animation`) are strictly suppressed (`none !important`) across all cards to avoid dirty intermediate gray dithering frames.

### 2. True Density & 1-Bit Contrast Hierarchy
* **No gray-on-gray or soft shadows:** Translucent cards and `box-shadow` blurs convert into noisy, messy dithering patterns on monochrome (1-bit) and grayscale (4-bit/16-level) e-paper controllers.
* **Geometric contrast:** Hierarchy is established through pure `#000000` (black) and `#ffffff` (white), crisp solid borders (1px or 2px), and deliberate typographic weight differences.
* **Tabular numbers (`font-variant-numeric: tabular-nums`):** Digit widths remain constant. When a sensor value flips from `1` to `8`, the text does not oscillate horizontally, preventing layout jitter and partial screen repaints.
* **Selective inversion for emphasis:** Active states (such as `OPEN` doors, active alarms, or `ON` states) utilize solid inverted blocks (black background with crisp white typography) to command attention without cluttering the screen.

### 3. Hardware Adaptation: Direct Webviews vs. Headless Bitmaps
* **Interactive E-ink Tablets (Android Webviews):** Devices running the Home Assistant Companion App or browser maintain instant touch responsiveness for opening entity `more-info` dialogs while keeping idle repaints at zero.
* **ESPHome & Headless Bitmap Dashboards:** For microcontrollers (ESP32 + Waveshare/GoodDisplay) receiving pre-rendered snapshots via Puppeteer or Home Assistant's screenshot automations, all card dimensions are structurally rigid and predictable. No asynchronous loading shifts or font pop-in will break your layout.

### 4. Iconography Guidelines for E-ink
All cards natively support Home Assistant `<ha-icon>` icons (`mdi:*`). Because thin vector outlines can disappear on low-DPI e-paper:
* **Recommended:** Select solid/filled variants (e.g. `mdi:door-open`, `mdi:lightbulb`, `mdi:bell-alert`, `mdi:weather-sunny`).
* Avoid ultra-thin line variants or dual-tone icons that rely on transparency.

---

## Cards in this Collection

| Card | Tag | Best Used For |
|---|---|---|
| **Hero Metric** | `custom:eink-hero-metric` | Single protagonist metric (outdoor temp, solar power, main energy) in extra-large typography with optional trend delta. |
| **Grid Metrics** | `custom:eink-grid-metrics` | 2 to 4 related sensors (temperature, humidity, pressure, air quality) in a strict grid with solid dividers. |
| **Status List** | `custom:eink-status-list` | Binary or discrete devices (doors, windows, locks, presence) with high-contrast inverted active badges. |
| **Alert Banner** | `custom:eink-alert-banner` | Critical warnings (low battery, rain detected, network outage). Renders as a solid block only when triggered; takes **0px** height when clear. |
| **Sparkline Bar** | `custom:eink-sparkline-bar` | Simplified 12h/24h historical trends rendered with discrete vertical bars or solid lines with zero antialiasing blur. |
| **Schedule Agenda** | `custom:eink-schedule-agenda` | Calendar events and reminders in a compact chronological table with bold time on the left and title on the right. |
| **Clock & Date** | `custom:eink-time` | Big digital clock with zero second ghosting, multi-language dates, and slots for up to 2 secondary sensor chips. |
| **Weather Forecast** | `custom:eink-forecast` | Weather condition, current temperature, multi-day extended forecast, and a configurable extra slot (humidity, pressure, wind). |

---

## Universal Features

### 1. Inverted Theme (`inverted: true`)
Every card in the collection supports the `inverted` boolean parameter:
* `inverted: false` (Default): High-contrast crisp black text, icons, and solid borders on a pure white background.
* `inverted: true`: High-contrast pure white text, icons, and borders on a solid black background. Ideal for night dashboards or inverted displays.

### 2. 100% Visual UI Editor Support
All 8 cards include a visual editor (`ha-form` / `ha-selector`). You can configure entities, attributes, custom names, units, icons, display formats, and layout options directly from the Home Assistant UI without writing manual YAML.

### 3. Built-in Multi-Language Support
Card headers, options, date formats, weather conditions, and visual editor labels are translated into **8 languages**:
* 🇬🇧 **English** (`en`) — Default
* 🇪🇸 **Español** (`es`)
* 🇨🇳 **简体中文** (`zh-Hans`)
* 🇩🇪 **Deutsch** (`de`)
* 🇮🇹 **Italiano** (`it`)
* 🇫🇷 **Français** (`fr`)
* 🇵🇹 **Português** (`pt`)
* 🇷🇺 **Русский** (`ru`)

Language is automatically detected from your Home Assistant profile.

---

## YAML Configuration Examples

### 1. E-ink Hero Metric
```yaml
type: custom:eink-hero-metric
entity: sensor.outdoor_temperature
name: OUTSIDE TEMP
unit: °C
show_trend: true
trend_value: "▲ +1.2°"
inverted: false
```

### 2. E-ink Grid Metrics
```yaml
type: custom:eink-grid-metrics
title: LIVING ROOM CLIMATE
columns: 3
metrics:
  - entity: sensor.living_room_temperature
    name: TEMP
    unit: °C
    icon: mdi:thermometer
  - entity: sensor.living_room_humidity
    name: HUMIDITY
    unit: "%"
    icon: mdi:water-percent
  - entity: sensor.living_room_co2
    name: CO2
    unit: ppm
    icon: mdi:molecule-co2
```

### 3. E-ink Status List
```yaml
type: custom:eink-status-list
title: ACCESS POINTS
entities:
  - entity: binary_sensor.front_door
    name: Front Door
    icon: mdi:door
    invert_when_active: true
  - entity: binary_sensor.garage_gate
    name: Garage Gate
    icon: mdi:garage
    invert_when_active: true
  - entity: lock.main_door
    name: Deadbolt
    icon: mdi:lock
```

### 4. E-ink Alert Banner
*Occupies zero vertical space unless the condition is met.*
```yaml
type: custom:eink-alert-banner
entity: sensor.smoke_detector_battery
condition: below
value: 20
message: "SMOKE DETECTOR BATTERY IS BELOW 20%!"
icon: mdi:battery-alert
```

### 5. E-ink Sparkline Bar
```yaml
type: custom:eink-sparkline-bar
entity: sensor.living_room_temperature
name: TEMP 24H TREND
hours_to_show: 24
chart_type: bars # or 'line'
unit: °C
```

### 6. E-ink Schedule Agenda
```yaml
type: custom:eink-schedule-agenda
title: TODAY'S AGENDA
entity: calendar.family
max_items: 4
```

### 7. E-ink Clock & Date
```yaml
type: custom:eink-time
time_format: 24h # or '12h'
show_date: true
date_format: long # 'short', 'long', or 'combined'
entity_1: sensor.outdoor_temperature
entity_2: sensor.tablet_battery_level
```

### 8. E-ink Weather Forecast
```yaml
type: custom:eink-forecast
title: WEATHER
entity: weather.home
days_to_show: 4
extra_attribute: humidity # 'humidity', 'pressure', 'wind_speed', or 'precipitation'
```

---

## Installation

### Method 1: HACS (Recommended)
1. Ensure **HACS** is installed in your Home Assistant instance.
2. In HACS, open the **Frontend** section.
3. Click the three dots in the upper right corner and select **Custom repositories**.
4. Enter the URL of this repository, select category **Dashboard** (or **Lovelace**), and click **Add**.
5. Find **Simple E-ink Collection Cards**, click **Download**, and reload your dashboard resources when prompted.

### Method 2: Manual Installation
1. Download `simple-eink-collection-cards.js` from the repository root or the [Releases](releases) page.
2. Copy `simple-eink-collection-cards.js` into your Home Assistant directory:
   `<config>/www/simple-eink-collection-cards.js`
3. In Home Assistant, navigate to **Settings** → **Dashboards** → **Resources** (top right menu).
4. Click **Add Resource**:
   * **URL:** `/local/simple-eink-collection-cards.js`
   * **Resource type:** `JavaScript Module`
5. Refresh your browser or clear your cache. All 8 cards will now appear in your visual card picker.

---

## Development

```bash
# Install dependencies
npm install

# Run static TypeScript typecheck
npm run typecheck

# Build bundled distribution
npm run build

# Run automated tests and translation checks
npm test
```

* `npm run build` bundles all cards, editors, base styles, and translations into `dist/simple-eink-collection-cards.js` and mirrors it to the repository root.
* `npm test` runs `tests/verify.mjs` to ensure completeness of all 8 language dictionaries and card definitions.

---

## License

This project is licensed under the [MIT License](LICENSE).
