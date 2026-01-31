import { format } from 'date-fns';
import { api } from './axios';
import type { Attendance, AttendanceFormData } from '@/types/attendance';

export const getAttendance = async (): Promise<Attendance[]> => {
  const { data } = await api.get('/attendance');
  return data;
};

export const markAttendance = async (data: AttendanceFormData): Promise<Attendance> => {
  const payload = {
    employee_id: parseInt(data.employee_id),
    status: data.status,
    // Format Date object to YYYY-MM-DD string for backend
    date: format(data.date, 'yyyy-MM-dd'), 
  };
  const response = await api.post('/attendance', payload);
  return response.data;
};