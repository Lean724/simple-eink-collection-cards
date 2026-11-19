export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: {
    language: string;
    number_format?: string;
    time_format?: string;
    date_format?: string;
  };
  themes?: any;
  localize?: (key: string, ...args: any[]) => string;
  callWS?: <T>(msg: { type: string; [key: string]: any }) => Promise<T>;
  callApi?: <T>(method: string, path: string, parameters?: any) => Promise<T>;
  callService?: (domain: string, service: string, serviceData?: any) => Promise<any>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface EinkBaseConfig extends LovelaceCardConfig {
  title?: string;
  inverted?: boolean;
}

export interface HeroMetricCardConfig extends EinkBaseConfig {
  entity: string;
  attribute?: string;
  name?: string;
  unit?: string;
  show_trend?: boolean;
  trend_value?: string;
  trend_inverted?: boolean;
}

export interface GridMetricItem {
  entity: string;
  attribute?: string;
  name?: string;
  unit?: string;
  icon?: string;
}

export interface GridMetricsCardConfig extends EinkBaseConfig {
  metrics: GridMetricItem[];
  columns?: number;
}

export interface StatusListItem {
  entity: string;
  name?: string;
  icon?: string;
  active_state?: string;
  invert_when_active?: boolean;
}

export interface StatusListCardConfig extends EinkBaseConfig {
  entities: StatusListItem[];
}

export interface AlertBannerCardConfig extends EinkBaseConfig {
  entity: string;
  attribute?: string;
  condition?: 'equals' | 'not_equals' | 'above' | 'below' | 'on' | 'off';
  value?: string | number;
  message?: string;
  icon?: string;
  invert_color?: boolean;
}

export interface SparklineBarCardConfig extends EinkBaseConfig {
  entity: string;
  attribute?: string;
  hours_to_show?: number;
  chart_type?: 'bars' | 'line';
  stroke_width?: number;
  height?: number;
}

export interface ScheduleAgendaCardConfig extends EinkBaseConfig {
  entity: string;
  max_items?: number;
  date_format?: 'auto' | '24h' | '12h';
}

export interface TimeCardConfig extends EinkBaseConfig {
  time_format?: '24h' | '12h';
  show_date?: boolean;
  date_format?: 'short' | 'long' | 'combined';
  timezone?: string;
  entity_1?: string;
  entity_2?: string;
}

export interface ForecastCardConfig extends EinkBaseConfig {
  entity: string;
  days_to_show?: number;
  extra_attribute?: string;
  extra_attribute_label?: string;
}

export interface ForecastItem {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  humidity?: number;
  pressure?: number;
  wind_speed?: number;
}
