import { LitElement, html, TemplateResult, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig } from '../types';
import { localize } from '../localize/localize';

export abstract class BaseEditor<T extends LovelaceCardConfig = LovelaceCardConfig> extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  protected _config!: T;

  public static styles = css`
    ha-form {
      display: block;
      margin-bottom: 16px;
    }
  `;

  public setConfig(config: T): void {
    this._config = { ...config };
  }

  protected getLanguage(): string {
    return this.hass?.locale?.language || this.hass?.language || 'en';
  }

  protected t(key: string): string {
    return localize(key, this.getLanguage());
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as any;
    if (target && target.tagName === 'HA-FORM') {
      this._config = { ...this._config, ...ev.detail.value };
      this.fireConfigChanged();
    }
  }

  protected fireConfigChanged(): void {
    const event = new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: this._config }
    });
    this.dispatchEvent(event);
  }

  protected abstract getSchema(): any[];

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.getSchema()}
        .computeLabel=${(schema: any) => schema.label || this.t(schema.name) || schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
