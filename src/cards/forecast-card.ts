import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { ForecastCardConfig, ForecastEvent, ForecastItem, HassConnection } from '../types';
import { getWeatherIcon, getWeatherDescription } from '../utils/weather-icons';
import { localize } from '../localize/localize';

@customElement('eink-forecast')
export class EinkForecastCard extends BaseEinkCard<ForecastCardConfig> {
  @state()
  private forecastList: ForecastItem[] = [];

  private _unsubForecast?: () => void | Promise<void>;
  private _subscribedEntity?: string;
  private _subscribedConnection?: HassConnection;
  private _subscribeToken = 0;

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
      .eink-card.interactive {
        cursor: pointer;
      }
      .forecast-v-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 10px;
      }
      .v-title {
        font-size: 13px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }
      .v-location {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .forecast-v-current {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .v-current-icon {
        --mdc-icon-size: 64px;
        margin: 4px 0 8px 0;
      }
      .v-current-temp {
        font-size: 28px;
        font-weight: 800;
        line-height: 1.1;
      }
      .v-current-condition {
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
        align-self: flex-start;
        text-align: left;
      }
      .v-current-extra {
        font-size: 11px;
        font-weight: 700;
        margin-top: 4px;
        align-self: flex-start;
        text-align: left;
        opacity: 0.9;
      }
      .forecast-v-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .forecast-v-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .forecast-v-row:last-child {
        border-bottom: none;
        padding-bottom: 2px;
      }
      .v-day-icon {
        --mdc-icon-size: 28px;
        flex-shrink: 0;
      }
      .v-day-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
      }
      .v-day-name {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
      }
      .v-day-cond {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .v-day-temp {
        font-size: 18px;
        font-weight: 800;
        flex-shrink: 0;
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
      layout: 'horizontal',
      days_to_show: 4,
      extra_attribute: 'humidity'
    };
  }

  public getCardSize(): number {
    return this.config?.layout === 'vertical' ? 5 : 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.subscribeForecastIfNeeded();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeForecast();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('config')) {
      this.subscribeForecastIfNeeded();
    }
  }

  private invokeUnsub(unsub?: () => void | Promise<void>): void {
    if (!unsub) return;
    try {
      Promise.resolve(unsub()).catch(() => {});
    } catch {
      // Ignore errors if subscription or socket is already closed
    }
  }

  private unsubscribeForecast(): void {
    this._subscribeToken++;
    this._subscribedEntity = undefined;
    this._subscribedConnection = undefined;
    const unsub = this._unsubForecast;
    this._unsubForecast = undefined;
    this.invokeUnsub(unsub);
  }

  private applyLegacyForecastFallback(entityId: string): void {
    const ent = this.getEntity(entityId);
    if (ent?.attributes?.forecast && Array.isArray(ent.attributes.forecast)) {
      this.forecastList = ent.attributes.forecast;
    }
  }

  private async subscribeForecastIfNeeded(): Promise<void> {
    const entityId = this.config?.entity;
    if (!this.isConnected || !this.hass || !entityId) {
      if (this._subscribedEntity || this._unsubForecast) {
        this.unsubscribeForecast();
      }
      if (!entityId && this.forecastList.length > 0) {
        this.forecastList = [];
      }
      return;
    }

    const connection = this.hass.connection;
    if (this._subscribedEntity === entityId && this._subscribedConnection === connection) {
      return;
    }

    const entityChanged = this._subscribedEntity !== entityId;
    this.unsubscribeForecast();
    if (entityChanged) {
      this.forecastList = [];
    }

    // Wait until entity exists in hass.states before subscribing
    if (!this.getEntity(entityId)) {
      return;
    }

    this._subscribedEntity = entityId;
    this._subscribedConnection = connection;
    const token = this._subscribeToken;

    if (!connection?.subscribeMessage) {
      this.applyLegacyForecastFallback(entityId);
      return;
    }

    try {
      const unsub = await connection.subscribeMessage<ForecastEvent>(
        event => {
          if (token !== this._subscribeToken) return;
          const nextForecast = Array.isArray(event?.forecast) ? event.forecast : [];
          if (JSON.stringify(nextForecast) !== JSON.stringify(this.forecastList)) {
            this.forecastList = nextForecast;
          }
        },
        {
          type: 'weather/subscribe_forecast',
          forecast_type: 'daily',
          entity_id: entityId
        }
      );

      if (token !== this._subscribeToken || !this.isConnected) {
        this.invokeUnsub(unsub);
        return;
      }

      this._unsubForecast = unsub;
    } catch {
      if (token === this._subscribeToken) {
        this.applyLegacyForecastFallback(entityId);
      }
    }
  }

  private formatDayName(datetimeStr?: string): string {
    if (!datetimeStr) return '';
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datetimeStr);
    const date = dateOnlyMatch
      ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
      : new Date(datetimeStr);
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
    const hasExtra = extraAttr !== 'none';
    const extraVal = hasExtra ? ent?.attributes?.[extraAttr] : undefined;
    let extraLabel = this.config.extra_attribute_label;
    if (!extraLabel && hasExtra) {
      const extraKey = `forecast.extra_${extraAttr}`;
      const translatedExtra = this.t(extraKey);
      extraLabel = translatedExtra !== extraKey ? translatedExtra : extraAttr;
    }

    let extraUnit = '';
    if (extraAttr === 'humidity') extraUnit = '%';
    else if (extraAttr === 'pressure') extraUnit = ' ' + (ent?.attributes?.pressure_unit || 'hPa');
    else if (extraAttr === 'wind_speed') extraUnit = ' ' + (ent?.attributes?.wind_speed_unit || 'km/h');
    else if (extraAttr === 'precipitation') extraUnit = '%';

    const daysToShow = this.config.days_to_show || 4;
    const forecast = this.forecastList.slice(0, daysToShow);
    const isInteractive = this.hasActiveActions(this.config.entity);

    if (this.config.layout === 'vertical') {
      const headerTitle = this.config.title || this.t('forecast.weather_header');
      const locationLabel = this.config.location || ent?.attributes?.friendly_name || '';
      const todayLow = this.forecastList[0]?.templow;
      const vTempText =
        todayLow !== undefined
          ? `${temp !== undefined ? temp : '--'}${tempUnit} / ${todayLow}${tempUnit}`
          : `${temp !== undefined ? temp : '--'}${tempUnit}`;

      return html`
        <div
          class="eink-card ${isInteractive ? 'interactive' : ''}"
          @pointerdown=${(e: PointerEvent) => this.handleActionPointerDown(e, this.config.entity)}
          @pointerup=${() => this.handleActionPointerEnd()}
          @pointercancel=${() => this.handleActionPointerEnd()}
          @pointerleave=${() => this.handleActionPointerEnd()}
          @click=${(e: Event) => this.handleActionClick(e, this.config.entity)}
        >
          <div class="forecast-v-header">
            <span class="v-title">${headerTitle}</span>
            ${locationLabel ? html`<span class="v-location">${locationLabel}</span>` : ''}
          </div>

          <div class="forecast-v-current">
            <ha-icon class="v-current-icon" .icon=${conditionIcon}></ha-icon>
            <div class="v-current-temp tabular">${vTempText}</div>
            <div class="v-current-condition">${this.t('forecast.today')}: ${conditionText}</div>
            ${extraVal !== undefined
              ? html`<div class="v-current-extra tabular">${extraLabel}: ${extraVal}${extraUnit}</div>`
              : ''}
          </div>

          ${forecast.length > 0
            ? html`
                <div class="forecast-v-list">
                  ${forecast.map(
                    day => html`
                      <div class="forecast-v-row">
                        <ha-icon class="v-day-icon" .icon=${getWeatherIcon(day.condition)}></ha-icon>
                        <div class="v-day-details">
                          <span class="v-day-name">${this.formatDayName(day.datetime)}:</span>
                          <span class="v-day-cond">${getWeatherDescription(day.condition, lang)}</span>
                        </div>
                        <span class="v-day-temp tabular"
                          >${day.temperature !== undefined ? `${day.temperature}${tempUnit}` : '--'}</span
                        >
                      </div>
                    `
                  )}
                </div>
              `
            : ''}
        </div>
      `;
    }

    return html`
      <div
        class="eink-card ${isInteractive ? 'interactive' : ''}"
        @pointerdown=${(e: PointerEvent) => this.handleActionPointerDown(e, this.config.entity)}
        @pointerup=${() => this.handleActionPointerEnd()}
        @pointercancel=${() => this.handleActionPointerEnd()}
        @pointerleave=${() => this.handleActionPointerEnd()}
        @click=${(e: Event) => this.handleActionClick(e, this.config.entity)}
      >
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
