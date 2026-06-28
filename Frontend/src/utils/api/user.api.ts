import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ChangePasswordFormData,
  UserFormUpdateData,
} from "components/forms/schemas";
import type {
  GetUserByIDResponse,
  GetUsersResponse,
} from "typescript/api/types";
import { UserService } from "utils/services";

const userService = new UserService();
//? ----------------------------------------All Users----------------------------------------------------
export const useAllUsersApi = () => {
  const { isPending, error, data, isSuccess } = useQuery<GetUsersResponse>({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers("/users/all"),
  });
  return {
    getAllUsersLoading: isPending,
    getAllUsersError: error,
    getAllUsersData: data,
    getisSuccessAllUsers: isSuccess,
  };
};
//? ----------------------------------------User By ID----------------------------------------------------
export const useUserByIDApi = (id: string) => {
  const { isPending, error, data, isSuccess } = useQuery<GetUserByIDResponse>({
    queryKey: ["user", id],
    queryFn: () => userService.getUserByID(`/users/profile/${id}`),
    enabled: !!id,
  });
  return {
    getUserByIDLoading: isPending,
    getUserByIDError: error,
    getUserByIDData: data,
    getisSuccessUserByID: isSuccess,
  };
};
//? ----------------------------------------User Update By ID----------------------------------------------------
export const useUserByIDUpdateApi = (id: string) => {
  const queryClient = useQueryClient();

  const { isPending, error, data, mutate, isSuccess } = useMutation<
    GetUserByIDResponse,
    Error,
    UserFormUpdateData,
    unknown
  >({
    mutationKey: ["user/update", id],
    mutationFn: (inputs) =>
      userService.setUserByIDUpdate(`/users/update/profile/${id}`, inputs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  return {
    getUserByIDUpdateLoading: isPending,
    getUserByIDUpdateError: error,
    getUserByIDUpdateData: data,
    mutateUserByIDUpdate: mutate,
    getisSuccessUserByIDUpdate: isSuccess,
  };
};
//? ----------------------------------------User Update By ID Password------------------------------------------------//
export const useUserByIDUpdatePasswordApi = (id: string) => {
  const queryClient = useQueryClient();

  const { isPending, error, data, mutate, isSuccess } = useMutation<
    GetUserByIDResponse,
    Error,
    ChangePasswordFormData
  >({
    mutationKey: ["user/update-password", id],
    mutationFn: (inputs) =>
      userService.setUserPasswordUpdate(`/users/update/password/${id}`, inputs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", id],
      });
    },
  });
  return {
    getUserByIDUpdatePasswordLoading: isPending,
    getUserByIDUpdatePasswordError: error,
    getUserByIDUpdatePasswordData: data,
    mutateUserByIDUpdatePassword: mutate,
    getisSuccessUserByIDUpdatePassword: isSuccess,
  };
};
//? ----------------------------------------User Delete By ID----------------------------------------------------
export const useDeleteUserByIDApi = () => {
  const queryClient = useQueryClient();

  const { isPending, error, data, mutate, isSuccess } = useMutation<
    void,
    Error,
    string
  >({
    mutationKey: ["user/delete"],
    mutationFn: (id: string) =>
      userService.deleteUserByID(`/users/delete/profile/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  return {
    deleteUserByIDLoading: isPending,
    deleteUserByIDError: error,
    deleteUserByIDData: data,
    mutateDeleteUserByID: mutate,
    getisSuccessDeleteUserByID: isSuccess,
  };
};
