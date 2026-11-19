import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { ScheduleAgendaCardConfig } from '../types';

type CalendarEventDate = string | { dateTime?: string; date?: string };

interface CalendarEventItem {
  start?: CalendarEventDate;
  end?: CalendarEventDate;
  summary: string;
  description?: string;
  location?: string;
}

@customElement('eink-schedule-agenda')
export class EinkScheduleAgendaCard extends BaseEinkCard<ScheduleAgendaCardConfig> {
  @state()
  private events: CalendarEventItem[] = [];

  private lastFetchTime = 0;
  private lastFetchedEntity?: string;
  private isFetching = false;
  private fetchToken = 0;

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
    return Math.max(1, Math.min(this.events.length, this.config?.max_items || 5));
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.fetchEventsIfNeeded();
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
      this.fetchEventsIfNeeded();
    }
  }

  private async fetchEventsIfNeeded(): Promise<void> {
    const entityId = this.config?.entity;
    if (!this.isConnected || !this.hass?.callApi || !entityId) {
      if (!entityId && (this.events.length > 0 || this.lastFetchedEntity)) {
        this.events = [];
        this.lastFetchedEntity = undefined;
        this.lastFetchTime = 0;
        this.fetchToken++;
        this.isFetching = false;
      }
      return;
    }

    const entityChanged = this.lastFetchedEntity !== entityId;
    if (entityChanged) {
      this.fetchToken++;
      this.events = [];
      this.lastFetchTime = 0;
      this.isFetching = false;
    }

    const now = Date.now();
    // Cache events for at least 5 minutes regardless of whether events are empty or errored
    if (
      !entityChanged &&
      (this.isFetching || (this.lastFetchTime > 0 && now - this.lastFetchTime < 300000))
    ) {
      return;
    }

    this.lastFetchedEntity = entityId;
    this.lastFetchTime = now;
    this.isFetching = true;
    const token = ++this.fetchToken;

    const start = new Date(now).toISOString();
    const end = new Date(now + 7 * 86400 * 1000).toISOString();

    try {
      const events = await this.hass.callApi<CalendarEventItem[]>(
        'GET',
        `calendars/${encodeURIComponent(entityId)}?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
      );
      if (token === this.fetchToken && Array.isArray(events)) {
        if (JSON.stringify(events) !== JSON.stringify(this.events)) {
          this.events = events;
        }
      }
    } catch {
      // Keep existing events or empty; lastFetchTime prevents refetching on every hass update
    } finally {
      if (token === this.fetchToken) {
        this.isFetching = false;
      }
    }
  }

  private extractStartInfo(eventStart?: CalendarEventDate): { rawStr?: string; isDateOnly: boolean } {
    if (!eventStart) return { isDateOnly: false };
    if (typeof eventStart === 'string') {
      return { rawStr: eventStart, isDateOnly: /^\d{4}-\d{2}-\d{2}$/.test(eventStart) };
    }
    if (eventStart.dateTime) {
      return { rawStr: eventStart.dateTime, isDateOnly: false };
    }
    if (eventStart.date) {
      return { rawStr: eventStart.date, isDateOnly: true };
    }
    return { isDateOnly: false };
  }

  private isSameLocalDay(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  private formatEventTime(eventStart?: CalendarEventDate): string {
    const { rawStr, isDateOnly } = this.extractStartInfo(eventStart);
    if (!rawStr) return '--:--';

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');

    if (isDateOnly) {
      const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(rawStr);
      const date = dateOnlyMatch
        ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
        : new Date(rawStr);
      if (isNaN(date.getTime())) return rawStr;

      if (this.isSameLocalDay(date, now)) {
        return this.t('schedule_agenda.all_day');
      }
      return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
    }

    const date = new Date(rawStr);
    if (isNaN(date.getTime())) return rawStr;

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    if (this.isSameLocalDay(date, now)) {
      return `${hours}:${minutes}`;
    }

    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${hours}:${minutes}`;
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
    const max = this.config.max_items || 5;
    const visibleEvents = this.events.slice(0, max);

    return html`
      <div class="eink-card">
        <div class="eink-title">${title}</div>
        <div class="agenda-list">
          ${visibleEvents.length === 0
            ? html`<div class="empty-state">${this.t('common.no_events')}</div>`
            : visibleEvents.map(
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
