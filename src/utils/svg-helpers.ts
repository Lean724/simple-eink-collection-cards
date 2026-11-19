import { html, svg, TemplateResult } from 'lit';

export interface DataPoint {
  value: number;
  time?: number;
}

export function renderSparklineSVG(
  points: number[],
  chartType: 'bars' | 'line' = 'bars',
  width = 300,
  height = 60,
  color = 'currentColor',
  strokeWidth = 2.5
): TemplateResult {
  if (!points || points.length === 0) {
    return html`<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="display: block;"></svg>`;
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const isFlat = max === min;
  const range = isFlat ? 1 : max - min;
  const paddingY = 4;
  const usableHeight = height - paddingY * 2;
  const normalize = (val: number): number => (isFlat ? 0.5 : (val - min) / range);

  if (chartType === 'bars') {
    const barCount = points.length;
    const gap = 2;
    const totalGap = gap * (barCount - 1);
    const barWidth = Math.max(2, Math.floor((width - totalGap) / barCount));

    return html`
      <svg
        width="100%"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
        shape-rendering="crispEdges"
        style="display: block; overflow: visible;"
      >
        ${points.map((val, idx) => {
          const normalized = normalize(val);
          const barH = Math.max(2, Math.round(normalized * usableHeight));
          const x = idx * (barWidth + gap);
          const y = height - paddingY - barH;
          return svg`<rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" fill="${color}" />`;
        })}
      </svg>
    `;
  }

  // chartType === 'line'
  let pathCoords: string[];
  if (points.length === 1) {
    const y = Math.round(height - paddingY - normalize(points[0]) * usableHeight);
    pathCoords = [`0,${y}`, `${width},${y}`];
  } else {
    const stepX = width / (points.length - 1);
    pathCoords = points.map((val, idx) => {
      const normalized = normalize(val);
      const x = Math.round(idx * stepX);
      const y = Math.round(height - paddingY - normalized * usableHeight);
      return `${x},${y}`;
    });
  }

  return html`
    <svg
      width="100%"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="none"
      shape-rendering="geometricPrecision"
      style="display: block; overflow: visible;"
    >
      ${svg`
        <polyline
          fill="none"
          stroke="${color}"
          stroke-width="${strokeWidth}"
          stroke-linecap="square"
          stroke-linejoin="miter"
          points="${pathCoords.join(' ')}"
        />
      `}
    </svg>
  `;
}
