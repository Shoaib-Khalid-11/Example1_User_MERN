import { useQuery } from "@tanstack/react-query";
import type { GetUsersResponse } from "typescript/api/types";
import { UserService } from "utils/services";

const userService = new UserService();

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
