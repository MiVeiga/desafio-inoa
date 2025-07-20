
export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface ApiError {
  response?: {
    status: number;
    data?: {
      error?: string;
    };
  };
  code?: string;
  message?: string;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface UseApiReturn<T, TArgs extends unknown[]> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: TArgs) => Promise<T>;
  clearError: () => void;
  clearData: () => void;
}

export type ApiFunction<TArgs extends unknown[], TReturn> = (...args: TArgs) => Promise<TReturn>;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BaseFilter {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface AlertMessageProps {
  open: boolean;
  severity: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
  onClose?: () => void;
} 