import { useEmployees, useDeleteEmployee } from "@/hooks/useEmployees";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/state-message";

export function EmployeeTable() {
  const { data: employees, isLoading, isError, refetch } = useEmployees();
  const deleteMutation = useDeleteEmployee();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState action={<Button variant="outline" onClick={() => refetch()}>Try Again</Button>} />;
  
  if (!employees || employees.length === 0) {
    return <EmptyState title="No employees added" description="Get started by adding a new employee to the system." />;
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="font-medium max-w-[200px] truncate">{emp.full_name}</TableCell>
              <TableCell className="text-muted-foreground">{emp.email}</TableCell>
              <TableCell><Badge variant="secondary" className="font-normal">{emp.department}</Badge></TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Employee?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete <strong>{emp.full_name}</strong>? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => deleteMutation.mutate(emp.id)} 
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
