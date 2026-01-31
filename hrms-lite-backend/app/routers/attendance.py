from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, database
from app.crud import attendance as crud_attendance
from app.crud import employee as crud_employee

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.get("/", response_model=List[schemas.AttendanceResponse])
def read_attendance(db: Session = Depends(database.get_db)):
    records = crud_attendance.get_all(db)

    # Map the employee name manually since it's a relationship
    results = []
    for record in records:
        resp = schemas.AttendanceResponse.model_validate(record)
        resp.employee_name = (
            record.employee.full_name if record.employee else "Deleted Employee"
        )
        results.append(resp)
    return results


@router.post("/", response_model=schemas.AttendanceResponse, status_code=201)
def mark_attendance(
    attendance: schemas.AttendanceCreate, db: Session = Depends(database.get_db)
):
    # 1. Validate Employee Exists
    emp = crud_employee.get(db, attendance.employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 2. Check for Duplicates
    existing = crud_attendance.get_by_date(db, attendance.employee_id, attendance.date)
    if existing:
        # UPDATE existing record instead of erroring
        existing.status = attendance.status
        db.commit()
        db.refresh(existing)
        return existing

    return crud_attendance.create(db, attendance)
