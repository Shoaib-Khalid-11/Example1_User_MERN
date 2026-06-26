/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosInstance,
} from "axios";
import { appConfig } from "configs";

import { store } from "store";
import { setToken } from "store/slices";

export interface ApiServiceConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  getAccessToken?: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void;
  onError?: (error: AxiosError) => void;
  onTokenRefresh?: () => Promise<string | null>;
}

export class ApiBaseService {
  protected readonly axiosInstance: AxiosInstance;
  protected readonly getAccessToken?: () =>
    | string
    | null
    | Promise<string | null>;
  protected readonly onUnauthorized?: () => void;
  protected readonly onError?: (error: AxiosError) => void;
  protected readonly onTokenRefresh?: () => Promise<string | null>;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(config?: ApiServiceConfig) {
    const {
      getAccessToken,
      onUnauthorized,
      onError,
      onTokenRefresh,
      ...axiosConfig
    } = config || {};

    this.getAccessToken = getAccessToken || this.getTokenFromStore;
    this.onUnauthorized = onUnauthorized; // || this.handleUnauthorized;
    this.onError = onError;
    this.onTokenRefresh = onTokenRefresh; // || this.refreshTokenFromStore;

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

  private getTokenFromStore(): string | null {
    const state = store.getState();
    return state.auth.token;
  }

  // private async refreshTokenFromStore(): Promise<string | null> {
  //   try {
  //     const result = await store.dispatch(refreshToken()).unwrap();
  //     return result.token || null;
  //   } catch {
  //     return null;
  //   }
  // }

  // private handleUnauthorized(): void {
  //   store.dispatch(logout());
  //   Redirect to login page or show login modal
  //   router.navigate('/login');
  // }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await this.getAccessToken?.();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor with token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // If error is not 401 or request already retried, reject
        if (error.response?.status !== 401 || originalRequest._retry) {
          if (this.onError) {
            this.onError(error);
          }
          return Promise.reject(error);
        }

        // If token refresh is in progress, queue the request
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.refreshSubscribers.push((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(this.axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        this.isRefreshing = true;

        try {
          const newToken = await this.onTokenRefresh?.();

          if (newToken) {
            // Store token in Redux
            store.dispatch(setToken(newToken));

            // Update Authorization header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Process queued requests
            this.refreshSubscribers.forEach((callback) => callback(newToken));
            this.refreshSubscribers = [];

            // Retry original request
            return this.axiosInstance(originalRequest);
          } else {
            // Token refresh failed
            // this.handleUnauthorized();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // this.handleUnauthorized();
          return Promise.reject(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      },
    );
  }

  // HTTP Methods
  protected get<T, R = T>(path = "", config?: AxiosRequestConfig): Promise<R> {
    return this.request<T, R>("GET", path, undefined, config);
  }

  protected post<T, R = T>(
    path = "",
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("POST", path, data, config);
  }

  protected put<T, R = T>(
    path = "",
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("PUT", path, data, config);
  }

  protected patch<T, R = T>(
    path = "",
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("PATCH", path, data, config);
  }

  protected delete<T, R = T>(
    path = "",
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.request<T, R>("DELETE", path, undefined, config);
  }

  private async request<T, R = T>(
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

      // Return data directly or wrapped in ApiBaseResponse
      return response.data as R;
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
      statusText: error.response?.statusText,
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

  protected requestCustom<T, R = T>(config: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance
      .request<R>(config)
      .then((response) => response.data);
  }
}

// Create singleton instance
// export const apiService = new ApiBaseService();
