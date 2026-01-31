import { api } from './axios';
import type { Employee, EmployeeFormData } from '@/types/employee';

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await api.get('/employees');
  return data;
};

export const createEmployee = async (data: EmployeeFormData): Promise<Employee> => {
  const response = await api.post('/employees', data);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`);
};