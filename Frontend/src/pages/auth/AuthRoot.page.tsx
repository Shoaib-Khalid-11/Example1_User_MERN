import { ParticlesBackground_Component } from "components/common";
import { Outlet } from "react-router";

export const AuthRoot_page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-200">
      <ParticlesBackground_Component />
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

          <div className="relative bg-base-100/80 backdrop-blur-xl rounded-3xl p-8 border border-base-300/50 shadow-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRoot_page;
