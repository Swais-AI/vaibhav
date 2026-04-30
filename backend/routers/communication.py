from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import CallRequest
from models import CallRequest as ModelCallRequest
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/request-call")
def request_call(request: CallRequest, db: Session = Depends(get_db)):
    try:
        new_request = ModelCallRequest(
            student_id=request.student_id,
            message=request.message,
            status="pending"
        )
        db.add(new_request)
        db.commit()
        db.refresh(new_request)
        logger.info(f"Call requested by student_id={request.student_id}. Message: {request.message}. Saved with ID: {new_request.id}")
        return {"status": "success", "message": "Call request saved successfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to log call request: {e}")
        raise HTTPException(status_code=500, detail="Failed to process call request")
