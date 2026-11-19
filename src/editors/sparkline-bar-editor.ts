import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { SparklineBarCardConfig } from '../types';

@customElement('eink-sparkline-bar-editor')
export class EinkSparklineBarEditor extends BaseEditor<SparklineBarCardConfig> {
  protected getSchema(): any[] {
    return [
      {
        name: 'entity',
        label: this.t('common.entity'),
        selector: { entity: {} }
      },
      {
        name: 'name',
        label: this.t('common.name'),
        selector: { text: {} }
      },
      {
        name: 'unit',
        label: this.t('common.unit'),
        selector: { text: {} }
      },
      {
        name: 'hours_to_show',
        label: this.t('sparkline_bar.hours_to_show'),
        selector: { number: { min: 1, max: 168, mode: 'box' } }
      },
      {
        name: 'chart_type',
        label: this.t('sparkline_bar.chart_type'),
        selector: {
          select: {
            options: [
              { value: 'bars', label: this.t('sparkline_bar.chart_bars') },
              { value: 'line', label: this.t('sparkline_bar.chart_line') }
            ]
          }
        }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      }
    ];
  }
}
