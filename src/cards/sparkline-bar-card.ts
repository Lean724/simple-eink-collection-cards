import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { SparklineBarCardConfig } from '../types';
import { renderSparklineSVG } from '../utils/svg-helpers';

@customElement('eink-sparkline-bar')
export class EinkSparklineBarCard extends BaseEinkCard<SparklineBarCardConfig> {
  @state()
  private historyPoints: number[] = [];

  private lastFetchTime = 0;
  private lastFetchKey?: string;
  private isFetching = false;
  private fetchToken = 0;

  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .sparkline-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 8px;
      }
      .sparkline-label {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .sparkline-current {
        font-size: 24px;
        font-weight: 800;
      }
      .sparkline-unit {
        font-size: 14px;
        font-weight: 600;
        margin-left: 2px;
      }
      .sparkline-chart {
        width: 100%;
        margin-top: 6px;
        border-top: 1px solid var(--eink-border-color);
        padding-top: 8px;
      }
      .sparkline-footer {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 6px;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/sparkline-bar-editor');
    return document.createElement('eink-sparkline-bar-editor');
  }

  public static getStubConfig(): Partial<SparklineBarCardConfig> {
    return {
      type: 'custom:eink-sparkline-bar',
      entity: '',
      hours_to_show: 24,
      chart_type: 'bars'
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.fetchHistoryIfNeeded();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.isFetching) {
      this.lastFetchTime = 0;
    }
    this.fetchToken++;
    this.isFetching = false;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('config')) {
      this.fetchHistoryIfNeeded();
    }
  }

  private async fetchHistoryIfNeeded(): Promise<void> {
    const entityId = this.config?.entity;
    if (!this.isConnected || !this.hass?.callWS || !entityId) {
      if (!entityId && (this.historyPoints.length > 0 || this.lastFetchKey)) {
        this.historyPoints = [];
        this.lastFetchKey = undefined;
        this.lastFetchTime = 0;
        this.fetchToken++;
        this.isFetching = false;
      }
      return;
    }

    const hours = this.config.hours_to_show || 24;
    const attr = this.config.attribute;
    const fetchKey = `${entityId}|${attr || ''}|${hours}`;
    const keyChanged = this.lastFetchKey !== fetchKey;

    if (keyChanged) {
      this.fetchToken++;
      this.historyPoints = [];
      this.lastFetchTime = 0;
      this.isFetching = false;
    }

    // Throttle history fetch to at most once every 5 minutes regardless of empty/error results
    const now = Date.now();
    if (
      !keyChanged &&
      (this.isFetching || (this.lastFetchTime > 0 && now - this.lastFetchTime < 300000))
    ) {
      return;
    }

    this.lastFetchKey = fetchKey;
    this.lastFetchTime = now;
    this.isFetching = true;
    const token = ++this.fetchToken;

    const startTime = new Date(now - hours * 3600 * 1000).toISOString();
    const needsAttributes = Boolean(attr);

    try {
      const result = await this.hass.callWS<
        Record<string, Array<{ s?: string; state?: string; a?: Record<string, any>; attributes?: Record<string, any>; lu?: number }>>
      >({
        type: 'history/history_during_period',
        start_time: startTime,
        entity_ids: [entityId],
        minimal_response: !needsAttributes,
        no_attributes: !needsAttributes
      });

      if (token !== this.fetchToken) return;

      const rawEntries = result?.[entityId];
      if (Array.isArray(rawEntries)) {
        const parsed = rawEntries
          .map(entry => {
            const rawVal = attr ? (entry.a ?? entry.attributes)?.[attr] : (entry.s ?? entry.state);
            return parseFloat(String(rawVal));
          })
          .filter((val: number) => !isNaN(val));

        if (parsed.length > 0) {
          // Downsample to max 24 discrete points for e-ink clarity, preserving start and end
          const bucketCount = Math.min(24, Math.max(8, Math.round(hours)));
          let sampled: number[];
          if (parsed.length <= bucketCount) {
            sampled = parsed;
          } else {
            sampled = [];
            for (let i = 0; i < bucketCount; i++) {
              const idx = Math.round((i * (parsed.length - 1)) / (bucketCount - 1));
              sampled.push(parsed[idx]);
            }
          }
          if (JSON.stringify(sampled) !== JSON.stringify(this.historyPoints)) {
            this.historyPoints = sampled;
          }
        }
      }
    } catch {
      // Fallback: create basic single-point array; keep lastFetchTime to avoid spamming WS on hass updates
      if (token === this.fetchToken && this.historyPoints.length === 0) {
        const current = parseFloat(this.getEntityState(entityId, attr));
        if (!isNaN(current)) {
          this.historyPoints = [current];
        }
      }
    } finally {
      if (token === this.fetchToken) {
        this.isFetching = false;
      }
    }
  }

  protected render(): TemplateResult {
    if (!this.config || !this.config.entity) {
      return html`
        <div class="eink-card">
          <div class="sparkline-label">${this.t('sparkline_bar.name')}</div>
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    const ent = this.getEntity(this.config.entity);
    const label = this.config.name || this.config.title || ent?.attributes?.friendly_name || this.config.entity;
    const value = this.getEntityState(this.config.entity, this.config.attribute);
    const unit = this.config.unit || (this.config.attribute ? '' : ent?.attributes?.unit_of_measurement) || '';
    const chartType = this.config.chart_type || 'bars';
    const hours = this.config.hours_to_show || 24;

    const points = this.historyPoints.length > 0
      ? this.historyPoints
      : (!isNaN(parseFloat(value)) ? [parseFloat(value)] : []);

    const min = points.length > 0 ? Math.min(...points) : 0;
    const max = points.length > 0 ? Math.max(...points) : 0;

    return html`
      <div class="eink-card" @click=${() => this.handleMoreInfo(this.config.entity)}>
        <div class="sparkline-header">
          <span class="sparkline-label">${label}</span>
          <div>
            <span class="sparkline-current tabular">${value}</span>
            ${unit ? html`<span class="sparkline-unit">${unit}</span>` : ''}
          </div>
        </div>

        <div class="sparkline-chart">
          ${renderSparklineSVG(
            points,
            chartType,
            300,
            this.config.height || 50,
            'var(--eink-fg)',
            this.config.stroke_width || 2.5
          )}
        </div>

        <div class="sparkline-footer tabular">
          <span>MIN: ${min}${unit}</span>
          <span>${hours}H</span>
          <span>MAX: ${max}${unit}</span>
        </div>
      </div>
    `;
  }
}
