import type {
  ChangePasswordFormData,
  UserFormUpdateData,
} from "components/forms/schemas";
import { ApiBaseService } from "./api_base.service";
import { store } from "store";
import type {
  GetUserByIDResponse,
  GetUsersResponse,
} from "typescript/api/types";

export class UserService extends ApiBaseService {
  constructor() {
    super({
      getAccessToken: () => store.getState().auth.token, // 👈 Redux Toolkit way
    });
  }
  public getAllUsers(path: string): Promise<GetUsersResponse> {
    return this.get<GetUsersResponse>(path);
  }
  public getUserByID(path: string): Promise<GetUserByIDResponse> {
    return this.get<GetUserByIDResponse>(path);
  }
  public setUserByIDUpdate(
    path: string,
    inputs: UserFormUpdateData,
  ): Promise<GetUserByIDResponse> {
    return this.put<GetUserByIDResponse>(path, inputs);
  }
  public setUserPasswordUpdate(
    path: string,
    inputs: ChangePasswordFormData,
  ): Promise<GetUserByIDResponse> {
    return this.put<GetUserByIDResponse>(path, inputs);
  }
  public deleteUserByID(path: string): Promise<void> {
    return this.delete<void>(path);
  }
}
