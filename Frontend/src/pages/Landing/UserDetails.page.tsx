import { AppIcon_Element } from "components/third-party";
import { useNavigate, useParams } from "react-router";
import { useDeleteUserByIDApi, useUserByIDApi } from "utils/api/user.api";

export const UserDetails_Page = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserByIDData } = useUserByIDApi(id!);
  const { mutateDeleteUserByID } = useDeleteUserByIDApi();
  const user = getUserByIDData?.user;
  if (!user) return null;
  // Format date
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format date relative
  const formatRelativeDate = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    const now = new Date();
    const then = new Date(date);
    const diffTime = Math.abs(now.getTime() - then.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(date);
  };

  // Loading state
  //   if (isLoading) {
  //     return (
  //       <div className="min-h-screen bg-base-200 flex items-center justify-center">
  //         <div className="text-center">
  //           <AppIcon_Element
  //                       icon="lucide:loader" className="text-6xl text-primary animate-spin mx-auto mb-4" />
  //           <p className="text-base-content/60">Loading user details...</p>
  //         </div>
  //       </div>
  //     );
  //   }

  // Error state
  //   if (isError || !user) {
  //     return (
  //       <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
  //         <div className="max-w-md w-full bg-base-100/80 backdrop-blur-xl rounded-2xl p-8 border border-base-300/50 shadow-xl">
  //           <div className="text-center">
  //             <AppIcon_Element icon="boxicons:alert-circle" className="text-6xl text-error mx-auto mb-4" />
  //             <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
  //             <p className="text-base-content/60 mb-6">
  //               {error instanceof Error
  //                 ? error.message
  //                 : "The user you are looking for does not exist."}
  //             </p>
  //             <div className="flex flex-col sm:flex-row gap-3 justify-center">
  //               <button onClick={() => refetch()} className="btn btn-primary">
  //                 Try Again
  //               </button>
  //               <button
  //                 onClick={() => navigate("/users")}
  //                 className="btn btn-ghost"
  //               >
  //                 Back to Users
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm gap-2"
          >
            <AppIcon_Element icon="tabler:arrow-left" /> Back to Users
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <AppIcon_Element icon="fa-solid:robot" className="text-primary" />
              User Profile
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              //   onClick={() => refetch()}
              className="btn btn-ghost btn-sm gap-2"
            >
              <AppIcon_Element icon="boxicons:refresh-cw" /> Refresh
            </button>
            <button
              className="btn btn-primary btn-sm gap-2 relative overflow-hidden group"
              onClick={() => navigate(`/user/update/${user?._id}`)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <AppIcon_Element icon="iconamoon:edit-light" /> Edit
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              className="btn btn-error btn-sm gap-2"
              onClick={() => mutateDeleteUserByID(user?._id)}
            >
              <AppIcon_Element icon={"tabler:trash"} /> Delete
            </button>
          </div>
        </div>

        {/* User Detail Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl sticky top-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring-4 ring-primary/20 ring-offset-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName)}&background=random&color=fff&size=128`}
                        alt={user.fullName}
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-2 right-2 badge 
                         ${user.isVerified ? "badge-success" : "badge-warning"} badge-lg`}
                  >
                    {user.isVerified ? "✓ Verified" : "⏳ Pending"}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-4">{user.fullName}</h2>
                <p className="text-base-content/60">@{user.username}</p>
                <div className="mt-2 flex gap-2">
                  <div
                    className={`badge ${user.role === "admin" ? "badge-primary" : "badge-ghost"}`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </div>
                  <div
                    className={`badge ${user.isVerified ? "badge-success" : "badge-warning"} badge-outline`}
                  >
                    {user.isVerified ? "Active" : "Pending"}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="divider">Quick Stats</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                  <span className="text-sm text-base-content/60">
                    Member Since
                  </span>
                  <span className="text-sm font-medium">
                    {formatRelativeDate(user.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                  <span className="text-sm text-base-content/60">
                    Last Active
                  </span>
                  <span className="text-sm font-medium">
                    {formatRelativeDate(user.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                  <span className="text-sm text-base-content/60">Status</span>
                  <span
                    className={`text-sm font-medium 
                       ${user.isVerified ? "text-success" : "text-warning"}`}
                  >
                    {user.isVerified ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="divider">Contact</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-base-200/50 rounded-lg transition-colors">
                  <AppIcon_Element
                    icon="tabler:mail"
                    className="text-primary text-lg"
                  />
                  <div>
                    <p className="text-sm text-base-content/60">Email</p>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AppIcon_Element
                  icon="material-symbols:shield-outline-rounded"
                  className="text-primary"
                />
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Username
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="prime:user"
                        className="text-base-content/40"
                      />
                      <span>{user.username}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Full Name
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="mynaui:users-group"
                        className="text-base-content/40"
                      />
                      <span>{user.fullName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="tabler:mail"
                        className="text-base-content/40"
                      />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Role
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="fa-solid:user-shield"
                        className="text-base-content/40"
                      />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Verification Status
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      {user.isVerified ? (
                        <AppIcon_Element
                          icon="prime:check-circle"
                          className="text-success"
                        />
                      ) : (
                        <AppIcon_Element
                          icon="lucide:circle-x"
                          className="text-warning"
                        />
                      )}
                      <span>
                        {user.isVerified ? "Verified" : "Pending Verification"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Account Status
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="material-symbols:shield-outline-rounded"
                        className="text-base-content/40"
                      />
                      <span
                        className={
                          user.isVerified ? "text-success" : "text-warning"
                        }
                      >
                        {user.isVerified ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AppIcon_Element
                  icon="fa7-solid:shield-alt"
                  className="text-secondary"
                />
                Security & Tokens
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Reset Password Token
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="boxicons:key-filled"
                        className="text-base-content/40"
                      />
                      <span className="font-mono text-sm">
                        {user.resetPasswordToken
                          ? `${user.resetPasswordToken.substring(0, 8)}...`
                          : "None"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Reset Password Expires
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="tabler:clock"
                        className="text-base-content/40"
                      />
                      <span>{formatDate(user.resetPasswordExpire)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Verification Token
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="line-md:link"
                        className="text-base-content/40"
                      />
                      <span className="font-mono text-sm">
                        {user.verificationToken
                          ? `${user.verificationToken.substring(0, 8)}...`
                          : "None"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Verification Expires
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="tabler:clock"
                        className="text-base-content/40"
                      />
                      <span>{formatDate(user.verificationTokenExpire)}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/60 block mb-1">
                      Refresh Token
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                      <AppIcon_Element
                        icon="boxicons:refresh-cw"
                        className="text-base-content/40"
                      />
                      <span className="font-mono text-sm">
                        {user.refreshToken
                          ? `${user.refreshToken.substring(0, 8)}...`
                          : "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AppIcon_Element
                  icon="solar:calendar-linear"
                  className="text-accent"
                />
                Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-base-content/60 block mb-1">
                    Created At
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                    <AppIcon_Element
                      icon="solar:calendar-linear"
                      className="text-base-content/40"
                    />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-base-content/60 block mb-1">
                    Last Updated
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-base-200/50 rounded-lg">
                    <AppIcon_Element
                      icon="boxicons:refresh-cw"
                      className="text-base-content/40"
                    />
                    <span>{formatDate(user.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
              <h3 className="text-lg font-bold mb-4">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  className="btn btn-primary relative overflow-hidden group"
                  onClick={() => navigate(`/user/update/${user?._id}`)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <AppIcon_Element icon="iconamoon:edit-light" /> Edit User
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="btn btn-success gap-2">
                  <AppIcon_Element icon="boxicons:alert-circle" /> Verify
                  Account
                </button>
                <button
                  className="btn btn-warning gap-2"
                  onClick={() => navigate(`/user/update/password/${user?._id}`)}
                >
                  <AppIcon_Element icon="boxicons:refresh-cw" /> Reset Password
                </button>
                <button
                  className="btn btn-error gap-2"
                  onClick={() => mutateDeleteUserByID(user?._id)}
                >
                  <AppIcon_Element icon={"tabler:trash"} /> Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails_Page;
