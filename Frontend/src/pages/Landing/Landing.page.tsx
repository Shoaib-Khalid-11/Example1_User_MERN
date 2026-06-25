import { ProtectedRoute_Guard } from "components/guard";
import { NavBar_Layout } from "layouts/common";
import { Outlet } from "react-router";

export const Landing_Page = () => {
  return (
    <>
      <ProtectedRoute_Guard>
        <NavBar_Layout />
        <div className="pt-20" />
        <Outlet />
      </ProtectedRoute_Guard>
    </>
  );
};

export default Landing_Page;
