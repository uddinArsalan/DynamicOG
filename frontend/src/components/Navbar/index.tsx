import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavMenu from "../NavMenu";
import { ImageIcon } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuthStore();
  const navItems = [{ label: "Dashboard", href: "/dashboard" }];

  return (
    <nav className="fixed w-full z-50 border-b border-gray-700 bg-gray-900/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <ImageIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-100">DynamicOg</span>
            </Link>
            <div className="hidden md:block h-6 w-px bg-gray-700" />
            <p className="hidden md:block text-sm text-gray-300">
              Generate dynamic Open Graph images effortlessly
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            

            {isLoggedIn ? (
              // <Link to="/login">
              <>
              <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-purple-500 transition-colors"
                onClick={logout}
              >
                Logout
              </Button>
              </>
            ) : (
              // </Link>
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-purple-500 transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-500 text-white transition-colors">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <NavMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
