import type { IUserApi } from "../interface";
import type { AxiosBaseResponse } from "./axios_base.type";

export type GetUsersResponse = AxiosBaseResponse<{
  users: IUserApi[];
}>;
export type SetUserLoginResponse = AxiosBaseResponse<{
  user: IUserApi;
}>;
export type SetUserRegisterResponse = AxiosBaseResponse<{
  user: IUserApi;
}>;
export type SetUserForgotPasswordResponse = AxiosBaseResponse;
export type GetUserByIDResponse = AxiosBaseResponse<{
  user: IUserApi;
}>;
