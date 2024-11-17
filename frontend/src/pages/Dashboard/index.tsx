import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col h-screen bg-background">
        <Navbar />

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
