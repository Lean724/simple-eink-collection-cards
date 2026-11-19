import { html, TemplateResult, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { GridMetricsCardConfig } from '../types';

@customElement('eink-grid-metrics')
export class EinkGridMetricsCard extends BaseEinkCard<GridMetricsCardConfig> {
  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .grid-container {
        display: grid;
        gap: 0;
        border: 1px solid var(--eink-border-color);
        width: 100%;
      }
      .grid-cell {
        padding: 12px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid var(--eink-border-color);
        border-bottom: 1px solid var(--eink-border-color);
        cursor: pointer;
        user-select: none;
      }
      .grid-cell:nth-child(n) {
        border-right: 1px solid var(--eink-border-color);
      }
      .cell-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
      }
      .cell-icon {
        --mdc-icon-size: 18px;
      }
      .cell-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cell-value-row {
        display: flex;
        align-items: baseline;
        gap: 4px;
      }
      .cell-value {
        font-size: 24px;
        font-weight: 800;
        line-height: 1.1;
      }
      .cell-unit {
        font-size: 12px;
        font-weight: 600;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/grid-metrics-editor');
    return document.createElement('eink-grid-metrics-editor');
  }

  public static getStubConfig(): Partial<GridMetricsCardConfig> {
    return {
      type: 'custom:eink-grid-metrics',
      columns: 3,
      metrics: []
    };
  }

  public getCardSize(): number {
    return 2;
  }

  protected render(): TemplateResult {
    const metrics = this.config?.metrics || [];
    const columns = Math.min(4, Math.max(1, this.config?.columns || (metrics.length > 0 ? metrics.length : 3)));

    if (!metrics || metrics.length === 0) {
      return html`
        <div class="eink-card">
          ${this.config.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}
          <div class="cell-label">${this.t('grid_metrics.name')}</div>
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    return html`
      <div class="eink-card">
        ${this.config.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}
        <div
          class="grid-container"
          style="grid-template-columns: repeat(${columns}, minmax(0, 1fr));"
        >
          ${metrics.map((item, index) => {
            const ent = this.getEntity(item.entity);
            const label = item.name || ent?.attributes?.friendly_name || item.entity;
            const value = this.getEntityState(item.entity, item.attribute);
            const unit = item.unit || (item.attribute ? '' : ent?.attributes?.unit_of_measurement) || '';
            const icon = item.icon || ent?.attributes?.icon;

            const isLastInRow = (index + 1) % columns === 0;
            const borderRight = isLastInRow ? 'border-right: none;' : '';

            return html`
              <div
                class="grid-cell"
                style="${borderRight}"
                @click=${() => this.handleMoreInfo(item.entity)}
              >
                <div class="cell-header">
                  ${icon ? html`<ha-icon class="cell-icon" .icon=${icon}></ha-icon>` : ''}
                  <span class="cell-label">${label}</span>
                </div>
                <div class="cell-value-row">
                  <span class="cell-value tabular">${value}</span>
                  ${unit ? html`<span class="cell-unit">${unit}</span>` : ''}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
