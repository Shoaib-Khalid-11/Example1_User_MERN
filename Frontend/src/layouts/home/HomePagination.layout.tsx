import { AppIcon_Element } from "components/third-party";
import { useUserSliceStore } from "store/slices";

export const HomePagination_layout = () => {
  const {
    userState: { itemsPerPage, currentPage },
    filteredUsers,
    setCurrentPage,
    setItemsPerPage,
  } = useUserSliceStore();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <>
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
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            users
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
    </>
  );
};

export default HomePagination_layout;
