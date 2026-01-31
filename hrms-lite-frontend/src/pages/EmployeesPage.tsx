import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function EmployeesPage() {
  const [open, setOpen] = useState(false);

  return (
    <PageWrapper
      title="Employees"
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      }
    >
      <EmployeeTable />
    </PageWrapper>
  );
}