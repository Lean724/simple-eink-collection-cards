import { html, TemplateResult, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { StatusListCardConfig } from '../types';

@customElement('eink-status-list')
export class EinkStatusListCard extends BaseEinkCard<StatusListCardConfig> {
  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .status-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .status-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--eink-border-color);
        cursor: pointer;
        user-select: none;
      }
      .status-item:last-child {
        border-bottom: none;
      }
      .status-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        overflow: hidden;
      }
      .status-name {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status-badge {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        padding: 3px 8px;
        border: 1px solid var(--eink-border-color);
        white-space: nowrap;
      }
      .status-badge.active-inverted {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/status-list-editor');
    return document.createElement('eink-status-list-editor');
  }

  public static getStubConfig(): Partial<StatusListCardConfig> {
    return {
      type: 'custom:eink-status-list',
      entities: []
    };
  }

  public getCardSize(): number {
    return Math.max(1, (this.config?.entities?.length || 1));
  }

  protected render(): TemplateResult {
    const items = this.config?.entities || [];

    if (items.length === 0) {
      return html`
        <div class="eink-card">
          ${this.config?.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    return html`
      <div class="eink-card">
        ${this.config?.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}
        <div class="status-list">
          ${items.map(item => {
            const ent = this.getEntity(item.entity);
            const label = item.name || ent?.attributes?.friendly_name || item.entity;
            const state = ent?.state || this.t('common.no_data');
            const icon = item.icon || ent?.attributes?.icon || 'mdi:radiobox-blank';

            const activeTargets = item.active_state
              ? [item.active_state.toLowerCase()]
              : ['on', 'open', 'active', 'true', 'home', 'unlocked'];
            const isActive = activeTargets.includes(state.toLowerCase());

            const shouldInvert = item.invert_when_active !== false ? isActive : false;

            return html`
              <div class="status-item" @click=${() => this.handleMoreInfo(item.entity)}>
                <div class="status-left">
                  <ha-icon .icon=${icon}></ha-icon>
                  <span class="status-name">${label}</span>
                </div>
                <div class="status-badge ${shouldInvert ? 'active-inverted' : ''}">
                  ${state}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
