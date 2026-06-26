import { useAllUsersApi } from "utils/api/user.api";

import { useUserSliceStore_Hook } from "hooks";
import type { IUserApi } from "typescript/api/interface";
import { useEffect, useMemo } from "react";
import { AppIcon_Element } from "components/third-party";

export const Home_Page = () => {
  const { getAllUsersData, getAllUsersError, getAllUsersLoading } =
    useAllUsersApi();
  console.log("Users:", getAllUsersData?.users, "Error:", getAllUsersError);
  const {
    getUserStateSelector: {
      users,
      searchTerm,
      filterRole,
      filterStatus,
      sortBy,
      sortOrder,
      currentPage,
      itemsPerPage,
    },
    setUsersDispatched,

    setSearchTermDispatched,
    setCurrentPageDispatched,
    setItemsPerPageDispatched,
    setFilterRoleDispatched,
    // setFilterStatusDispatched,
    setSortByDispatched,
    setSortOrderDispatched,
    // setToggleSortOrderDispatched,
    resetFiltersDispatched,
  } = useUserSliceStore_Hook();
  // setUsersDispatched(getAllUsersData?.users || []);
  useEffect(() => {
    if (getAllUsersData?.users) {
      setUsersDispatched(getAllUsersData.users);
    }
  }, [getAllUsersData?.users, setUsersDispatched]);
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    // Role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // Status filter (isVerified)
    if (filterStatus !== "all") {
      const isVerified = filterStatus === "Active";
      filtered = filtered.filter((user) => user.isVerified === isVerified);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof IUserApi];
      let bVal = b[sortBy as keyof IUserApi];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal! as string).toLowerCase();
      }

      if (aVal! < bVal!) return sortOrder === "asc" ? -1 : 1;
      if (aVal! > bVal!) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, filterRole, filterStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Pagination controls
  // const goToPage = (page: number) => {
  //   setCurrentPageDispatched(Math.max(1, Math.min(page, totalPages)));
  // };

  const getPageNumbers = () => {
    const pages = [];
    const total = Math.min(totalPages, 7);
    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, start + total - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Get status badge color
  const getStatusBadge = (user: IUserApi) => {
    if (user.isVerified) {
      return "badge-success";
    }
    return "badge-warning";
  };

  const getStatusText = (user: IUserApi) => {
    if (user.isVerified) {
      return "Verified";
    }
    return "Pending";
  };

  // // Format date
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };
  if (getAllUsersLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <AppIcon_Element
            icon="lucide:loader"
            className="text-6xl text-primary animate-spin mx-auto mb-4"
          />
          <p className="text-base-content/60">Loading users...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <AppIcon_Element
                  icon="fa-solid:robot"
                  className="text-primary"
                />
                User Management
              </h1>
              <p className="text-base-content/60 mt-1">
                {filteredUsers.length} users found
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                // onClick={() => refetch()}
                // disabled={isFetching}
                className="btn btn-ghost btn-sm relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <AppIcon_Element
                    icon="boxicons:refresh-cw"
                    // className={`${isFetching ? "animate-spin" : ""}`}
                  />
                  {/* {isFetching ? "Refreshing..." : "Refresh"} */}
                </span>
              </button>
              <button className="btn btn-primary btn-sm relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  <AppIcon_Element icon="mynaui:users-group" /> Add User
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {/* {isError && ( */}
        <div className="alert alert-error mb-6 animate-shake">
          <AppIcon_Element icon="boxicons:alert-circle" className="text-lg" />
          <span>
            {/* {error instanceof Error ? error.message : "An error occurred"} */}
          </span>
          <button
            // onClick={() => refetch()}
            className="btn btn-ghost btn-xs"
          >
            Retry
          </button>
        </div>
        {/* )} */}

        {/* Filters Section */}
        <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-base-300/50 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <AppIcon_Element
                icon="lucide:search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTermDispatched(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <AppIcon_Element
                icon="gg:briefcase"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg"
              />
              <select
                value={filterRole}
                onChange={(e) =>
                  setFilterRoleDispatched(
                    e.target.value as "all" | "user" | "admin",
                  )
                }
                className="select select-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            {/* <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  dispatch(
                    setFilterStatus(
                      e.target.value as "all" | "Active" | "Pending",
                    ),
                  )
                }
                className="select select-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="all">All Status</option>
                <option value="Active">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            </div> */}

            {/* Sort */}
            <div className="relative">
              <AppIcon_Element
                icon="solar:filter-outline"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg"
              />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortByDispatched(
                    field as "fullName" | "username" | "role" | "email",
                  );
                  setSortOrderDispatched(order as "asc" | "desc");
                }}
                className="select select-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="fullName-asc">Name A-Z</option>
                <option value="fullName-desc">Name Z-A</option>
                <option value="username-asc">Username A-Z</option>
                <option value="username-desc">Username Z-A</option>
                <option value="role-asc">Role A-Z</option>
                <option value="role-desc">Role Z-A</option>
                <option value="email-asc">Email A-Z</option>
                <option value="email-desc">Email Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUsers.map((user: IUserApi, index: number) => (
            <div
              key={user.email}
              className="group relative animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Card */}
              <div className="relative bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-full ring-2 ring-primary/20 ring-offset-2">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff`}
                              alt={user.fullName}
                            />
                          </div>
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 badge ${getStatusBadge(user)} badge-sm`}
                        >
                          {getStatusText(user)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{user.fullName}</h3>
                        <p className="text-sm text-base-content/60">
                          @{user.username}
                        </p>
                        <div className="badge badge-outline badge-sm mt-1">
                          {user.role === "admin" ? "Admin" : "User"}
                        </div>
                      </div>
                    </div>

                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-xs btn-circle"
                      >
                        <AppIcon_Element
                          icon={"hugeicons:more-vertical-square-02"}
                          className="text-lg"
                        />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-36"
                      >
                        <li>
                          <button
                            // onClick={() => dispatch(setSelectedUser(user))}
                            className="flex items-center gap-2"
                          >
                            <AppIcon_Element icon="solar:eye-linear" /> View
                          </button>
                        </li>
                        <li>
                          <button className="flex items-center gap-2">
                            <AppIcon_Element icon="iconamoon:edit-light" /> Edit
                          </button>
                        </li>
                        <li>
                          <button
                            // onClick={() => handleDeleteUser(user.email)}
                            // disabled={deleteUserMutation.isPending}
                            className="flex items-center gap-2 text-error"
                          >
                            {/* {deleteUserMutation.isPending ? ( */}
                            <AppIcon_Element
                              icon="lucide:loader"
                              className="animate-spin"
                            />
                            {/* // ) : ( */}
                            <AppIcon_Element icon={"tabler:trash"} />
                            {/* // )} */}
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                      <AppIcon_Element
                        icon="tabler:mail"
                        className="text-primary"
                      />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                      <AppIcon_Element
                        icon="solar:calendar-linear"
                        className="text-info"
                      />
                      <span>Joined {formatDate(new Date(user.createdAt))}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                      <AppIcon_Element
                        icon="boxicons:refresh-cw"
                        className="text-secondary"
                      />
                      <span>
                        Last updated {formatDate(new Date(user.updatedAt))}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                      <AppIcon_Element
                        icon="boxicons:alert-circle"
                        className="text-warning"
                      />
                      <span>
                        Reset token expires{" "}
                        {user.resetPasswordExpire
                          ? user.resetPasswordExpire.toString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Verification Info */}
                  <div className="mt-4 pt-4 border-t border-base-300/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`badge ${user.isVerified ? "badge-success" : "badge-warning"} badge-sm`}
                        >
                          {user.isVerified ? "✓ Verified" : "⏳ Pending"}
                        </div>
                        {user.role === "admin" && (
                          <div className="badge badge-primary badge-sm">
                            Admin
                          </div>
                        )}
                      </div>

                      <button className="btn btn-primary btn-xs relative overflow-hidden group">
                        <span className="relative z-10">View Profile</span>
                        <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && !getAllUsersLoading && (
          <div className="text-center py-12">
            <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-8 border border-base-300/50">
              <AppIcon_Element
                icon="mynaui:users-group"
                className="text-6xl text-base-content/20 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">No users found</h3>
              <p className="text-base-content/60 mt-2">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => resetFiltersDispatched()}
                className="btn btn-primary btn-sm mt-4"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-base-100/80 backdrop-blur-xl rounded-2xl p-4 border border-base-300/50">
            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/60">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  setItemsPerPageDispatched(Number(e.target.value))
                }
                className="select select-bordered select-sm w-20"
              >
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
              <span className="text-sm text-base-content/60">per page</span>
            </div>

            {/* Page info */}
            <div className="text-sm text-base-content/60">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPageDispatched(1)}
                disabled={currentPage === 1}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-left" />
              </button>

              <button
                onClick={() => setCurrentPageDispatched(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-left" />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPageDispatched(page)}
                  className={`btn btn-sm btn-square transition-all duration-200
                    ${
                      currentPage === page
                        ? "btn-primary"
                        : "btn-ghost hover:bg-primary/10"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPageDispatched(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-right" />
              </button>

              <button
                onClick={() => setCurrentPageDispatched(totalPages)}
                disabled={currentPage === totalPages}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-right" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    // <div className="min-h-screen bg-base-200 p-4 md:p-6">
    //   <div className="max-w-7xl mx-auto">
    //     {/* Header Section */}
    //     <HomeManage_layout />

    //     {/* Filters Section */}
    //     <HomeFilter_layout />

    //     {/* User Cards Grid */}
    //     <HomeCard_layout />

    //     {/* Empty State */}
    //     <HomeEmptyStatus_layout />

    //     {/* Pagination */}
    //     <HomePagination_layout />
    //   </div>
    // </div>
  );
};

export default Home_Page;
