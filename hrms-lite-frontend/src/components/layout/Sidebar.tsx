import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, CalendarCheck, LogOut, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employees", label: "Employees", icon: Users },
    { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  ];

  return (
    <div className={cn("flex flex-col w-64 border-r bg-card h-full", className)}>
      <div className="h-16 flex items-center px-6 border-b shrink-0">
        <Hexagon className="w-6 h-6 mr-2 text-primary fill-primary/20" />
        <h1 className="font-bold text-lg tracking-tight">HRMS Lite</h1>
      </div>
      
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = location.pathname === item.href;
             return (
               <Link
                 key={item.href}
                 to={item.href}
                 className={cn(
                   "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                   isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                 )}
               >
                 <Icon className={cn("mr-3 h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                 {item.label}
               </Link>
             );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            AD
          </div>
          <div className="flex flex-col">
             <span className="text-sm font-medium">Admin User</span>
             <span className="text-xs text-muted-foreground">admin@hrms.com</span>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
