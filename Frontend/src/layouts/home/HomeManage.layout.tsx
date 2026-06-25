import { AppIcon_Element } from "components/third-party";
import { useUserSliceStore } from "store/slices";

export const HomeManage_layout = () => {
  const { filteredUsers } = useUserSliceStore();
  return (
    <div className="relative mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <AppIcon_Element icon="fa-solid:robot" className="text-primary" />
            User Management
          </h1>
          <p className="text-base-content/60 mt-1">
            {filteredUsers.length} users found
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary btn-sm relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2">
              <AppIcon_Element icon="mynaui:users-group" /> Add User
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeManage_layout;
