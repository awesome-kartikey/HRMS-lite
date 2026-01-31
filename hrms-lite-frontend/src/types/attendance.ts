export interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  status: "Present" | "Absent";
  employee_name?: string;
}

export interface AttendanceFormData {
  employee_id: string;
  date: Date;
  status: "Present" | "Absent";
}