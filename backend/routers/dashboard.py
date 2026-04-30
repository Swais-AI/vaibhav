from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import DashboardResponse
from services.dashboard_service import get_dashboard_data

router = APIRouter()

@router.get("/dashboard/{student_id}", response_model=DashboardResponse)
def get_dashboard(student_id: int, db: Session = Depends(get_db)):
    try:
        return get_dashboard_data(db, student_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
