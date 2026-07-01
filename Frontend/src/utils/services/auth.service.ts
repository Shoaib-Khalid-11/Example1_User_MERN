import type {
  ForgotPasswordFormData,
  LoginInFormData,
  RegistrationFormData,
} from "components/forms/schemas";
import { ApiBaseService } from "./api_base.service";
import type {
  SetUserForgotPasswordResponse,
  SetUserLoginResponse,
  SetUserRegisterResponse,
} from "typescript/api/types";

export class AuthService extends ApiBaseService {
  public login(
    path: string,
    inputs: LoginInFormData,
  ): Promise<SetUserLoginResponse> {
    return this.post<SetUserLoginResponse>(path, inputs);
  }
  public register(
    path: string,
    inputs: RegistrationFormData,
  ): Promise<SetUserRegisterResponse> {
    return this.post<SetUserRegisterResponse>(path, inputs);
  }
  public forgotPassword(
    path: string,
    inputs: ForgotPasswordFormData,
  ): Promise<SetUserForgotPasswordResponse> {
    return this.post<SetUserForgotPasswordResponse>(path, inputs);
  }
}
