import type {
  ForgotPasswordFormData,
  LoginInFormData,
  RegistrationFormData,
} from "components/forms/schemas";
import { ApiBaseService } from "./api_base.service";
import type { IUserApi } from "typescript/api/interface";
import type { SetUserLoginResponse } from "typescript/api/types";

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
  ): Promise<IUserApi> {
    return this.post<IUserApi>(path, inputs);
  }
  public forgotPassword(
    path: string,
    inputs: ForgotPasswordFormData,
  ): Promise<unknown> {
    return this.post(path, inputs);
  }
}
