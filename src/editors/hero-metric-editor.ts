import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { HeroMetricCardConfig } from '../types';

@customElement('eink-hero-metric-editor')
export class EinkHeroMetricEditor extends BaseEditor<HeroMetricCardConfig> {
  protected getSchema(): any[] {
    const schema: any[] = [
      {
        name: 'entity',
        label: this.t('common.entity'),
        selector: { entity: {} }
      }
    ];

    if (this._config?.entity) {
      schema.push({
        name: 'attribute',
        label: this.t('common.attribute'),
        selector: {
          attribute: {
            entity_id: this._config.entity
          }
        }
      });
    }

    schema.push(
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
        name: 'show_trend',
        label: this.t('hero_metric.show_trend'),
        selector: { boolean: {} }
      },
      {
        name: 'trend_value',
        label: this.t('hero_metric.trend_value'),
        selector: { text: {} }
      },
      {
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      }
    );

    return schema;
  }
}
