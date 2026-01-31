from sqlalchemy.orm import Session
from app import models, schemas


def get_by_email(db: Session, email: str):
    return db.query(models.Employee).filter(models.Employee.email == email).first()


def get(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()


def get_all(db: Session):
    return db.query(models.Employee).all()


def create(db: Session, employee: schemas.EmployeeCreate):
    db_emp = models.Employee(
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department,
    )
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp


def delete(db: Session, employee_id: int):
    db_emp = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if db_emp:
        db.delete(db_emp)
        db.commit()
        return True
    return False
