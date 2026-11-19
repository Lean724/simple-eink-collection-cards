import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { AlertBannerCardConfig } from '../types';

@customElement('eink-alert-banner-editor')
export class EinkAlertBannerEditor extends BaseEditor<AlertBannerCardConfig> {
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
        selector: { entity: {} }
      },
      {
        name: 'condition',
        label: this.t('common.condition'),
        selector: {
          select: {
            options: [
              { value: 'on', label: this.t('conditions.on') },
              { value: 'off', label: this.t('conditions.off') },
              { value: 'equals', label: this.t('conditions.equals') },
              { value: 'not_equals', label: this.t('conditions.not_equals') },
              { value: 'above', label: this.t('conditions.above') },
              { value: 'below', label: this.t('conditions.below') }
            ]
          }
        }
      },
      {
        name: 'value',
        label: this.t('common.value'),
        selector: { text: {} }
      },
      {
        name: 'message',
        label: this.t('alert_banner.message'),
        selector: { text: {} }
      },
      {
        name: 'icon',
        label: this.t('common.icon'),
        selector: { icon: {} }
      }
    ];
  }
}
