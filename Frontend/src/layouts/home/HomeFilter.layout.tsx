import { AppIcon_Element } from "components/third-party";
import { useUserSliceStore } from "store/slices";

export const HomeFilter_layout = () => {
  const {
    userState: { searchTerm, filterRole, filterStatus, sortBy, sortOrder },
    setFilterRole,
    setFilterStatus,
    setSortBy,
    setSortOrder,
    setSearchTerm,
  } = useUserSliceStore();
  return (
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
            onChange={(e) => setFilterRole(e.target.value)}
            className="select select-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="all">All Roles</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
            <option value="Analyst">Analyst</option>
            <option value="Admin">Admin</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <AppIcon_Element
            icon="solar:filter-outline"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select select-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

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
              setSortBy(field);
              setSortOrder(order as "asc" | "desc");
            }}
            className="select select-bordered w-full pl-10 bg-base-200/50 focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="joinDate-desc">Newest First</option>
            <option value="joinDate-asc">Oldest First</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="projects-desc">Most Projects</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter_layout;
