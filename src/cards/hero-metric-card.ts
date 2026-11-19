import { html, TemplateResult, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { HeroMetricCardConfig } from '../types';

@customElement('eink-hero-metric')
export class EinkHeroMetricCard extends BaseEinkCard<HeroMetricCardConfig> {
  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .hero-container {
        cursor: pointer;
        user-select: none;
      }
      .hero-label {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 6px;
      }
      .hero-value-row {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 6px;
      }
      .hero-value {
        font-size: 54px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -1px;
      }
      .hero-unit {
        font-size: 22px;
        font-weight: 600;
      }
      .hero-trend {
        margin-top: 8px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        font-weight: 700;
        border: 1px solid var(--eink-border-color);
        padding: 2px 8px;
      }
      .hero-trend.inverted {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/hero-metric-editor');
    return document.createElement('eink-hero-metric-editor');
  }

  public static getStubConfig(): Partial<HeroMetricCardConfig> {
    return {
      type: 'custom:eink-hero-metric',
      entity: '',
      show_trend: false
    };
  }

  public getCardSize(): number {
    return 2;
  }

  protected render(): TemplateResult {
    if (!this.config || !this.config.entity) {
      return html`
        <div class="eink-card">
          <div class="hero-label">${this.t('hero_metric.name')}</div>
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    const entity = this.getEntity(this.config.entity);
    const label = this.config.name || this.config.title || entity?.attributes?.friendly_name || this.config.entity;
    const value = this.getEntityState(this.config.entity, this.config.attribute);
    const unit = this.config.unit || (this.config.attribute ? '' : entity?.attributes?.unit_of_measurement) || '';

    return html`
      <div class="eink-card hero-container" @click=${() => this.handleMoreInfo(this.config.entity)}>
        <div class="hero-label">${label}</div>
        <div class="hero-value-row">
          <span class="hero-value tabular">${value}</span>
          ${unit ? html`<span class="hero-unit">${unit}</span>` : ''}
        </div>
        ${this.config.show_trend && this.config.trend_value
          ? html`
              <div class="hero-trend ${this.config.trend_inverted ? 'inverted' : ''}">
                <span class="tabular">${this.config.trend_value}</span>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
