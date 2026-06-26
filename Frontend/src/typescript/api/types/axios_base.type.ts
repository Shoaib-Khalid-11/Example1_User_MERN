export type AxiosBaseResponse<T extends object = object> = {
  success: boolean;
  message?: string;
  code?: number;
  token?: string;
} & T;
