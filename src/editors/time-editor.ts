import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { TimeCardConfig } from '../types';

@customElement('eink-time-editor')
export class EinkTimeEditor extends BaseEditor<TimeCardConfig> {
  protected getSchema(): any[] {
    return [
      {
        name: 'title',
        label: this.t('common.title'),
        selector: { text: {} }
      },
      {
        name: 'time_format',
        label: this.t('time.time_format'),
        selector: {
          select: {
            options: [
              { value: '24h', label: '24h (14:30)' },
              { value: '12h', label: '12h (2:30 PM)' }
            ]
          }
        }
      },
      {
        name: 'show_date',
        label: this.t('time.show_date'),
        selector: { boolean: {} }
      },
      {
        name: 'date_format',
        label: this.t('time.date_format'),
        selector: {
          select: {
            options: [
              { value: 'long', label: this.t('time.date_long') },
              { value: 'short', label: this.t('time.date_short') },
              { value: 'combined', label: this.t('time.date_combined') }
            ]
          }
        }
      },
      {
        name: 'timezone',
        label: this.t('time.timezone'),
        selector: { text: {} }
      },
      {
        name: 'entity_1',
        label: this.t('time.secondary_entity_1'),
        selector: { entity: {} }
      },
      {
        name: 'entity_2',
        label: this.t('time.secondary_entity_2'),
        selector: { entity: {} }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      }
    ];
  }
}
