import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, LogIn, UserPlus, Image, Menu } from "lucide-react";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Login", icon: LogIn, href: "/login" },
    { label: "Sign Up", icon: UserPlus, href: "/signup" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full bg-gray-950 text-gray-100">
          <SheetHeader className="border-b border-gray-800 px-6 py-4">
            <SheetTitle className="text-2xl font-bold text-white flex items-center">
              <Image className="mr-2 h-6 w-6" />
              DynamicOg
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-grow px-6 py-8">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-lg font-medium hover:bg-gray-800 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <Separator className="bg-gray-800" />
          <div className="p-6 text-sm text-gray-400 text-center">
            Generate dynamic Open Graph images effortlessly
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
