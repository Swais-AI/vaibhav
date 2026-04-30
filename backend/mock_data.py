import os
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import (
    ClassMaster, StudentMaster, TeacherMaster, SubjectMaster,
    ChapterMaster, AssignmentMaster, StudentSubmission, QuizMaster,
    QuizResponse, NoticeBoard, TeacherParentInteractionV2
)
from datetime import datetime, timedelta

def seed_data():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 1. Class
        c1 = ClassMaster(class_name="10th Grade", section_name="A", academic_year="2025-26")
        c2 = ClassMaster(class_name="9th Grade", section_name="B", academic_year="2025-26")
        db.add_all([c1, c2])
        db.commit()

        # 2. Students
        s1 = StudentMaster(full_name="Rohit Sharma", class_id=c1.class_id, section="A", roll_no="12")
        s2 = StudentMaster(full_name="Jane Smith", class_id=c1.class_id, section="A", roll_no="13")
        s3 = StudentMaster(full_name="Bob Wilson", class_id=c2.class_id, section="B", roll_no="1")
        db.add_all([s1, s2, s3])
        db.commit()

        # 3. Teachers
        t1 = TeacherMaster(full_name="Mrs. Anjali Verma", email="anjali@example.com", phone="1234567890")
        t2 = TeacherMaster(full_name="Mr. Rahul Mehta", email="rahul@example.com", phone="0987654321")
        db.add_all([t1, t2])
        db.commit()

        # 4. Subjects
        sub1 = SubjectMaster(class_id=c1.class_id, subject_name="Mathematics", teacher_id=t1.teacher_id)
        sub2 = SubjectMaster(class_id=c1.class_id, subject_name="Science", teacher_id=t2.teacher_id)
        db.add_all([sub1, sub2])
        db.commit()

        # 5. Chapters
        ch1 = ChapterMaster(subject_id=sub1.subject_id, chapter_name="Linear Equations", chapter_order=1)
        ch2 = ChapterMaster(subject_id=sub2.subject_id, chapter_name="Human Eye", chapter_order=1)
        db.add_all([ch1, ch2])
        db.commit()

        # 6. Assignments & Submissions
        today = datetime.now().date()
        a1 = AssignmentMaster(chapter_id=ch1.chapter_id, title="Maths - Linear Equations", description="Solve exercise 1", due_date=today + timedelta(days=2), assigned_by=t1.teacher_id)
        a2 = AssignmentMaster(chapter_id=ch2.chapter_id, title="Science - Human Eye", description="Draw diagram", due_date=today - timedelta(days=1), assigned_by=t2.teacher_id)
        db.add_all([a1, a2])
        db.commit()

        # s1 completed a1, pending a2
        subm1 = StudentSubmission(assignment_id=a1.assignment_id, student_id=s1.student_id, submission_text="Here are my answers", marks_obtained=18.0, teacher_remarks="Excellent understanding.")
        db.add(subm1)
        
        # s2 completed a2
        subm2 = StudentSubmission(assignment_id=a2.assignment_id, student_id=s2.student_id, submission_text="Project attached", marks_obtained=15.0, teacher_remarks="Good effort.")
        db.add(subm2)
        db.commit()

        # 7. Quizzes & Responses
        q1 = QuizMaster(chapter_id=ch1.chapter_id, title="Algebra Quiz 1", total_marks=20.0, duration_minutes=30)
        q2 = QuizMaster(chapter_id=ch2.chapter_id, title="Physics Quiz 1", total_marks=20.0, duration_minutes=30)
        db.add_all([q1, q2])
        db.commit()

        # s1 did q1 and q2
        qr1 = QuizResponse(quiz_id=q1.quiz_id, student_id=s1.student_id, score=18.0, completed_flag=True)
        qr2 = QuizResponse(quiz_id=q2.quiz_id, student_id=s1.student_id, score=15.0, completed_flag=True)
        db.add_all([qr1, qr2])
        db.commit()

        # 8. Notices
        n1 = NoticeBoard(title="School closed on 1st June", content="School will remain closed on 1st June 2025 on account of Sunday.", class_id=c1.class_id, posted_by=t1.teacher_id)
        n2 = NoticeBoard(title="PTM Scheduled", content="PTM is scheduled on 30th May.", class_id=c1.class_id, posted_by=t2.teacher_id)
        db.add_all([n1, n2])
        db.commit()

        # 9. Teacher Parent Interactions (v2)
        tp1 = TeacherParentInteractionV2(teacher_id=t1.teacher_id, student_id=s1.student_id, class_id=c1.class_id, section="A", comments="Rohit shows good understanding in concepts. Keep practicing!")
        tp2 = TeacherParentInteractionV2(teacher_id=t2.teacher_id, student_id=s1.student_id, class_id=c1.class_id, section="A", comments="Active participation in class. Keep it up!")
        db.add_all([tp1, tp2])
        db.commit()

        print("Database seeded successfully.")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
