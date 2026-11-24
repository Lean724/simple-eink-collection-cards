import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ActionConfig, HomeAssistant, EinkBaseConfig, HassEntity } from '../types';
import { einkBaseStyles } from '../styles/eink-base.styles';
import { localize } from '../localize/localize';

export abstract class BaseEinkCard<T extends EinkBaseConfig = EinkBaseConfig> extends LitElement {
  public static styles = [einkBaseStyles];

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  protected config!: T;

  private _holdTimer?: ReturnType<typeof setTimeout>;
  private _dblTapTimer?: ReturnType<typeof setTimeout>;
  private _holdFired = false;

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearActionTimers();
  }

  private clearActionTimers(): void {
    if (this._holdTimer !== undefined) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
    if (this._dblTapTimer !== undefined) {
      clearTimeout(this._dblTapTimer);
      this._dblTapTimer = undefined;
    }
    this._holdFired = false;
  }

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

  protected buildActionConfig(defaultEntity?: string): Record<string, any> {
    const configEntity = defaultEntity ?? (this.config as any)?.entity;
    const defaultTapAction: ActionConfig = configEntity
      ? { action: 'more-info' }
      : { action: 'none' };

    return {
      ...this.config,
      ...(configEntity ? { entity: configEntity } : {}),
      tap_action: this.config?.tap_action ?? defaultTapAction,
      ...(this.config?.double_tap_action ? { double_tap_action: this.config.double_tap_action } : {}),
      ...(this.config?.hold_action ? { hold_action: this.config.hold_action } : {})
    };
  }

  protected hasActiveActions(defaultEntity?: string): boolean {
    const actionCfg = this.buildActionConfig(defaultEntity);
    return (
      actionCfg.tap_action?.action !== 'none' ||
      (actionCfg.double_tap_action && actionCfg.double_tap_action.action !== 'none') ||
      (actionCfg.hold_action && actionCfg.hold_action.action !== 'none')
    );
  }

  protected triggerHassAction(
    actionType: 'tap' | 'double_tap' | 'hold',
    defaultEntity?: string
  ): void {
    const actionConfig = this.buildActionConfig(defaultEntity);
    const selected: ActionConfig | undefined =
      actionType === 'tap'
        ? actionConfig.tap_action
        : actionType === 'double_tap'
          ? actionConfig.double_tap_action
          : actionConfig.hold_action;

    if (!selected || selected.action === 'none') {
      return;
    }

    const event = new CustomEvent('hass-action', {
      bubbles: true,
      composed: true,
      detail: {
        config: actionConfig,
        action: actionType
      }
    });
    this.dispatchEvent(event);
  }

  protected handleActionPointerDown(ev?: PointerEvent, defaultEntity?: string): void {
    if (ev && typeof ev.button === 'number' && ev.button !== 0) return;
    if (this._holdTimer !== undefined) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
    this._holdFired = false;

    const holdAction = this.config?.hold_action;
    if (!holdAction || holdAction.action === 'none') return;

    this._holdTimer = setTimeout(() => {
      this._holdTimer = undefined;
      this._holdFired = true;
      this.triggerHassAction('hold', defaultEntity);
    }, 500);
  }

  protected handleActionPointerEnd(): void {
    if (this._holdTimer !== undefined) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  }

  protected handleActionClick(ev?: Event, defaultEntity?: string): void {
    if (ev?.defaultPrevented) return;
    if (this._holdFired) {
      this._holdFired = false;
      return;
    }

    const doubleTapAction = this.config?.double_tap_action;
    if (doubleTapAction && doubleTapAction.action !== 'none') {
      if (this._dblTapTimer !== undefined) {
        clearTimeout(this._dblTapTimer);
        this._dblTapTimer = undefined;
        this.triggerHassAction('double_tap', defaultEntity);
      } else {
        this._dblTapTimer = setTimeout(() => {
          this._dblTapTimer = undefined;
          this.triggerHassAction('tap', defaultEntity);
        }, 250);
      }
      return;
    }

    this.triggerHassAction('tap', defaultEntity);
  }
}
