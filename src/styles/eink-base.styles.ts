import { css } from 'lit';

export const einkBaseStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    --eink-bg: #ffffff;
    --eink-fg: #000000;
    --eink-border-color: #000000;
    --eink-border-width: 1px;
    --eink-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  :host([inverted]) {
    --eink-bg: #000000;
    --eink-fg: #ffffff;
    --eink-border-color: #ffffff;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    transition: none !important;
    animation: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .eink-card {
    background-color: var(--eink-bg);
    color: var(--eink-fg);
    border: var(--eink-border-width) solid var(--eink-border-color);
    padding: 16px;
    font-family: var(--eink-font-family);
    line-height: 1.2;
    text-rendering: geometricPrecision;
  }

  .eink-card.inverted {
    background-color: #000000;
    color: #ffffff;
    border-color: #ffffff;
  }

  .tabular {
    font-variant-numeric: tabular-nums;
  }

  ha-icon {
    color: currentColor;
    opacity: 1 !important;
    --mdc-icon-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .eink-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--eink-border-color);
    padding-bottom: 4px;
  }

  .eink-badge-inverted {
    background-color: var(--eink-fg);
    color: var(--eink-bg);
    padding: 2px 6px;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    display: inline-block;
  }

  .eink-solid-divider {
    border: none;
    border-top: 1px solid var(--eink-border-color);
    margin: 8px 0;
  }
`;
