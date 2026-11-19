import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { SparklineBarCardConfig } from '../types';
import { renderSparklineSVG } from '../utils/svg-helpers';

@customElement('eink-sparkline-bar')
export class EinkSparklineBarCard extends BaseEinkCard<SparklineBarCardConfig> {
  @state()
  private historyPoints: number[] = [];

  @state()
  private isLoading = false;

  private lastFetchTime = 0;

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

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('config')) {
      this.fetchHistoryIfNeeded();
    }
  }

  private async fetchHistoryIfNeeded(): Promise<void> {
    if (!this.hass || !this.config?.entity) return;

    // Throttle history fetch to at most once every 5 minutes to protect e-ink bandwidth and processing
    const now = Date.now();
    if (now - this.lastFetchTime < 300000 && this.historyPoints.length > 0) {
      return;
    }
    this.lastFetchTime = now;

    const hours = this.config.hours_to_show || 24;
    const startTime = new Date(now - hours * 3600 * 1000).toISOString();

    try {
      this.isLoading = true;
      if (this.hass.callWS) {
        const result = await this.hass.callWS<Array<Array<{ s: string; lu: number }>>>({
          type: 'history/history_during_period',
          start_time: startTime,
          entity_ids: [this.config.entity],
          minimal_response: true,
          no_attributes: true
        });

        if (result && result[this.config.entity as any]) {
          const rawEntries = (result as any)[this.config.entity];
          const parsed = rawEntries
            .map((entry: any) => parseFloat(entry.s))
            .filter((val: number) => !isNaN(val));

          if (parsed.length > 0) {
            // Downsample to max 24 discrete points for e-ink clarity
            const bucketCount = Math.min(24, Math.max(8, Math.round(hours)));
            const step = Math.max(1, Math.floor(parsed.length / bucketCount));
            const sampled: number[] = [];
            for (let i = 0; i < parsed.length; i += step) {
              sampled.push(parsed[i]);
            }
            this.historyPoints = sampled;
          }
        }
      }
    } catch {
      // Fallback: create basic single-point array
      const current = parseFloat(this.getEntityState(this.config.entity, this.config.attribute));
      if (!isNaN(current)) {
        this.historyPoints = [current];
      }
    } finally {
      this.isLoading = false;
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
          ${renderSparklineSVG(points, chartType, 300, 50, 'var(--eink-fg)')}
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
