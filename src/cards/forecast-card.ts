import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { ForecastCardConfig, ForecastItem } from '../types';
import { getWeatherIcon, getWeatherDescription } from '../utils/weather-icons';
import { localize } from '../localize/localize';

@customElement('eink-forecast')
export class EinkForecastCard extends BaseEinkCard<ForecastCardConfig> {
  @state()
  private forecastList: ForecastItem[] = [];

  private lastFetchTime = 0;

  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .forecast-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .forecast-current-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .current-icon {
        --mdc-icon-size: 44px;
      }
      .current-details {
        display: flex;
        flex-direction: column;
      }
      .current-temp-row {
        display: flex;
        align-items: baseline;
        gap: 2px;
      }
      .current-temp {
        font-size: 38px;
        font-weight: 800;
        line-height: 1;
      }
      .current-unit {
        font-size: 18px;
        font-weight: 600;
      }
      .current-condition {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 4px;
      }
      .current-extra {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        font-size: 12px;
      }
      .extra-label {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.5px;
      }
      .extra-value {
        font-size: 18px;
        font-weight: 800;
      }
      .forecast-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 0;
        margin-top: 10px;
        border: 1px solid var(--eink-border-color);
      }
      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 4px;
        border-right: 1px solid var(--eink-border-color);
        text-align: center;
      }
      .forecast-day:last-child {
        border-right: none;
      }
      .day-name {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      .day-icon {
        --mdc-icon-size: 24px;
        margin-bottom: 4px;
      }
      .day-temps {
        font-size: 12px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .day-high {
        font-weight: 800;
      }
      .day-low {
        font-size: 10px;
        opacity: 0.85;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/forecast-editor');
    return document.createElement('eink-forecast-editor');
  }

  public static getStubConfig(): Partial<ForecastCardConfig> {
    return {
      type: 'custom:eink-forecast',
      entity: '',
      days_to_show: 4,
      extra_attribute: 'humidity'
    };
  }

  public getCardSize(): number {
    return 3;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('config')) {
      this.fetchForecastIfNeeded();
    }
  }

  private async fetchForecastIfNeeded(): Promise<void> {
    if (!this.hass || !this.config?.entity) return;

    const now = Date.now();
    // Cache forecast for 15 minutes to preserve e-ink refresh cycles
    if (now - this.lastFetchTime < 900000 && this.forecastList.length > 0) {
      return;
    }
    this.lastFetchTime = now;

    try {
      if (this.hass.callWS) {
        const response = await this.hass.callWS<{ forecast: ForecastItem[] }>({
          type: 'weather/subscribe_forecast',
          forecast_type: 'daily',
          entity_id: this.config.entity
        });
        if (response?.forecast && Array.isArray(response.forecast)) {
          this.forecastList = response.forecast;
          return;
        }
      }
    } catch {
      // Fallback: read attributes.forecast
      const ent = this.getEntity(this.config.entity);
      if (ent?.attributes?.forecast && Array.isArray(ent.attributes.forecast)) {
        this.forecastList = ent.attributes.forecast;
      }
    }
  }

  private formatDayName(datetimeStr?: string): string {
    if (!datetimeStr) return '';
    const date = new Date(datetimeStr);
    if (isNaN(date.getTime())) return datetimeStr;
    const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return localize(`days.${dayKeys[date.getDay()]}`, this.getLanguage());
  }

  protected render(): TemplateResult {
    if (!this.config || !this.config.entity) {
      return html`
        <div class="eink-card">
          <div class="eink-title">${this.t('forecast.name')}</div>
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    const ent = this.getEntity(this.config.entity);
    const condition = ent?.state;
    const temp = ent?.attributes?.temperature;
    const tempUnit = ent?.attributes?.temperature_unit || '°C';
    const lang = this.getLanguage();

    const conditionText = getWeatherDescription(condition, lang);
    const conditionIcon = getWeatherIcon(condition);

    // Extra attribute handling
    const extraAttr = this.config.extra_attribute || 'humidity';
    const extraVal = ent?.attributes?.[extraAttr];
    let extraLabel = this.config.extra_attribute_label;
    if (!extraLabel) {
      extraLabel = this.t(`forecast.extra_${extraAttr}`) || extraAttr;
    }

    let extraUnit = '';
    if (extraAttr === 'humidity') extraUnit = '%';
    else if (extraAttr === 'pressure') extraUnit = ' hPa';
    else if (extraAttr === 'wind_speed') extraUnit = ' ' + (ent?.attributes?.wind_speed_unit || 'km/h');
    else if (extraAttr === 'precipitation') extraUnit = '%';

    const daysToShow = this.config.days_to_show || 4;
    const forecast = this.forecastList.slice(0, daysToShow);

    return html`
      <div class="eink-card" @click=${() => this.handleMoreInfo(this.config.entity)}>
        ${this.config.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}

        <div class="forecast-main">
          <div class="forecast-current-left">
            <ha-icon class="current-icon" .icon=${conditionIcon}></ha-icon>
            <div class="current-details">
              <div class="current-temp-row">
                <span class="current-temp tabular">${temp !== undefined ? temp : '--'}</span>
                <span class="current-unit">${tempUnit}</span>
              </div>
              <span class="current-condition">${conditionText}</span>
            </div>
          </div>

          ${extraVal !== undefined
            ? html`
                <div class="current-extra">
                  <span class="extra-label">${extraLabel}</span>
                  <span class="extra-value tabular">${extraVal}${extraUnit}</span>
                </div>
              `
            : ''}
        </div>

        ${forecast.length > 0
          ? html`
              <div class="forecast-grid">
                ${forecast.map(
                  day => html`
                    <div class="forecast-day">
                      <span class="day-name">${this.formatDayName(day.datetime)}</span>
                      <ha-icon class="day-icon" .icon=${getWeatherIcon(day.condition)}></ha-icon>
                      <div class="day-temps tabular">
                        <span class="day-high"
                          >${day.temperature !== undefined ? `${day.temperature}°` : '--'}</span
                        >
                        ${day.templow !== undefined
                          ? html`<span class="day-low">${day.templow}°</span>`
                          : ''}
                      </div>
                    </div>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}
