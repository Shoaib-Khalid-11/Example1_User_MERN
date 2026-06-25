/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosInstance,
} from "axios";
import { appConfig } from "configs";
import type { ApiServiceConfig } from "typescript/api/interface";
import type { ApiBaseResponse } from "typescript/types";

export class ApiBaseService {
  protected readonly axiosInstance: AxiosInstance;
  protected readonly getAccessToken?: () =>
    | string
    | null
    | Promise<string | null>;
  protected readonly onUnauthorized?: () => void;
  protected readonly onError?: (error: AxiosError) => void;

  constructor(config?: ApiServiceConfig) {
    const { getAccessToken, onUnauthorized, onError, ...axiosConfig } =
      config || {};

    this.getAccessToken = getAccessToken;
    this.onUnauthorized = onUnauthorized;
    this.onError = onError;

    this.axiosInstance = axios.create({
      baseURL: config?.baseURL ?? appConfig.apiUrl,
      withCredentials: true,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        ...axiosConfig.headers,
      },
      ...axiosConfig,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (this.getAccessToken) {
          const token = await this.getAccessToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // Handle unauthorized (401)
        if (error.response?.status === 401 && this.onUnauthorized) {
          this.onUnauthorized();
        }

        // Custom error handling
        if (this.onError) {
          this.onError(error);
        }

        return Promise.reject(error);
      },
    );
  }

  protected get<T, R = ApiBaseResponse<T>>(
    path = "",
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("GET", path, undefined, config);
  }

  protected post<T, R = ApiBaseResponse<T>>(
    path = "",
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("POST", path, data, config);
  }

  protected put<T, R = ApiBaseResponse<T>>(
    path = "",
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("PUT", path, data, config);
  }

  protected patch<T, R = ApiBaseResponse<T>>(
    path = "",
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("PATCH", path, data, config);
  }

  protected delete<T, R = ApiBaseResponse<T>>(
    path = "",
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("DELETE", path, undefined, config);
  }

  private async request<T, R = ApiBaseResponse<T>>(
    method: string,
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const url = path.startsWith("/") ? path : `/${path}`;

    try {
      const response = await this.axiosInstance.request<R>({
        method,
        url,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleAxiosError(error);
      }
      throw error;
    }
  }

  protected handleAxiosError(error: AxiosError): Error {
    const responseData = error.response?.data as any;

    const message =
      responseData?.message ||
      responseData?.error ||
      error.message ||
      "Request failed";

    const enhancedError = new Error(message);

    Object.assign(enhancedError, {
      status: error.response?.status,
      data: error.response?.data,
    });

    return enhancedError;
  }
  protected setBaseURL(url: string): void {
    this.axiosInstance.defaults.baseURL = url;
  }

  protected setDefaultHeaders(headers: Record<string, string>): void {
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  protected setDefaultTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }

  // Generic request method for custom HTTP methods
  protected requestCustom<T, R = ApiBaseResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.axiosInstance
      .request<R>(config)
      .then((response) => response.data);
  }
}
