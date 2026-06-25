/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppIcon_Element } from "components/third-party";
import { mockUsers } from "data/mokeData";
import { HomeFilter_layout, HomeManage_layout } from "layouts/home";
import { useEffect, useMemo, useState } from "react";

export const Home_Page = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // const [selectedUser, setSelectedUser] = useState<any>(null);

  // Reset to first page when filters change
  useEffect(() => {
    // setCurrentPage(1);
  }, [searchTerm, filterRole, filterStatus, sortBy, sortOrder]);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.location.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower),
      );
    }

    // Role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof typeof a];
      let bVal = b[sortBy as keyof typeof b];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
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
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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
  const getStatusBadge = (status: string) => {
    const colors = {
      Active: "badge-success",
      Inactive: "badge-error",
      Pending: "badge-warning",
    };
    return colors[status as keyof typeof colors] || "badge-ghost";
  };
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <HomeManage_layout />

        {/* Filters Section */}
        <HomeFilter_layout />

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUsers.map((user, index) => (
            <div
              key={user.id}
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
                            <img src={user.avatar} alt={user.name} />
                          </div>
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 badge ${getStatusBadge(user.status)} badge-sm`}
                        >
                          {user.status}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className="text-sm text-base-content/60">
                          {user.role}
                        </p>
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
                          <button className="flex items-center gap-2">
                            <AppIcon_Element icon="solar:eye-linear" /> View
                          </button>
                        </li>
                        <li>
                          <button className="flex items-center gap-2">
                            <AppIcon_Element icon="iconamoon:edit-light" /> Edit
                          </button>
                        </li>
                        <li>
                          <button className="flex items-center gap-2 text-error">
                            <AppIcon_Element icon={"tabler:trash"} /> Delete
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
                        icon="solar:phone-linear"
                        className="text-secondary"
                      />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                      <AppIcon_Element
                        icon="lucide:map-pin"
                        className="text-accent"
                      />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                      <AppIcon_Element
                        icon="solar:calendar-linear"
                        className="text-info"
                      />
                      <span>
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {user.skills.map((skill: any, idx: number) => (
                        <span
                          key={idx}
                          className="badge badge-outline badge-sm bg-primary/5 border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 pt-4 border-t border-base-300/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-warning">
                            <AppIcon_Element
                              icon="material-symbols:star-outline-rounded"
                              className="fill-current"
                            />
                            <span className="font-bold">{user.rating}</span>
                          </div>
                          <span className="text-xs text-base-content/40">
                            Rating
                          </span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <AppIcon_Element
                              icon="la:award"
                              className="text-primary"
                            />
                            <span className="font-bold">{user.projects}</span>
                          </div>
                          <span className="text-xs text-base-content/40">
                            Projects
                          </span>
                        </div>
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
        {filteredUsers.length === 0 && (
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
                onClick={() => {
                  setSearchTerm("");
                  setFilterRole("all");
                  setFilterStatus("all");
                }}
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
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
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
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-left" />
              </button>

              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-left" />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`btn btn-sm btn-square transition-all duration-200 ${
                    currentPage === page
                      ? "btn-primary"
                      : "btn-ghost hover:bg-primary/10"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-ghost btn-sm btn-square"
              >
                <AppIcon_Element icon="lucide:chevrons-right" />
                {/* <FiChevronRight /> */}
              </button>

              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="btn btn-ghost btn-sm btn-square"
              >
                {/* <FiChevronsRight /> */}
                <AppIcon_Element icon="lucide:chevrons-right" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home_Page;
