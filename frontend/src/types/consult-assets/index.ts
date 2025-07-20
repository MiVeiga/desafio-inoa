export interface StockQueryParams {
  symbols: string[];
  from: string;
  to: string;
}

export interface StockDataPoint {
  date: string;
  close: number;
}

export interface StockApiResponse {
  [symbol: string]: StockDataPoint[];
}

export interface ChartDataPoint {
  date: string;
  [symbol: string]: string | number | null;
}

export interface AssetsFilterProps {
  onSubmit: (assets: string, startDate: string, endDate: string) => void;
  loading: boolean;
  error?: string;
  onClearError?: () => void;
}

export interface AssetsChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AssetsValidation {
  assets: ValidationError[];
  startDate: ValidationError[];
  endDate: ValidationError[];
}
