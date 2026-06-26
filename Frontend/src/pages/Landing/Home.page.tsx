import {
  HomeCard_layout,
  HomeEmptyStatus_layout,
  HomeFilter_layout,
  HomeManage_layout,
  HomePagination_layout,
} from "layouts/home";

export const Home_Page = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <HomeManage_layout />

        {/* Filters Section */}
        <HomeFilter_layout />

        {/* User Cards Grid */}
        <HomeCard_layout />

        {/* Empty State */}
        <HomeEmptyStatus_layout />

        {/* Pagination */}
        <HomePagination_layout />
      </div>
    </div>
  );
};

export default Home_Page;
