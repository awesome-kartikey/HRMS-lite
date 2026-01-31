from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, database
from app.crud import employee as crud_employee

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/", response_model=List[schemas.EmployeeResponse])
def read_employees(db: Session = Depends(database.get_db)):
    return crud_employee.get_all(db)


@router.post("/", response_model=schemas.EmployeeResponse, status_code=201)
def create_employee(
    employee: schemas.EmployeeCreate, db: Session = Depends(database.get_db)
):
    normalized_email = employee.email.lower()

    if crud_employee.get_by_email(db, normalized_email):
        raise HTTPException(status_code=409, detail="Email already registered")

    employee.email = normalized_email
    return crud_employee.create(db, employee)


@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(database.get_db)):
    if not crud_employee.delete(db, employee_id):
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Deleted successfully"}
