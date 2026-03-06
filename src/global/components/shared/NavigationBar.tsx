"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Compass, PlusCircle, LogOut, LogIn } from "lucide-react";
import { logout } from "@/features/auth/actions/actions";
import { toast } from "react-toastify";
import Avatar from "../ui/Avatar";

const allLinks = [
  { href: "/browse", label: "Browse", protected: false },
  {
    href: "/create-discussion",
    label: "Create",
    protected: true,
  },
];

interface AuthUser {
  name: string;
  username: string;
}

interface Props {
  isAuthenticated?: boolean;
  user?: AuthUser | null;
}

const NavigationBar = ({ isAuthenticated, user }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = allLinks.filter((link) => !link.protected || isAuthenticated);
  const isHomePage = pathname === "/";

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Something went wrong.");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 md:px-16 lg:px-24 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm-1 13H7v-2h4v2Zm4-4H7V9h8v2Z" />
              </svg>
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              {"Sanctum"}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal-50 text-teal-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <>
                {/* User info */}
                <div className="flex items-center gap-2 px-2 py-1 rounded-md">
                  <Avatar name={user.name} />
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-gray-400">
                      {"@"}
                      {user.name}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  {"Log out"}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {!isHomePage && !isAuthenticated && (
                  <Link
                    href="/"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-teal-500 border border-teal-200 hover:bg-teal-50 rounded-md transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    {"Log in"}
                  </Link>
                )}
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-md transition-colors"
                >
                  {"Sign up"}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal-50 text-teal-500"
                      : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}

            <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-1">
              {isAuthenticated && user ? (
                <>
                  {/* Mobile user info */}
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Avatar name={user.name} />
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-gray-400">
                        {"@"}
                        {user.name}
                      </span>
                    </div>
                  </div>

                  {/* Mobile logout */}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {"Log out"}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-1">
                  {!isHomePage && !isAuthenticated && (
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-teal-500 border border-teal-200 hover:bg-teal-50 rounded-md transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      {"Log in"}
                    </Link>
                  )}
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-md transition-colors text-center"
                  >
                    {"Sign up"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-14" />
    </>
  );
};

export default NavigationBar;
