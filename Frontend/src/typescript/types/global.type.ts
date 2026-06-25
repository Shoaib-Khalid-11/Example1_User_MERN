export type TReactNode = React.ReactNode;
export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ApiBaseResponse<T = unknown> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
};
