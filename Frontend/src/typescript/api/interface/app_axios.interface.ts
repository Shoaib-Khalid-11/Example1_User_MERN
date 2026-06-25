import type { AxiosError, CreateAxiosDefaults } from "axios";

export interface ApiServiceConfig extends CreateAxiosDefaults {
  baseURL?: string;
  getAccessToken?: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void;
  onError?: (error: AxiosError) => void;
}
