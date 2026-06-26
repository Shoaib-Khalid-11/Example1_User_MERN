import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import {
  resetFilters,
  setCurrentPage,
  setFilterRole,
  setFilterStatus,
  setItemsPerPage,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  setUsers,
  toggleSortOrder,
  userSelector,
} from "store/slices";
import type { IUserApi } from "typescript/api/interface";
import type {
  FilterRole,
  FilterStatus,
  SortBy,
  SortOrder,
} from "typescript/types";

export const useUserSliceStore_Hook = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userSelector);

  const getUserStateSelector = useMemo(() => userState, [userState]);
  const setUsersDispatched = useCallback(
    (users: IUserApi[]) => {
      dispatch(setUsers(users));
    },
    [dispatch],
  );
  const setSearchTermDispatched = useCallback(
    (term: string) => {
      dispatch(setSearchTerm(term));
    },
    [dispatch],
  );
  const setCurrentPageDispatched = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch],
  );
  const setItemsPerPageDispatched = useCallback(
    (items: number) => {
      dispatch(setItemsPerPage(items));
    },
    [dispatch],
  );
  const setFilterRoleDispatched = useCallback(
    (role: FilterRole) => {
      dispatch(setFilterRole(role));
    },
    [dispatch],
  );
  const setFilterStatusDispatched = useCallback(
    (status: FilterStatus) => {
      dispatch(setFilterStatus(status));
    },
    [dispatch],
  );
  const setSortByDispatched = useCallback(
    (by: SortBy) => {
      dispatch(setSortBy(by));
    },
    [dispatch],
  );
  const setSortOrderDispatched = useCallback(
    (order: SortOrder) => {
      dispatch(setSortOrder(order));
    },
    [dispatch],
  );
  const setToggleSortOrderDispatched = useCallback(() => {
    dispatch(toggleSortOrder());
  }, [dispatch]);
  const resetFiltersDispatched = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return {
    getUserStateSelector,
    setUsersDispatched,
    setSearchTermDispatched,
    setCurrentPageDispatched,
    setItemsPerPageDispatched,
    setFilterRoleDispatched,
    setFilterStatusDispatched,
    setSortByDispatched,
    setSortOrderDispatched,
    setToggleSortOrderDispatched,
    resetFiltersDispatched,
  };
};
