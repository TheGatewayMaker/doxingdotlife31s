import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";
import {
  HomeIcon,
  UploadIcon,
  SettingsIcon,
  SearchAltIcon,
  ClipboardIcon,
} from "@/components/Icons";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if click is outside the sidebar and not on the hamburger button or logo link
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        !target.closest('[aria-controls="mobile-menu"]') &&
        !target.closest("[data-logo-link]")
      ) {
        closeSidebar();
      }
    };

    // Use capture phase to catch clicks early
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
      setIsClosing(false);
    }, 350);
  };

  const handleLogout = async () => {
    await logout();
    closeSidebar();
    navigate("/");
  };

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/all-posts", label: "All Posts", icon: null },
  ];

  return (
    <header className="w-full bg-[#000000] backdrop-blur-md border-b border-[#333333]/50 shadow-lg animate-slideInDown sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          to="/"
          ref={logoRef}
          data-logo-link
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-md flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fa9258861175949eaa27282de53009385%2F58644c317828471cb52c7ec23ee52853"
              alt="Doxing Dot Life Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black text-base sm:text-lg text-white hidden xs:inline line-clamp-1 group-hover:text-[#0088CC] transition-colors">
            Doxing Dot Life
          </span>
          <span className="font-black text-base sm:text-lg text-white xs:hidden group-hover:text-[#0088CC] transition-colors">
            DDL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#979797] hover:text-white transition-all duration-200 group"
          >
            <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#0088CC]" />
            <span className="hidden xl:inline group-hover:text-[#0088CC]">
              Home
            </span>
          </Link>
          <Link
            to="/all-posts"
            className="text-sm font-semibold text-[#979797] hover:text-white transition-all duration-200 group"
          >
            <span className="group-hover:text-[#0088CC]">Posts</span>
          </Link>
          <Link
            to="/clowns"
            className="text-sm font-semibold text-[#979797] hover:text-white transition-all duration-200 group"
          >
            <span className="group-hover:text-[#0088CC]">Clowns</span>
          </Link>
          <Link
            to="/doxx-anyone"
            className="flex items-center gap-2 px-5 py-2 bg-[#0088CC] text-white font-semibold rounded-lg hover:bg-[#0077BB] transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 group"
          >
            <SearchAltIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Doxx Now</span>
          </Link>
          {isAuthenticated && (
            <>
              {location.pathname !== "/uppostpanel" && (
                <Link
                  to="/uppostpanel"
                  className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 group"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F8827f72ce42e47719bdc54378c04ffe2%2F2232fec32fd946fe90d0261ee1f1268f?format=webp&width=800"
                    alt="Upload"
                    className="w-4 h-4 group-hover:scale-110 transition-transform brightness-0 invert"
                  />
                  <span className="hidden xl:inline">Upload</span>
                </Link>
              )}
              {location.pathname !== "/admin-panel" && (
                <Link
                  to="/admin-panel"
                  className="flex items-center gap-2 px-5 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 group"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F8827f72ce42e47719bdc54378c04ffe2%2F18652552236645cf8f8c520da651389a?format=webp&width=800"
                    alt="Admin"
                    className="w-4 h-4 group-hover:scale-110 transition-transform brightness-0 invert"
                  />
                  <span className="hidden xl:inline">Admin</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 group"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F8827f72ce42e47719bdc54378c04ffe2%2F6a1c3a726c1243dc8c429c21fff3907d?format=webp&width=800"
                  alt="Logout"
                  className="w-4 h-4 group-hover:scale-110 transition-transform brightness-0 invert"
                />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button - Modern Hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg transition-all duration-300 relative touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#0088CC] focus:ring-offset-2 focus:ring-offset-[#000000] group hover:bg-[#333333]/30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={
            isSidebarOpen ? "Close navigation menu" : "Toggle navigation menu"
          }
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-menu"
        >
          <div className="relative w-6 h-5 flex items-center justify-center">
            {/* Hamburger lines with modern animation */}
            <div
              className="absolute w-full h-px bg-white transition-all duration-300 ease-in-out"
              style={{
                transform: isSidebarOpen
                  ? "rotate(45deg) translateY(0)"
                  : "translateY(-8px)",
              }}
            />
            <div
              className="absolute w-full h-px bg-white transition-all duration-300 ease-in-out"
              style={{
                opacity: isSidebarOpen ? 0 : 1,
              }}
            />
            <div
              className="absolute w-full h-px bg-white transition-all duration-300 ease-in-out"
              style={{
                transform: isSidebarOpen
                  ? "rotate(-45deg) translateY(0)"
                  : "translateY(8px)",
              }}
            />
          </div>
        </button>

        {/* Right-to-Left Sidebar Navigation */}
        {isSidebarOpen && (
          <>
            {/* Blur Overlay */}
            <div
              className={`fixed inset-0 bg-black/50 backdrop-blur-md lg:hidden transition-all duration-300 ease-out ${
                isClosing ? "animate-overlayBlurOut" : "animate-overlayBlur"
              }`}
              onClick={closeSidebar}
              role="presentation"
              aria-hidden="true"
              style={{ zIndex: 40 }}
            />

            {/* Sidebar from Right */}
            <div
              ref={sidebarRef}
              id="mobile-menu"
              className={`fixed top-0 right-0 h-screen w-72 max-w-[85vw] bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#000000] lg:hidden shadow-2xl flex flex-col overflow-hidden border-l border-[#333333]/50 ${
                isClosing
                  ? "animate-slideOutToRight"
                  : "animate-slideInFromRight"
              }`}
              style={{
                zIndex: 50,
                willChange: "transform",
              }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              {/* Header with close button */}
              <div className="h-14 sm:h-16 border-b border-[#333333]/50 flex items-center justify-between px-5 sm:px-6 flex-shrink-0 bg-gradient-to-r from-[#0088CC]/10 to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0088CC] rounded-full"></div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Navigation
                  </h2>
                </div>
                <button
                  onClick={closeSidebar}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-lg hover:bg-[#0088CC]/20 transition-all duration-200 group"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#979797] group-hover:text-[#0088CC] group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Scrollable menu content */}
              <nav className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-5 space-y-1.5">
                <Link
                  to="/"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-3 text-[#979797] font-semibold hover:bg-gradient-to-r hover:from-[#0088CC]/20 hover:to-transparent hover:text-white rounded-lg transition-all duration-200 active:bg-[#0088CC]/40 text-sm sm:text-base touch-target group"
                >
                  <HomeIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="flex-1">Home</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  to="/all-posts"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-3 text-[#979797] font-semibold hover:bg-gradient-to-r hover:from-[#0088CC]/20 hover:to-transparent hover:text-white rounded-lg transition-all duration-200 active:bg-[#0088CC]/40 text-sm sm:text-base touch-target group"
                >
                  <ClipboardIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="flex-1">All Posts</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  to="/clowns"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-3 text-[#979797] font-semibold hover:bg-gradient-to-r hover:from-[#0088CC]/20 hover:to-transparent hover:text-white rounded-lg transition-all duration-200 active:bg-[#0088CC]/40 text-sm sm:text-base touch-target group"
                >
                  <svg
                    className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  <span className="flex-1">Clowns</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  to="/doxx-anyone"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-3 text-white font-semibold bg-gradient-to-r from-[#0088CC] to-[#0066AA] hover:from-[#0099DD] hover:to-[#0077BB] rounded-lg transition-all duration-200 text-sm sm:text-base touch-target group"
                >
                  <SearchAltIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="flex-1">Doxx Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                {isAuthenticated && (
                  <>
                    <div className="my-3 border-t border-[#333333]/50"></div>
                    {location.pathname !== "/uppostpanel" && (
                      <Link
                        to="/uppostpanel"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 rounded-lg transition-all duration-200 text-sm sm:text-base touch-target group"
                      >
                        <UploadIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="flex-1">Upload Post</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    {location.pathname !== "/admin-panel" && (
                      <Link
                        to="/admin-panel"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-500 hover:to-amber-600 rounded-lg transition-all duration-200 text-sm sm:text-base touch-target group"
                      >
                        <SettingsIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="flex-1">Admin Panel</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </>
                )}
              </nav>

              {/* Footer section with logout button */}
              {isAuthenticated && (
                <div className="p-4 sm:p-5 border-t border-[#333333]/50 bg-gradient-to-t from-[#0a0a0a] to-transparent flex-shrink-0">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 text-sm sm:text-base touch-target group"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
