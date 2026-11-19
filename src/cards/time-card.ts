import { html, TemplateResult, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { TimeCardConfig } from '../types';
import { createMinuteSync } from '../utils/time-sync';
import { formatDate, formatTime } from '../utils/date-formatter';

@customElement('eink-time')
export class EinkTimeCard extends BaseEinkCard<TimeCardConfig> {
  @state()
  private currentDate: Date = new Date();

  private cleanupTimer?: () => void;

  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .time-card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4px 0;
      }
      .time-row {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 6px;
      }
      .time-digits {
        font-size: 64px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -2px;
      }
      .time-ampm {
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .date-text {
        font-size: 15px;
        font-weight: 700;
        margin-top: 8px;
        letter-spacing: 0.5px;
      }
      .entities-row {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid var(--eink-border-color);
        width: 100%;
        flex-wrap: wrap;
      }
      .entity-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .chip-icon {
        --mdc-icon-size: 16px;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/time-editor');
    return document.createElement('eink-time-editor');
  }

  public static getStubConfig(): Partial<TimeCardConfig> {
    return {
      type: 'custom:eink-time',
      time_format: '24h',
      show_date: true,
      date_format: 'long'
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.currentDate = new Date();
    this.cleanupTimer = createMinuteSync(() => {
      this.currentDate = new Date();
      this.requestUpdate();
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.cleanupTimer) {
      this.cleanupTimer();
      this.cleanupTimer = undefined;
    }
  }

  public getCardSize(): number {
    return 2;
  }

  protected render(): TemplateResult {
    const timeFormat = this.config?.time_format || '24h';
    const showDate = this.config?.show_date !== false;
    const dateFormat = this.config?.date_format || 'long';
    const timezone = this.config?.timezone;
    const lang = this.getLanguage();

    const formattedTime = formatTime(this.currentDate, timeFormat, timezone);
    const formattedDate = showDate ? formatDate(this.currentDate, dateFormat, lang) : '';

    const ent1 = this.getEntity(this.config?.entity_1);
    const ent2 = this.getEntity(this.config?.entity_2);

    return html`
      <div class="eink-card">
        ${this.config?.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}
        <div class="time-card-content">
          <div class="time-row">
            <span class="time-digits tabular">${formattedTime.time}</span>
            ${formattedTime.ampm ? html`<span class="time-ampm">${formattedTime.ampm}</span>` : ''}
          </div>

          ${showDate ? html`<div class="date-text">${formattedDate}</div>` : ''}

          ${ent1 || ent2
            ? html`
                <div class="entities-row">
                  ${ent1
                    ? html`
                        <div class="entity-chip" @click=${() => this.handleMoreInfo(this.config.entity_1)}>
                          <ha-icon
                            class="chip-icon"
                            .icon=${ent1.attributes.icon || 'mdi:information-outline'}
                          ></ha-icon>
                          <span class="tabular"
                            >${ent1.state} ${ent1.attributes.unit_of_measurement || ''}</span
                          >
                        </div>
                      `
                    : ''}
                  ${ent2
                    ? html`
                        <div class="entity-chip" @click=${() => this.handleMoreInfo(this.config.entity_2)}>
                          <ha-icon
                            class="chip-icon"
                            .icon=${ent2.attributes.icon || 'mdi:information-outline'}
                          ></ha-icon>
                          <span class="tabular"
                            >${ent2.state} ${ent2.attributes.unit_of_measurement || ''}</span
                          >
                        </div>
                      `
                    : ''}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}
