import { Link, Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="mr-2 lg:hidden sidebar-item"
      onClick={toggleSidebar}
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col h-screen bg-background">
        <div className="bg-sidebar flex h-16 items-center px-4 border-b border-purple-600">
          <DashboardHeader />
          <Link to="/" className="mr-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">
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
