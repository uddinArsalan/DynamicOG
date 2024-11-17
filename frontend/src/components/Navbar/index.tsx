import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavMenu from "../NavMenu";
// import { useAuthStore } from "@/store/user.store";

export default function Navbar() {
  // const {} = useAuthStore()
  return (
    <nav className="bg-gray-950 text-white py-4 px-6 border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-bold text-2xl">DynamicOg</div>
        <div className="hidden md:block text-sm opacity-75">
          Generate dynamic Open Graph images effortlessly
        </div>
        <div className="hidden md:flex space-x-2">
          <Button
            asChild
            variant="outline"
            className="text-gray-950 hover:text-gray-950"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-white text-gray-950 hover:bg-gray-200">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        <NavMenu />
      </div>
    </nav>
  );
}
