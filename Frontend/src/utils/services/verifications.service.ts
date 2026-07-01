import type { GetVerificationResponse } from "typescript/api/types";
import { ApiBaseService } from "./api_base.service";

export class VerificationsService extends ApiBaseService {
  public varifyEmailVerificationCode(
    path: string,
  ): Promise<GetVerificationResponse> {
    return this.get(path);
  }
}
