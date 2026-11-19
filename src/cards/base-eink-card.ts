import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { HomeAssistant, EinkBaseConfig, HassEntity } from '../types';
import { einkBaseStyles } from '../styles/eink-base.styles';
import { localize } from '../localize/localize';

export abstract class BaseEinkCard<T extends EinkBaseConfig = EinkBaseConfig> extends LitElement {
  public static styles = [einkBaseStyles];

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  protected config!: T;

  public setConfig(config: T): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = config;
    if (config.inverted) {
      this.setAttribute('inverted', '');
    } else {
      this.removeAttribute('inverted');
    }
  }

  public getCardSize(): number {
    return 1;
  }

  protected getLanguage(): string {
    return this.hass?.locale?.language || this.hass?.language || 'en';
  }

  protected t(key: string): string {
    return localize(key, this.getLanguage());
  }

  protected getEntity(entityId?: string): HassEntity | undefined {
    if (!entityId || !this.hass?.states) return undefined;
    return this.hass.states[entityId];
  }

  protected getEntityState(entityId?: string, attribute?: string): string {
    const ent = this.getEntity(entityId);
    if (!ent) return this.t('common.no_data');
    if (attribute && ent.attributes && attribute in ent.attributes) {
      const val = ent.attributes[attribute];
      return val !== undefined && val !== null ? String(val) : '';
    }
    return ent.state ?? '';
  }

  protected handleMoreInfo(entityId?: string): void {
    if (!entityId) return;
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId }
    });
    this.dispatchEvent(event);
  }
}
