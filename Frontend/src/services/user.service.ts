import { ApiBaseService } from "./api_base.service";

export class UserService extends ApiBaseService {
  public getAllUsers(): Promise<unknown> {
    return this.get();
  }
}
