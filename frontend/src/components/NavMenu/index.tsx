import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  ImageIcon,
  Menu,
  ExternalLink,
  ChevronRight,
  LayoutDashboard,
  Github,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationItem = ({ href, label, icon: Icon, external }: any) => (
  <Link
    to={href}
    className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="flex-1">{label}</span>
    {external && <ExternalLink className="w-4 h-4 ml-2 opacity-50" />}
  </Link>
);

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userInfo, logout } = useAuthStore();

  const menuSections = isLoggedIn
    ? [
        {
          title: "Menu",
          items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
          ],
        },
      ]
    : [
        {
          title: "Account",
          items: [
            { label: "Login", icon: LogIn, href: "/login" },
            { label: "Sign Up", icon: UserPlus, href: "/signup" },
          ],
        },
      ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-gray-100 hover:bg-gray-800 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 border-none text-white p-0 bg-gray-950"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b border-gray-800 p-6">
            <SheetTitle className="flex items-center space-x-2 text-white">
              <div className="p-2 bg-purple-500 rounded-lg">
                <ImageIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">DynamicOg</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-6">
            {isLoggedIn && (
              <div className="px-6 mb-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar>
                    <AvatarFallback>{userInfo?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{userInfo?.name}</p>
                    <p className="text-sm text-gray-400">{userInfo?.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start text-white border-gray-700 hover:bg-gray-800 hover:text-white"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            )}

            {menuSections.map((section, idx) => (
              <div key={idx} className="px-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
                <nav className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <NavigationItem key={itemIdx} {...item} />
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <SheetFooter className="border-t border-gray-800">
            <div className="p-6 w-full">
              <Button
                variant="outline"
                className="w-full justify-between text-gray-400 hover:text-white hover:bg-gray-800 border-gray-700"
                asChild
              >
                <Link
                  to="https://github.com/uddinArsalan/DynamicOG"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center">
                    <Github className="w-5 h-5 mr-3" />
                    <span>Star on GitHub</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
