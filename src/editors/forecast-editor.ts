import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { ForecastCardConfig } from '../types';

@customElement('eink-forecast-editor')
export class EinkForecastEditor extends BaseEditor<ForecastCardConfig> {
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
        selector: { entity: { domain: 'weather' } }
      },
      {
        name: 'days_to_show',
        label: this.t('forecast.days_to_show'),
        selector: { number: { min: 2, max: 7, mode: 'box' } }
      },
      {
        name: 'extra_attribute',
        label: this.t('forecast.extra_attribute'),
        selector: {
          select: {
            options: [
              { value: 'humidity', label: this.t('forecast.extra_humidity') },
              { value: 'pressure', label: this.t('forecast.extra_pressure') },
              { value: 'wind_speed', label: this.t('forecast.extra_wind_speed') },
              { value: 'precipitation', label: this.t('forecast.extra_precipitation') }
            ]
          }
        }
      },
      {
        name: 'extra_attribute_label',
        label: this.t('common.name'),
        selector: { text: {} }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      }
    ];
  }
}
