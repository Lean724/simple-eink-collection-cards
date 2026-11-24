import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { ForecastCardConfig } from '../types';

@customElement('eink-forecast-editor')
export class EinkForecastEditor extends BaseEditor<ForecastCardConfig> {
  protected getFormData(): Record<string, any> {
    if (!this._config) return {};
    return {
      ...this._config,
      layout: this._config.layout || 'horizontal',
      extra_attribute: this._config.extra_attribute || 'humidity'
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
        name: 'entity',
        label: this.t('common.entity'),
        selector: { entity: { domain: 'weather' } }
      },
      {
        name: 'layout',
        label: this.t('forecast.layout'),
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'horizontal', label: this.t('forecast.layout_horizontal') },
              { value: 'vertical', label: this.t('forecast.layout_vertical') }
            ]
          }
        }
      },
      {
        name: 'location',
        label: this.t('forecast.location'),
        selector: { text: {} }
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
              { value: 'none', label: this.t('forecast.extra_none') },
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
