import { useMutation } from "@tanstack/react-query";
import type {
  ForgotPasswordFormData,
  LoginInFormData,
  RegistrationFormData,
} from "components/forms/schemas";
import { AuthService } from "services";

const authService = new AuthService();
export const useLoginApi = () => {
  const { isPending, error, data, mutate, isSuccess } = useMutation({
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
  };
};
export const useRegisterApi = () => {
  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (inputs: RegistrationFormData) =>
      authService.register("/users/register", inputs),
  });
  return {
    getRegisterLoading: isPending,
    getRegisterError: error,
    getRegisterData: data,
    mutateRegister: mutate,
  };
};

export const useForgotPasswordApi = () => {
  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (inputs: ForgotPasswordFormData) =>
      authService.forgotPassword("/users/forgot/password", inputs),
  });
  return {
    getForgotPasswordLoading: isPending,
    getForgotPasswordError: error,
    getForgotPasswordData: data,
    mutateForgotPassword: mutate,
  };
};
