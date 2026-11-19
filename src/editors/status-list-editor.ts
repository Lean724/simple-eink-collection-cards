import { customElement } from 'lit/decorators.js';
import { BaseEditor } from './base-editor';
import { StatusListCardConfig } from '../types';

@customElement('eink-status-list-editor')
export class EinkStatusListEditor extends BaseEditor<StatusListCardConfig> {
  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;
    const value = ev.detail.value;

    const entities = [
      value.entity_1 ? { entity: value.entity_1, name: value.name_1, icon: value.icon_1, invert_when_active: value.invert_1 !== false } : null,
      value.entity_2 ? { entity: value.entity_2, name: value.name_2, icon: value.icon_2, invert_when_active: value.invert_2 !== false } : null,
      value.entity_3 ? { entity: value.entity_3, name: value.name_3, icon: value.icon_3, invert_when_active: value.invert_3 !== false } : null,
      value.entity_4 ? { entity: value.entity_4, name: value.name_4, icon: value.icon_4, invert_when_active: value.invert_4 !== false } : null,
      value.entity_5 ? { entity: value.entity_5, name: value.name_5, icon: value.icon_5, invert_when_active: value.invert_5 !== false } : null
    ].filter(Boolean) as any[];

    this._config = {
      ...this._config,
      title: value.title,
      inverted: value.inverted,
      entities: entities.length > 0 ? entities : this._config.entities || []
    };

    this.fireConfigChanged();
  }

  protected getSchema(): any[] {
    const list = this._config?.entities || [];
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
      // Item 1
      {
        name: 'entity_1',
        label: `${this.t('common.entity')} 1`,
        default: list[0]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'name_1',
        label: `${this.t('common.name')} 1`,
        default: list[0]?.name,
        selector: { text: {} }
      },
      // Item 2
      {
        name: 'entity_2',
        label: `${this.t('common.entity')} 2`,
        default: list[1]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'name_2',
        label: `${this.t('common.name')} 2`,
        default: list[1]?.name,
        selector: { text: {} }
      },
      // Item 3
      {
        name: 'entity_3',
        label: `${this.t('common.entity')} 3`,
        default: list[2]?.entity,
        selector: { entity: {} }
      },
      {
        name: 'name_3',
        label: `${this.t('common.name')} 3`,
        default: list[2]?.name,
        selector: { text: {} }
      },
      // Item 4
      {
        name: 'entity_4',
        label: `${this.t('common.entity')} 4`,
        default: list[3]?.entity,
        selector: { entity: {} }
      },
      // Item 5
      {
        name: 'entity_5',
        label: `${this.t('common.entity')} 5`,
        default: list[4]?.entity,
        selector: { entity: {} }
      }
    ];
  }
}
