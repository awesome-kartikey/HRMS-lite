import { useAttendance } from "@/hooks/useAttendance";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingState, ErrorState, EmptyState } from "@/components/ui/state-message";

export function AttendanceTable() {
  const { data: attendance, isLoading, isError, refetch } = useAttendance();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState action={<Button variant="outline" onClick={() => refetch()}>Try Again</Button>} />;

  if (!attendance || attendance.length === 0) {
    return <EmptyState title="No attendance records" description="Attendance records will appear here once marked." />;
  }

  // Sort by date descending (newest first)
  const sortedAttendance = [...attendance].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAttendance.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.date}</TableCell>
              <TableCell>{record.employee_name}</TableCell>
              <TableCell>
                <Badge variant={record.status === "Present" ? "default" : "destructive"}>
                  {record.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}