import { useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  id?: string;
  email?: string;
  role?: string;
  exp: number;
  iat: number;
}

export interface VerifyTokenResult {
  isValid: boolean;
  isExpired: boolean;
  payload: JwtPayload | null;
}

export const useVerifyToken_Hook = (
  token?: string | null,
): VerifyTokenResult => {
  const [now] = useState(() => Date.now());

  return useMemo(() => {
    if (!token) {
      return {
        isValid: false,
        isExpired: true,
        payload: null,
      };
    }

    try {
      const payload = jwtDecode<JwtPayload>(token);

      const isExpired = payload.exp * 1000 < now;

      return {
        isValid: !isExpired,
        isExpired,
        payload,
      };
    } catch {
      return {
        isValid: false,
        isExpired: true,
        payload: null,
      };
    }
  }, [token, now]);
};
