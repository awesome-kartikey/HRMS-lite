from sqlalchemy.orm import Session
from app import models, schemas
from datetime import date
from sqlalchemy.orm import joinedload


def get_by_date(db: Session, employee_id: int, date_val: date):
    return (
        db.query(models.Attendance)
        .filter(
            models.Attendance.employee_id == employee_id,
            models.Attendance.date == date_val,
        )
        .first()
    )


def create(db: Session, attendance: schemas.AttendanceCreate):
    db_att = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status,
    )
    db.add(db_att)
    db.commit()
    db.refresh(db_att)
    return db_att


def get_all(db: Session):
    # Eager load the employee relationship for better performance
    return (
        db.query(models.Attendance)
        .options(joinedload(models.Attendance.employee))
        .all()
    )
