import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { ScheduleAgendaCardConfig } from '../types';

@customElement('eink-schedule-agenda-editor')
export class EinkScheduleAgendaEditor extends BaseEditor<ScheduleAgendaCardConfig> {
  protected getSchema(): any[] {
    return [
      {
        name: 'title',
        label: this.t('common.title'),
        selector: { text: {} }
      },
      {
        name: 'entity',
        label: this.t('common.entity'),
        selector: { entity: { domain: 'calendar' } }
      },
      {
        name: 'max_items',
        label: this.t('schedule_agenda.max_items'),
        selector: { number: { min: 1, max: 20, mode: 'box' } }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      }
    ];
  }
}
