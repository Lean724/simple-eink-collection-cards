import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { StatusListCardConfig, StatusListItem } from '../types';

@customElement('eink-status-list-editor')
export class EinkStatusListEditor extends BaseEditor<StatusListCardConfig> {
  protected getFormData(): Record<string, any> {
    const list = this._config?.entities || [];
    const data: Record<string, any> = {
      inverted: Boolean(this._config?.inverted)
    };
    if (this._config?.title) {
      data.title = this._config.title;
    }
    for (let i = 0; i < 5; i++) {
      const idx = i + 1;
      if (list[i]?.entity) {
        data[`entity_${idx}`] = list[i].entity;
      }
      if (list[i]?.name) {
        data[`name_${idx}`] = list[i].name;
      }
    }
    return data;
  }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass || !ev.detail?.value) return;
    const value = ev.detail.value;
    const prevEntities = this._config.entities || [];

    const updatedSlots: StatusListItem[] = [];
    for (let i = 0; i < 5; i++) {
      const idx = i + 1;
      const entity = value[`entity_${idx}`];
      if (!entity) continue;
      const prev = prevEntities[i];
      const item: StatusListItem = {
        ...(prev || {}),
        entity
      };
      const nameVal = value[`name_${idx}`];
      if (nameVal) {
        item.name = nameVal;
      } else {
        delete item.name;
      }
      updatedSlots.push(item);
    }

    const nextConfig: StatusListCardConfig = {
      ...this._config,
      inverted: Boolean(value.inverted),
      entities: [...updatedSlots, ...prevEntities.slice(5)]
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
        name: 'inverted',
        label: this.t('common.inverted'),
        selector: { boolean: {} }
      },
      ...[1, 2, 3, 4, 5].flatMap(idx => [
        {
          name: `entity_${idx}`,
          label: `${this.t('common.entity')} ${idx}`,
          selector: { entity: {} }
        },
        {
          name: `name_${idx}`,
          label: `${this.t('common.name')} ${idx}`,
          selector: { text: {} }
        }
      ])
    ];
  }
}
