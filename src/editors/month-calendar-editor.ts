import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { MonthCalendarCardConfig } from '../types';

@customElement('eink-month-calendar-editor')
export class EinkMonthCalendarEditor extends BaseEditor<MonthCalendarCardConfig> {
  protected getFormData(): Record<string, any> {
    if (!this._config) return {};
    const { entity: legacyEntity, ...rest } = this._config;
    const entities =
      Array.isArray(this._config.entities) && this._config.entities.length > 0
        ? this._config.entities
        : legacyEntity
          ? [legacyEntity]
          : [];

    return {
      ...rest,
      entities,
      first_day_of_week: this._config.first_day_of_week || 'monday',
      time_format: this._config.time_format || 'auto',
      show_week_numbers: this._config.show_week_numbers !== false,
      max_events: this._config.max_events || 2
    };
  }

  protected getSchema(): any[] {
    return [
      {
        name: 'title',
        label: this.t('common.title'),
        selector: { text: {} }
      },
      {
        name: 'entities',
        label: this.t('month_calendar.entities'),
        selector: { entity: { domain: 'calendar', multiple: true } }
      },
      {
        name: 'first_day_of_week',
        label: this.t('month_calendar.first_day_of_week'),
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'monday', label: this.t('month_calendar.monday') },
              { value: 'sunday', label: this.t('month_calendar.sunday') }
            ]
          }
        }
      },
      {
        name: 'time_format',
        label: this.t('time.time_format'),
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'auto', label: 'Auto (Home Assistant)' },
              { value: '24h', label: '24h (14:30)' },
              { value: '12h', label: '12h (2:30 PM)' }
            ]
          }
        }
      },
      {
        name: 'show_week_numbers',
        label: this.t('month_calendar.show_week_numbers'),
        selector: { boolean: {} }
      },
      {
        name: 'max_events',
        label: this.t('month_calendar.max_events'),
        selector: { number: { min: 1, max: 5, mode: 'box' } }
      },
      {
        name: 'timezone',
        label: this.t('time.timezone'),
        selector: { text: {} }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      },
      {
        name: 'tap_action',
        label: this.t('common.tap_action'),
        selector: { ui_action: {} }
      },
      {
        name: 'double_tap_action',
        label: this.t('common.double_tap_action'),
        selector: { ui_action: {} }
      },
      {
        name: 'hold_action',
        label: this.t('common.hold_action'),
        selector: { ui_action: {} }
      }
    ];
  }
}
