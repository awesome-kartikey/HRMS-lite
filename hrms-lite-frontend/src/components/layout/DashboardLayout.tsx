import { Sidebar } from "./Sidebar";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom"; 
import { useEffect } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar /> 
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden flex items-center justify-between border-b bg-card px-4 h-16">
           <div className="font-bold text-lg">HRMS Lite</div>
           <Dialog open={open} onOpenChange={setOpen}>
             <DialogTrigger asChild>
               <Button variant="ghost" size="icon">
                 <Menu className="h-5 w-5" />
               </Button>
             </DialogTrigger>
             <DialogContent 
                showCloseButton={false} 
                className="w-[280px] h-full p-0 border-r rounded-none fixed inset-y-0 left-0 right-auto bg-card data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:max-w-none translate-x-0 translate-y-0 top-0"
             >
                <div className="sr-only"><DialogTitle>Navigation Menu</DialogTitle></div>
                <Sidebar className="border-none h-full" /> 
             </DialogContent>
           </Dialog>
        </div>

        <main className="flex-1 p-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
