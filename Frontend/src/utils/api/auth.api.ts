import { useMutation } from "@tanstack/react-query";
import type {
  ForgotPasswordFormData,
  LoginInFormData,
  RegistrationFormData,
} from "components/forms/schemas";
import type {
  SetUserForgotPasswordResponse,
  SetUserLoginResponse,
  SetUserRegisterResponse,
} from "typescript/api/types";
import { AuthService } from "utils/services";

const authService = new AuthService();
export const useLoginApi = () => {
  const { isPending, error, data, mutate, isSuccess, isError } = useMutation<
    SetUserLoginResponse,
    Error,
    LoginInFormData
  >({
    mutationKey: ["login"],
    mutationFn: (inputs: LoginInFormData) =>
      authService.login("/users/login", inputs),
  });
  return {
    getLoginLoading: isPending,
    getLoginError: error,
    getLoginData: data,
    mutateLogin: mutate,
    getisSuccessLogin: isSuccess,
    getisErrorLogin: isError,
  };
};
export const useRegisterApi = () => {
  const { isPending, error, data, mutate, isSuccess, isError } = useMutation<
    SetUserRegisterResponse,
    Error,
    RegistrationFormData
  >({
    mutationKey: ["register"],
    mutationFn: (inputs: RegistrationFormData) =>
      authService.register("/users/register", inputs),
  });
  return {
    getRegisterLoading: isPending,
    getRegisterError: error,
    getRegisterData: data,
    getisSuccessRegister: isSuccess,
    mutateRegister: mutate,
    getisErrorRegister: isError,
  };
};

export const useForgotPasswordApi = () => {
  const { isPending, error, data, mutate, isError, isSuccess } = useMutation<
    SetUserForgotPasswordResponse,
    Error,
    ForgotPasswordFormData
  >({
    mutationKey: ["forgotPassword"],
    mutationFn: (inputs: ForgotPasswordFormData) =>
      authService.forgotPassword("/users/forgot/password", inputs),
  });
  return {
    getForgotPasswordLoading: isPending,
    getForgotPasswordError: error,
    getForgotPasswordData: data,
    mutateForgotPassword: mutate,
    getisSuccessForgotPassword: isSuccess,
    getisErrorForgotPassword: isError,
  };
};
