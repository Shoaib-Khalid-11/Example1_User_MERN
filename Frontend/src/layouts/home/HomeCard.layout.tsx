/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppIcon_Element } from "components/third-party";
import { useUserSliceStore } from "store/slices";

export const HomeCard_layout = () => {
  const { paginatedUsers } = useUserSliceStore();
  const getStatusBadge = (status: string) => {
    const colors = {
      Active: "badge-success",
      Inactive: "badge-error",
      Pending: "badge-warning",
    };
    return colors[status as keyof typeof colors] || "badge-ghost";
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedUsers.map((user, index) => (
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
                    <p className="text-sm text-base-content/60">{user.role}</p>
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
  );
};

export default HomeCard_layout;
