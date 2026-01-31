import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees } from "@/api/employees.api";
import { getAttendance, markAttendance } from "@/api/attendance.api";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // 1. Fetch all employees
  const { data: employees } = useQuery({ 
    queryKey: ["employees"], 
    queryFn: getEmployees 
  });

  // 2. Fetch all attendance
  const { data: attendance } = useQuery({ 
    queryKey: ["attendance"], 
    queryFn: getAttendance 
  });

  // 3. Mutation to mark attendance
  const mutation = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.detail || "Update failed");
    }
  });

  const handleStatusChange = (employeeId: number, status: "Present" | "Absent") => {
    mutation.mutate({
      employee_id: employeeId.toString(),
      date: new Date(selectedDate),
      status: status
    });
  };

  return (
    <PageWrapper title="Daily Attendance Sheet">
      <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">Select Date to Mark</span>
          <Input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-[200px]"
          />
        </div>
        <div className="ml-auto text-sm text-muted-foreground italic">
          Tip: Changing a status saves automatically.
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[300px]">Employee Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Attendance Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.sort((a,b) => a.full_name.localeCompare(b.full_name)).map((emp) => {
              // Find if this employee has a record for the selected date
              const record = attendance?.find(
                (a) => a.employee_id === emp.id && a.date === selectedDate
              );

              return (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.full_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{emp.department}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={record?.status || "none"}
                      onValueChange={(val) => handleStatusChange(emp.id, val as any)}
                    >
                      <SelectTrigger className={`w-[140px] ml-auto ${
                        record?.status === 'Present' ? 'border-green-500 text-green-700 bg-green-50' : 
                        record?.status === 'Absent' ? 'border-red-500 text-red-700 bg-red-50' : ''
                      }`}>
                        <SelectValue placeholder="Not Marked" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Present">Present</SelectItem>
                        <SelectItem value="Absent">Absent</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </PageWrapper>
  );
}