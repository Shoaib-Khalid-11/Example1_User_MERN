export type AxiosBaseResponse<T extends object = Record<string, never>> = {
  success: boolean;
  message?: string;
  code?: number;
  token?: string;
} & T;
