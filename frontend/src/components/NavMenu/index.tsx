import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
  BookOpenIcon,
  Code2,
  Settings,
  Github,
} from "lucide-react";

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

  const menuSections = [
    {
      title: "Getting Started",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        {
          label: "Documentation",
          icon: BookOpenIcon,
          href: "/docs",
          external: true,
        },
        { label: "API Reference", icon: Code2, href: "/api" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Login", icon: LogIn, href: "/login" },
        { label: "Sign Up", icon: UserPlus, href: "/signup" },
        { label: "Settings", icon: Settings, href: "/settings" },
      ],
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative group"
        >
          <Menu className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 p-0 bg-gray-950 border-gray-800"
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
                {idx < menuSections.length - 1 && (
                  <Separator className="my-6 bg-gray-800" />
                )}
              </div>
            ))}
          </div>

          <SheetFooter className="border-t border-gray-800">
            <div className="p-6 w-full">
              <Button
                variant="ghost"
                className="w-full justify-between text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <div className="flex items-center">
                  <Github className="w-5 h-5 mr-3" />
                  <span>Star on GitHub</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
