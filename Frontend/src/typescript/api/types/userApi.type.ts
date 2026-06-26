import type { IUserApi } from "../interface";
import type { AxiosBaseResponse } from "./axios_base.type";

export type GetUsersResponse = AxiosBaseResponse<{
  users: IUserApi[];
}>;
