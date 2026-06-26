import { ApiBaseService } from "./api_base.service";
import { store } from "store";
import type { GetUsersResponse } from "typescript/api/types";

export class UserService extends ApiBaseService {
  constructor() {
    super({
      getAccessToken: () => store.getState().auth.token, // 👈 Redux Toolkit way
    });
  }
  public getAllUsers(path: string): Promise<GetUsersResponse> {
    return this.get<GetUsersResponse>(path);
  }
}
