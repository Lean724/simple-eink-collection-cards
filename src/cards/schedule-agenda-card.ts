import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { ScheduleAgendaCardConfig } from '../types';

interface CalendarEventItem {
  start: string;
  end?: string;
  summary: string;
  description?: string;
  location?: string;
}

@customElement('eink-schedule-agenda')
export class EinkScheduleAgendaCard extends BaseEinkCard<ScheduleAgendaCardConfig> {
  @state()
  private events: CalendarEventItem[] = [];

  private lastFetchTime = 0;

  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .agenda-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .agenda-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .agenda-row:last-child {
        border-bottom: none;
      }
      .agenda-time {
        font-size: 13px;
        font-weight: 800;
        min-width: 65px;
        flex-shrink: 0;
        text-align: left;
      }
      .agenda-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
        overflow: hidden;
      }
      .agenda-summary {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .agenda-location {
        font-size: 11px;
        opacity: 0.9;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .empty-state {
        padding: 12px 0;
        font-size: 13px;
        font-style: italic;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/schedule-agenda-editor');
    return document.createElement('eink-schedule-agenda-editor');
  }

  public static getStubConfig(): Partial<ScheduleAgendaCardConfig> {
    return {
      type: 'custom:eink-schedule-agenda',
      entity: '',
      max_items: 5
    };
  }

  public getCardSize(): number {
    return Math.max(1, this.events.length);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('config')) {
      this.fetchEventsIfNeeded();
    }
  }

  private async fetchEventsIfNeeded(): Promise<void> {
    if (!this.hass || !this.config?.entity) return;

    const now = Date.now();
    // Cache events for at least 5 minutes
    if (now - this.lastFetchTime < 300000 && this.events.length > 0) {
      return;
    }
    this.lastFetchTime = now;

    const start = new Date().toISOString();
    const end = new Date(now + 7 * 86400 * 1000).toISOString();

    try {
      if (this.hass.callWS) {
        const res = await this.hass.callWS<{ [key: string]: { events: CalendarEventItem[] } }>({
          type: 'calendar/get_events',
          entity_id: this.config.entity,
          start_date_time: start,
          end_date_time: end
        });

        if (res && res[this.config.entity]?.events) {
          const max = this.config.max_items || 5;
          this.events = res[this.config.entity].events.slice(0, max);
          return;
        }
      }

      if (this.hass.callApi) {
        const events = await this.hass.callApi<CalendarEventItem[]>(
          'GET',
          `calendars/${this.config.entity}?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
        );
        if (Array.isArray(events)) {
          const max = this.config.max_items || 5;
          this.events = events.slice(0, max);
        }
      }
    } catch {
      // Keep existing events or empty
    }
  }

  private formatEventTime(isoDateString?: string): string {
    if (!isoDateString) return '--:--';
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (isToday) {
      return `${hours}:${minutes}`;
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
  }

  protected render(): TemplateResult {
    if (!this.config || !this.config.entity) {
      return html`
        <div class="eink-card">
          <div class="eink-title">${this.t('schedule_agenda.name')}</div>
          <div>${this.t('common.not_configured')}</div>
        </div>
      `;
    }

    const title = this.config.title || this.t('schedule_agenda.name');

    return html`
      <div class="eink-card">
        <div class="eink-title">${title}</div>
        <div class="agenda-list">
          ${this.events.length === 0
            ? html`<div class="empty-state">${this.t('common.no_events')}</div>`
            : this.events.map(
                ev => html`
                  <div class="agenda-row">
                    <span class="agenda-time tabular">${this.formatEventTime(ev.start)}</span>
                    <div class="agenda-details">
                      <span class="agenda-summary">${ev.summary}</span>
                      ${ev.location ? html`<span class="agenda-location">${ev.location}</span>` : ''}
                    </div>
                  </div>
                `
              )}
        </div>
      </div>
    `;
  }
}
