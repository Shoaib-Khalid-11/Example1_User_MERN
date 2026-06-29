import { useQuery } from "@tanstack/react-query";
import type { GetVerificationResponse } from "typescript/api/types";
import { VerificationsService } from "utils/services";

const verificationService = new VerificationsService();

export const useVarifyEmailApi = (token: string) => {
  const { isPending, error, data, isSuccess, isError } =
    useQuery<GetVerificationResponse>({
      queryKey: ["varificationCode", token],
      queryFn: () =>
        verificationService.varifyEmailVerificationCode(
          `/verifications/verify-email/${token}`,
        ),
      enabled: !!token,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  return {
    verifyEmailLoading: isPending,
    verifyEmailErrorMessage: error,
    verifyEmailData: data,
    verifyEmailIsSuccess: isSuccess,
    verifyEmailIsError: isError,
  };
};
