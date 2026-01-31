from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from app.models import AttendanceStatus


# --- Employee Schemas ---
class EmployeeBase(BaseModel):
    full_name: str
    email: EmailStr
    department: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


# --- Attendance Schemas ---
class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    status: AttendanceStatus


class AttendanceCreate(AttendanceBase):
    pass


class AttendanceResponse(AttendanceBase):
    id: int
    employee_name: Optional[str] = None

    class Config:
        from_attributes = True
