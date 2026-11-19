import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { GridMetricsCardConfig } from '../types';

@customElement('eink-grid-metrics-editor')
export class EinkGridMetricsEditor extends BaseEditor<GridMetricsCardConfig> {
  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;
    const value = ev.detail.value;

    const metrics = [
      value.metric_1 ? { entity: value.metric_1, name: value.metric_1_name, unit: value.metric_1_unit, icon: value.metric_1_icon } : null,
      value.metric_2 ? { entity: value.metric_2, name: value.metric_2_name, unit: value.metric_2_unit, icon: value.metric_2_icon } : null,
      value.metric_3 ? { entity: value.metric_3, name: value.metric_3_name, unit: value.metric_3_unit, icon: value.metric_3_icon } : null,
      value.metric_4 ? { entity: value.metric_4, name: value.metric_4_name, unit: value.metric_4_unit, icon: value.metric_4_icon } : null
    ].filter(Boolean) as any[];

    this._config = {
      ...this._config,
      title: value.title,
      columns: value.columns || 3,
      inverted: value.inverted,
      metrics: metrics.length > 0 ? metrics : this._config.metrics || []
    };

    this.fireConfigChanged();
  }

  protected getSchema(): any[] {
    const metrics = this._config?.metrics || [];
    return [
      {
        name: 'title',
        label: this.t('common.title'),
        selector: { text: {} }
      },
      {
        name: 'columns',
        label: this.t('grid_metrics.columns'),
        selector: {
          select: {
            options: [
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' }
            ]
          }
        }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      },
      // Metric 1
      {
        name: 'metric_1',
        label: `${this.t('common.entity')} 1`,
        default: metrics[0]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'metric_1_name',
        label: `${this.t('common.name')} 1`,
        default: metrics[0]?.name,
        selector: { text: {} }
      },
      // Metric 2
      {
        name: 'metric_2',
        label: `${this.t('common.entity')} 2`,
        default: metrics[1]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'metric_2_name',
        label: `${this.t('common.name')} 2`,
        default: metrics[1]?.name,
        selector: { text: {} }
      },
      // Metric 3
      {
        name: 'metric_3',
        label: `${this.t('common.entity')} 3`,
        default: metrics[2]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'metric_3_name',
        label: `${this.t('common.name')} 3`,
        default: metrics[2]?.name,
        selector: { text: {} }
      },
      // Metric 4
      {
        name: 'metric_4',
        label: `${this.t('common.entity')} 4`,
        default: metrics[3]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'metric_4_name',
        label: `${this.t('common.name')} 4`,
        default: metrics[3]?.name,
        selector: { text: {} }
      }
    ];
  }
}
