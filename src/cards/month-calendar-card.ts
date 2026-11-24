import { html, TemplateResult, css, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseEinkCard } from './base-eink-card';
import { CalendarEventDate, CalendarEventItem, MonthCalendarCardConfig } from '../types';
import {
  DAY_KEYS,
  DAY_LONG_KEYS,
  MONTH_LONG_KEYS,
  formatTime,
  getDateParts,
  zonedWallTimeToDate
} from '../utils/date-formatter';

interface NormalizedTodayEvent {
  summary: string;
  isAllDay: boolean;
  startMs: number;
  timeLabel: string;
}

interface MonthWeekRow {
  weekNumber: number;
  days: Array<number | null>;
  isCurrentWeek: boolean;
}

@customElement('eink-month-calendar')
export class EinkMonthCalendarCard extends BaseEinkCard<MonthCalendarCardConfig> {
  @state()
  private events: CalendarEventItem[] = [];

  private lastFetchTime = 0;
  private lastFetchKey?: string;
  private isFetching = false;
  private fetchToken = 0;
  private midnightTimer?: ReturnType<typeof setTimeout>;

  public static styles = [
    ...BaseEinkCard.styles,
    css`
      .eink-card.interactive {
        cursor: pointer;
      }
      .month-header {
        font-size: 24px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        line-height: 1.1;
        margin-bottom: 10px;
      }
      .today-summary {
        display: flex;
        align-items: stretch;
        gap: 12px;
        margin-bottom: 14px;
      }
      .today-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        min-width: 56px;
      }
      .today-weekday {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.1;
      }
      .today-number {
        font-size: 40px;
        font-weight: 800;
        line-height: 1;
        margin-top: 2px;
      }
      .today-events {
        display: flex;
        align-items: stretch;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
      .today-event-slot {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 2px solid var(--eink-border-color);
        padding: 2px 10px;
        min-width: 0;
        flex: 1;
      }
      .today-event-time {
        font-size: 11px;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
      }
      .today-event-summary {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.2;
        margin-top: 2px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
      }
      .today-events-more {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 2px solid var(--eink-border-color);
        padding: 2px 10px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
      }
      .today-no-events {
        display: flex;
        align-items: center;
        border-left: 2px solid var(--eink-border-color);
        padding: 2px 10px;
        font-size: 12px;
        font-style: italic;
        opacity: 0.85;
      }
      .month-grid {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .month-row {
        display: grid;
        align-items: center;
        min-height: 28px;
      }
      .month-row.with-weeks {
        grid-template-columns: 32px repeat(7, minmax(0, 1fr));
      }
      .month-row.no-weeks {
        grid-template-columns: repeat(7, minmax(0, 1fr));
      }
      .month-row.header-row {
        min-height: 24px;
        margin-bottom: 2px;
      }
      .wk-header {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        opacity: 0.75;
      }
      .weekday-header {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 0.3px;
      }
      .wk-cell {
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        opacity: 0.75;
      }
      .day-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-weight: 600;
        height: 26px;
      }
      .month-row.current-week {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
        padding: 2px 0;
      }
      .month-row.current-week .wk-cell {
        opacity: 1;
        font-weight: 700;
      }
      .current-day-badge {
        background-color: var(--eink-bg);
        color: var(--eink-fg);
        font-weight: 800;
        padding: 1px 6px;
        min-width: 24px;
        text-align: center;
        line-height: 1.25;
      }
    `
  ];

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('../editors/month-calendar-editor');
    return document.createElement('eink-month-calendar-editor');
  }

  public static getStubConfig(): Partial<MonthCalendarCardConfig> {
    return {
      type: 'custom:eink-month-calendar',
      entities: [],
      first_day_of_week: 'monday',
      time_format: 'auto',
      show_week_numbers: true,
      max_events: 2
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.scheduleMidnightRefresh();
    this.fetchEventsIfNeeded();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearMidnightTimer();
    if (this.isFetching) {
      this.lastFetchTime = 0;
    }
    this.fetchToken++;
    this.isFetching = false;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('config')) {
      this.scheduleMidnightRefresh();
    }
    if (changedProps.has('hass') || changedProps.has('config')) {
      this.fetchEventsIfNeeded();
    }
  }

  private clearMidnightTimer(): void {
    if (this.midnightTimer !== undefined) {
      clearTimeout(this.midnightTimer);
      this.midnightTimer = undefined;
    }
  }

  private scheduleMidnightRefresh(): void {
    this.clearMidnightTimer();
    if (!this.isConnected) return;

    const now = new Date();
    const timezone = this.config?.timezone;
    const parts = getDateParts(now, timezone);
    const nextMidnight = zonedWallTimeToDate(
      parts.year,
      parts.monthIndex,
      parts.dayOfMonth + 1,
      0,
      0,
      0,
      50,
      timezone
    );
    const delayMs = Math.max(1000, nextMidnight.getTime() - now.getTime());

    this.midnightTimer = setTimeout(() => {
      this.midnightTimer = undefined;
      this.lastFetchTime = 0;
      this.requestUpdate();
      this.fetchEventsIfNeeded();
      this.scheduleMidnightRefresh();
    }, delayMs);
    (this.midnightTimer as unknown as { unref?: () => void })?.unref?.();
  }

  private getConfiguredEntities(): string[] {
    const raw =
      Array.isArray(this.config?.entities) && this.config.entities.length > 0
        ? this.config.entities
        : this.config?.entity
          ? [this.config.entity]
          : [];
    const cleaned = raw
      .filter((id): id is string => typeof id === 'string')
      .map(id => id.trim())
      .filter(id => id.length > 0);
    return Array.from(new Set(cleaned));
  }

  private getTodayYmd(date = new Date()): string {
    const { year, monthIndex, dayOfMonth } = getDateParts(date, this.config?.timezone);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${year}-${pad(monthIndex + 1)}-${pad(dayOfMonth)}`;
  }

  private async fetchEventsIfNeeded(): Promise<void> {
    const entities = this.getConfiguredEntities();
    if (!this.isConnected || !this.hass?.callApi || entities.length === 0) {
      if (entities.length === 0 && (this.events.length > 0 || this.lastFetchKey)) {
        this.events = [];
        this.lastFetchKey = undefined;
        this.lastFetchTime = 0;
        this.fetchToken++;
        this.isFetching = false;
      }
      return;
    }

    const now = new Date();
    const timezone = this.config?.timezone;
    const todayYmd = this.getTodayYmd(now);
    const fetchKey = `${entities.join(',')}|${timezone || ''}|${todayYmd}`;
    const keyChanged = this.lastFetchKey !== fetchKey;

    if (keyChanged) {
      this.fetchToken++;
      this.events = [];
      this.lastFetchTime = 0;
      this.isFetching = false;
    }

    const nowMs = now.getTime();
    if (
      !keyChanged &&
      (this.isFetching || (this.lastFetchTime > 0 && nowMs - this.lastFetchTime < 300000))
    ) {
      return;
    }

    this.lastFetchKey = fetchKey;
    this.lastFetchTime = nowMs;
    this.isFetching = true;
    const token = ++this.fetchToken;

    const parts = getDateParts(now, timezone);
    const dayStart = zonedWallTimeToDate(parts.year, parts.monthIndex, parts.dayOfMonth, 0, 0, 0, 0, timezone);
    const dayEnd = zonedWallTimeToDate(parts.year, parts.monthIndex, parts.dayOfMonth, 23, 59, 59, 999, timezone);
    const startParam = encodeURIComponent(dayStart.toISOString());
    const endParam = encodeURIComponent(dayEnd.toISOString());

    try {
      const results = await Promise.allSettled(
        entities.map(entityId =>
          this.hass.callApi!<CalendarEventItem[]>(
            'GET',
            `calendars/${encodeURIComponent(entityId)}?start=${startParam}&end=${endParam}`
          )
        )
      );

      if (token !== this.fetchToken) return;

      const merged: CalendarEventItem[] = [];
      for (const res of results) {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          merged.push(...res.value);
        }
      }

      if (JSON.stringify(merged) !== JSON.stringify(this.events)) {
        this.events = merged;
      }
    } catch {
      // Cache timestamp prevents hammering failed API calls on every hass state change
    } finally {
      if (token === this.fetchToken) {
        this.isFetching = false;
      }
    }
  }

  private extractEventBoundary(boundary?: CalendarEventDate): {
    rawStr?: string;
    isDateOnly: boolean;
  } {
    if (!boundary) return { isDateOnly: false };
    if (typeof boundary === 'string') {
      return { rawStr: boundary, isDateOnly: /^\d{4}-\d{2}-\d{2}$/.test(boundary) };
    }
    if (boundary.dateTime) {
      return { rawStr: boundary.dateTime, isDateOnly: false };
    }
    if (boundary.date) {
      return { rawStr: boundary.date, isDateOnly: true };
    }
    return { isDateOnly: false };
  }

  private resolveTimeFormat(): '24h' | '12h' {
    const configured = this.config?.time_format || 'auto';
    if (configured === '24h' || configured === '12h') {
      return configured;
    }

    const hassTimeFormat = this.hass?.locale?.time_format;
    if (hassTimeFormat === '12' || hassTimeFormat === 'am_pm') {
      return '12h';
    }
    if (hassTimeFormat === '24') {
      return '24h';
    }

    try {
      const resolved = new Intl.DateTimeFormat(this.getLanguage(), { hour: 'numeric' }).resolvedOptions();
      if (resolved.hour12) return '12h';
    } catch {
      // Fallback to 24h
    }
    return '24h';
  }

  private getTodayNormalizedEvents(now: Date): NormalizedTodayEvent[] {
    const timezone = this.config?.timezone;
    const parts = getDateParts(now, timezone);
    const todayYmd = this.getTodayYmd(now);
    const todayStartMs = zonedWallTimeToDate(parts.year, parts.monthIndex, parts.dayOfMonth, 0, 0, 0, 0, timezone).getTime();
    const todayEndMs = zonedWallTimeToDate(parts.year, parts.monthIndex, parts.dayOfMonth, 23, 59, 59, 999, timezone).getTime();
    const timeFmt = this.resolveTimeFormat();
    const allDayLabel = this.t('schedule_agenda.all_day');

    const normalized: NormalizedTodayEvent[] = [];

    for (const ev of this.events) {
      const startInfo = this.extractEventBoundary(ev.start);
      const endInfo = this.extractEventBoundary(ev.end);
      if (!startInfo.rawStr) continue;

      if (startInfo.isDateOnly) {
        const startYmd = startInfo.rawStr.slice(0, 10);
        const endYmd = endInfo.rawStr ? endInfo.rawStr.slice(0, 10) : undefined;
        // Home Assistant / iCal all-day end.date is exclusive
        const overlapsToday = endYmd
          ? startYmd <= todayYmd && endYmd > todayYmd
          : startYmd === todayYmd;

        if (!overlapsToday) continue;

        normalized.push({
          summary: ev.summary || '',
          isAllDay: true,
          startMs: todayStartMs,
          timeLabel: allDayLabel
        });
        continue;
      }

      const startDate = new Date(startInfo.rawStr);
      if (isNaN(startDate.getTime())) continue;
      const startMs = startDate.getTime();

      let endMs: number | undefined;
      if (endInfo.rawStr) {
        const parsedEnd = endInfo.isDateOnly
          ? new Date(`${endInfo.rawStr}T00:00:00`)
          : new Date(endInfo.rawStr);
        if (!isNaN(parsedEnd.getTime())) {
          endMs = parsedEnd.getTime();
        }
      }

      const overlapsToday =
        endMs !== undefined
          ? startMs <= todayEndMs && endMs > todayStartMs
          : startMs >= todayStartMs && startMs <= todayEndMs;

      if (!overlapsToday) continue;

      const spansBeforeToday = startMs < todayStartMs;
      let timeLabel: string;
      if (spansBeforeToday) {
        timeLabel = allDayLabel;
      } else {
        const formatted = formatTime(startDate, timeFmt, timezone);
        timeLabel = formatted.ampm ? `${formatted.time} ${formatted.ampm}` : formatted.time;
      }

      normalized.push({
        summary: ev.summary || '',
        isAllDay: spansBeforeToday,
        startMs,
        timeLabel
      });
    }

    normalized.sort((a, b) => {
      if (a.isAllDay !== b.isAllDay) return a.isAllDay ? -1 : 1;
      if (a.startMs !== b.startMs) return a.startMs - b.startMs;
      return a.summary.localeCompare(b.summary);
    });

    return normalized;
  }

  private getIsoWeekNumber(year: number, monthIndex: number, day: number): number {
    const d = new Date(Date.UTC(year, monthIndex, day));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  private getSundayWeekNumber(year: number, monthIndex: number, rowSundayDay: number): number {
    const rowSunday = new Date(Date.UTC(year, monthIndex, rowSundayDay));
    const rowSaturday = new Date(
      Date.UTC(rowSunday.getUTCFullYear(), rowSunday.getUTCMonth(), rowSunday.getUTCDate() + 6)
    );
    const targetYear = rowSaturday.getUTCFullYear();
    const jan1 = new Date(Date.UTC(targetYear, 0, 1));
    const week1Start = new Date(Date.UTC(targetYear, 0, 1 - jan1.getUTCDay()));
    return Math.floor((rowSunday.getTime() - week1Start.getTime()) / (7 * 86400000)) + 1;
  }

  private buildMonthGrid(
    year: number,
    monthIndex: number,
    todayDayOfMonth: number,
    firstDayOfWeek: 'monday' | 'sunday'
  ): { weekdayKeys: string[]; weeks: MonthWeekRow[] } {
    const firstWeekday = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

    const leadingEmpty =
      firstDayOfWeek === 'sunday' ? firstWeekday : (firstWeekday + 6) % 7;

    const weekdayKeys =
      firstDayOfWeek === 'sunday'
        ? DAY_KEYS
        : [...DAY_KEYS.slice(1), DAY_KEYS[0]];

    const totalCells = Math.ceil((leadingEmpty + daysInMonth) / 7) * 7;
    const weeks: MonthWeekRow[] = [];

    for (let startCell = 0; startCell < totalCells; startCell += 7) {
      const days: Array<number | null> = [];
      for (let offset = 0; offset < 7; offset++) {
        const dayNum = startCell + offset - leadingEmpty + 1;
        days.push(dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null);
      }

      const rowAnchorDay = startCell - leadingEmpty + 1;
      const weekNumber =
        firstDayOfWeek === 'sunday'
          ? this.getSundayWeekNumber(year, monthIndex, rowAnchorDay)
          : this.getIsoWeekNumber(year, monthIndex, rowAnchorDay);

      weeks.push({
        weekNumber,
        days,
        isCurrentWeek: days.includes(todayDayOfMonth)
      });
    }

    return { weekdayKeys, weeks };
  }

  protected render(): TemplateResult {
    const now = new Date();
    const timezone = this.config?.timezone;
    const parts = getDateParts(now, timezone);
    const lang = this.getLanguage();
    const baseLang = lang.replace('_', '-').split('-')[0].toLowerCase();

    const monthName = this.t(`months.${MONTH_LONG_KEYS[parts.monthIndex]}`);
    const monthTitle = baseLang === 'zh' ? `${parts.year}年 ${monthName}` : `${monthName} ${parts.year}`;
    const weekdayName = this.t(`days.${DAY_LONG_KEYS[parts.dayOfWeek]}`);

    const firstDayOfWeek = this.config?.first_day_of_week === 'sunday' ? 'sunday' : 'monday';
    const showWeekNumbers = this.config?.show_week_numbers !== false;
    const maxEvents = Math.max(1, Math.min(5, this.config?.max_events || 2));

    const { weekdayKeys, weeks } = this.buildMonthGrid(
      parts.year,
      parts.monthIndex,
      parts.dayOfMonth,
      firstDayOfWeek
    );

    const entities = this.getConfiguredEntities();
    const primaryEntity = entities[0];
    const todayEvents = entities.length > 0 ? this.getTodayNormalizedEvents(now) : [];
    const visibleEvents = todayEvents.slice(0, maxEvents);
    const remainingCount = Math.max(0, todayEvents.length - maxEvents);
    const isInteractive = this.hasActiveActions(primaryEntity);

    const rowGridClass = showWeekNumbers ? 'with-weeks' : 'no-weeks';

    return html`
      <div
        class="eink-card ${isInteractive ? 'interactive' : ''}"
        @pointerdown=${(e: PointerEvent) => this.handleActionPointerDown(e, primaryEntity)}
        @pointerup=${() => this.handleActionPointerEnd()}
        @pointercancel=${() => this.handleActionPointerEnd()}
        @pointerleave=${() => this.handleActionPointerEnd()}
        @click=${(e: Event) => this.handleActionClick(e, primaryEntity)}
      >
        ${this.config?.title ? html`<div class="eink-title">${this.config.title}</div>` : ''}

        <div class="month-header">${monthTitle}</div>

        <div class="today-summary">
          <div class="today-left">
            <span class="today-weekday">${weekdayName}</span>
            <span class="today-number tabular">${parts.dayOfMonth}</span>
          </div>

          ${entities.length > 0
            ? html`
                <div class="today-events">
                  ${visibleEvents.length === 0
                    ? html`<div class="today-no-events">${this.t('common.no_events')}</div>`
                    : html`
                        ${visibleEvents.map(
                          ev => html`
                            <div class="today-event-slot">
                              <span class="today-event-time tabular">${ev.timeLabel}</span>
                              <span class="today-event-summary">${ev.summary}</span>
                            </div>
                          `
                        )}
                        ${remainingCount > 0
                          ? html`
                              <div class="today-events-more">
                                <span class="tabular">+${remainingCount}</span>
                                <span
                                  >${this.t(
                                    remainingCount === 1
                                      ? 'month_calendar.more_event'
                                      : 'month_calendar.more_events'
                                  )}</span
                                >
                              </div>
                            `
                          : ''}
                      `}
                </div>
              `
            : ''}
        </div>

        <div class="month-grid">
          <div class="month-row header-row ${rowGridClass}">
            ${showWeekNumbers
              ? html`<span class="wk-header">${this.t('month_calendar.week_short')}</span>`
              : ''}
            ${weekdayKeys.map(
              dayKey => html`<span class="weekday-header">${this.t(`days.${dayKey}`)}</span>`
            )}
          </div>

          ${weeks.map(
            week => html`
              <div class="month-row ${rowGridClass} ${week.isCurrentWeek ? 'current-week' : ''}">
                ${showWeekNumbers
                  ? html`<span class="wk-cell tabular">${week.weekNumber}</span>`
                  : ''}
                ${week.days.map(day =>
                  day === null
                    ? html`<span class="day-cell empty"></span>`
                    : day === parts.dayOfMonth
                      ? html`<span class="day-cell current-day tabular"
                          ><span class="current-day-badge">${day}</span></span
                        >`
                      : html`<span class="day-cell tabular">${day}</span>`
                )}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}
