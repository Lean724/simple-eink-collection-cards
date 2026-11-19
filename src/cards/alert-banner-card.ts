import { html, TemplateResult, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { AlertBannerCardConfig } from '../types';

@customElement('eink-alert-banner')
export class EinkAlertBannerCard extends BaseEinkCard<AlertBannerCardConfig> {
  public static styles = [
    ...BaseEinkCard.styles,
    css`
      :host {
        margin: 0;
      }
      .alert-banner {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
        border: 2px solid var(--eink-fg);
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
      }
      .alert-icon {
        --mdc-icon-size: 28px;
        flex-shrink: 0;
      }
      .alert-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
      }
      .alert-title {
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .alert-message {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.25;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/alert-banner-editor');
    return document.createElement('eink-alert-banner-editor');
  }

  public static getStubConfig(): Partial<AlertBannerCardConfig> {
    return {
      type: 'custom:eink-alert-banner',
      entity: '',
      condition: 'on',
      message: 'Critical condition detected!'
    };
  }

  public getCardSize(): number {
    return this.isConditionMet() ? 1 : 0;
  }

  private isConditionMet(): boolean {
    if (!this.config || !this.config.entity) return false;
    const ent = this.getEntity(this.config.entity);
    if (!ent) return false;
    const rawState = this.getEntityState(this.config.entity, this.config.attribute);
    const cond = this.config.condition || 'on';
    const targetVal = this.config.value;

    switch (cond) {
      case 'on':
        return ['on', 'true', 'active', 'open', 'problem', 'detected'].includes(rawState.toLowerCase());
      case 'off':
        return ['off', 'false', 'inactive', 'closed', 'clear'].includes(rawState.toLowerCase());
      case 'equals':
        return String(rawState).toLowerCase() === String(targetVal).toLowerCase();
      case 'not_equals':
        return String(rawState).toLowerCase() !== String(targetVal).toLowerCase();
      case 'above': {
        const num = parseFloat(rawState);
        const tgt = parseFloat(String(targetVal));
        return !isNaN(num) && !isNaN(tgt) && num > tgt;
      }
      case 'below': {
        const num = parseFloat(rawState);
        const tgt = parseFloat(String(targetVal));
        return !isNaN(num) && !isNaN(tgt) && num < tgt;
      }
      default:
        return false;
    }
  }

  protected render(): TemplateResult {
    // If not configured, render helper block in edit mode
    if (!this.config || !this.config.entity) {
      return html`
        <div class="eink-card">
          <div class="alert-title">${this.t('alert_banner.name')}</div>
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    if (!this.isConditionMet()) {
      // 0px height, no visual noise
      return html``;
    }

    const ent = this.getEntity(this.config.entity);
    const title = this.config.title || ent?.attributes?.friendly_name || this.config.entity;
    const msg = this.config.message || this.t('alert_banner.message_placeholder');
    const icon = this.config.icon || 'mdi:alert';

    return html`
      <div class="alert-banner" @click=${() => this.handleMoreInfo(this.config.entity)}>
        <ha-icon class="alert-icon" .icon=${icon}></ha-icon>
        <div class="alert-content">
          <span class="alert-title">${title}</span>
          <span class="alert-message">${msg}</span>
        </div>
      </div>
    `;
  }
}
