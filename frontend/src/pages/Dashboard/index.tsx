import { Link, Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col h-screen bg-background">
        <div className=" bg-gray-900 flex h-16 items-center px-4">
          <Link to="/dashboard" className="mr-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
              <LayoutDashboard className="size-4" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
              DynamicOG
            </span>
          </Link>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />

          <ScrollArea className="flex-1">
            <main className="flex-1 p-6">
              <div className="container mx-auto">
                <Outlet />
              </div>
            </main>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
