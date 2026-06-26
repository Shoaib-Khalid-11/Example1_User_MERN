import { AppIcon_Element } from "components/third-party";
import { useEffect, useState } from "react";
import { useAppStore, useAuthStore } from "store/slices";
import { PaletteModeEnum } from "typescript/enums";
import { setSession_Util } from "utils";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}
export const NavBar_layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsAuntaticated } = useAuthStore();
  const {
    appState: { mode },
    setThemeMode,
  } = useAppStore();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems: NavItem[] = [
    {
      label: "Home",
      icon: <AppIcon_Element icon="solar:home-linear" />,
      href: "#home",
      isActive: true,
    },
    {
      label: "About",
      icon: <AppIcon_Element icon="famicons:rocket" />,
      href: "#about",
    },
    {
      label: "Services",
      icon: <AppIcon_Element icon="majesticons:cpu-line" />,
      href: "#services",
    },
    {
      label: "Portfolio",
      icon: <AppIcon_Element icon="mynaui:globe" />,
      href: "#portfolio",
    },
    {
      label: "Contact",
      icon: <AppIcon_Element icon="prime:user" />,
      href: "#contact",
    },
  ];

  const handleLogout = () => {
    setIsAuntaticated(false);
    setSession_Util(null);
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-200/80 backdrop-blur-md shadow-lg shadow-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary blur-xl opacity-70 animate-pulse"></div>
              {/* <FaRobot className="relative text-4xl text-primary animate-spin-slow" /> */}
              <AppIcon_Element
                icon="fa-solid:robot"
                className="relative text-4xl text-primary animate-spin-slow"
              />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              FutureTech
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  item.isActive
                    ? "text-primary"
                    : "text-base-content/60 hover:text-primary"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>

                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-primary to-secondary transition-all duration-300 ${
                    item.isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </a>
            ))}

            {/* Theme Toggle */}
            {/* <button
              onClick={setThemeMode()
              className="btn btn-ghost btn-circle relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="text-xl">✦</span>
            </button> */}
            <select
              className="select select-bordered"
              value={mode}
              onChange={(e) => setThemeMode(e.target.value as PaletteModeEnum)}
            >
              {Object.values(PaletteModeEnum).map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="relative">
              {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" /> */}
              <AppIcon_Element
                icon="lucide:search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
              />
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-sm pl-10 pr-4 w-40 focus:w-60 transition-all duration-300 glass"
              />
            </div>

            {/* Action Button */}
            <button
              className="btn btn-primary btn-sm relative overflow-hidden group"
              onClick={handleLogout}
            >
              <span className="relative z-10 flex items-center gap-2">
                <AppIcon_Element icon={"solar:settings-outline"} /> Log Out
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* <button
              onClick={setThemeMode()
              className="btn btn-ghost btn-circle btn-sm"
            >
              <span className="text-lg">✦</span>
            </button> */}
            <select
              className="select select-bordered"
              value={mode}
              onChange={(e) => setThemeMode(e.target.value as PaletteModeEnum)}
            >
              {Object.values(PaletteModeEnum).map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle btn-lg relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? (
                <AppIcon_Element
                  icon="basil:cross-solid"
                  className="text-2xl"
                />
              ) : (
                <AppIcon_Element icon="jam:menu" className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-base-200/50 backdrop-blur-md rounded-xl mt-2 border border-primary/20">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  item.isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-300/50 text-base-content/70 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-primary/30"></div>
              </a>
            ))}

            <div className="px-4 py-3 border-t border-base-300/50">
              <button
                className="btn btn-primary btn-sm w-full relative overflow-hidden group"
                onClick={handleLogout}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <AppIcon_Element icon={"solar:settings-outline"} /> Log Out
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent"></div>
    </nav>
  );
};

export default NavBar_layout;
