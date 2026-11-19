import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { GridMetricItem, GridMetricsCardConfig } from '../types';

@customElement('eink-grid-metrics-editor')
export class EinkGridMetricsEditor extends BaseEditor<GridMetricsCardConfig> {
  protected getFormData(): Record<string, any> {
    const metrics = this._config?.metrics || [];
    const data: Record<string, any> = {
      columns: String(this._config?.columns || 3),
      inverted: Boolean(this._config?.inverted)
    };
    if (this._config?.title) {
      data.title = this._config.title;
    }
    for (let i = 0; i < 4; i++) {
      const idx = i + 1;
      if (metrics[i]?.entity) {
        data[`metric_${idx}`] = metrics[i].entity;
      }
      if (metrics[i]?.name) {
        data[`metric_${idx}_name`] = metrics[i].name;
      }
    }
    return data;
  }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass || !ev.detail?.value) return;
    const value = ev.detail.value;
    const prevMetrics = this._config.metrics || [];

    const updatedSlots: GridMetricItem[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = i + 1;
      const entity = value[`metric_${idx}`];
      if (!entity) continue;
      const prev = prevMetrics[i];
      const item: GridMetricItem = {
        ...(prev || {}),
        entity
      };
      const nameVal = value[`metric_${idx}_name`];
      if (nameVal) {
        item.name = nameVal;
      } else {
        delete item.name;
      }
      updatedSlots.push(item);
    }

    const nextConfig: GridMetricsCardConfig = {
      ...this._config,
      columns: Number(value.columns) || 3,
      inverted: Boolean(value.inverted),
      metrics: [...updatedSlots, ...prevMetrics.slice(4)]
    };

    if (value.title) {
      nextConfig.title = value.title;
    } else {
      delete nextConfig.title;
    }

    this._config = nextConfig;
    this.fireConfigChanged();
  }

  protected getSchema(): any[] {
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
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' }
            ]
          }
        }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      },
      ...[1, 2, 3, 4].flatMap(idx => [
        {
          name: `metric_${idx}`,
          label: `${this.t('common.entity')} ${idx}`,
          selector: { entity: {} }
        },
        {
          name: `metric_${idx}_name`,
          label: `${this.t('common.name')} ${idx}`,
          selector: { text: {} }
        }
      ])
    ];
  }
}
