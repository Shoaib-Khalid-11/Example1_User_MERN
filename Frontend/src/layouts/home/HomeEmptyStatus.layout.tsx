import { AppIcon_Element } from "components/third-party";
import { useUserSliceStore } from "store/slices";

export const HomeEmptyStatus_layout = () => {
  const { filteredUsers, setSearchTerm, setFilterRole, setFilterStatus } =
    useUserSliceStore();

  return (
    <>
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
    </>
  );
};

export default HomeEmptyStatus_layout;
