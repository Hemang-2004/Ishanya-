from flask import Blueprint, request, jsonify
from models import Feedback, db, Student
from sqlalchemy import extract, func
import calendar
from datetime import datetime, timezone

student_bp = Blueprint("student", __name__)

@student_bp.route("/", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify([{"id": s.StudentID, "name": f"{s.FirstName} {s.LastName}"} for s in students])

@student_bp.route("/<student_id>", methods=["GET"])
def get_student(student_id):
    student = Student.query.get(student_id)
    if student:
        return jsonify({"id": student.StudentID, "name": f"{student.FirstName} {student.LastName}"})
    return jsonify({"error": "Student not found"}), 404


# /monthly-student-metrics/1?year=2024 --> if required year wise metrics
@student_bp.route('/monthly-student-metrics/<int:student_id>', methods=['GET'])
def get_monthly_feedback(student_id):
    try:
        year = request.args.get('year', default=datetime.now().year, type=int)

        if year < 2015 or year > datetime.now().year:
            return jsonify({"error": "Invalid year"}), 400

        feedback_data = (
            db.session.query(
                extract('month', Feedback.Date).label('month'),
                func.avg(Feedback.TPS).label('avg_TPS'),
                func.avg(Feedback.Attendance).label('avg_Attendance'),
                func.avg(Feedback.OrganizationPlanning).label('avg_OrganizationPlanning'),
                func.avg(Feedback.TimeManagement).label('avg_TimeManagement'),
                func.avg(Feedback.TaskInitiationCompletion).label('avg_TaskInitiationCompletion'),
                func.avg(Feedback.SelfCareIndependence).label('avg_SelfCareIndependence'),
                func.avg(Feedback.PeerInteraction).label('avg_PeerInteraction'),
                func.avg(Feedback.EmpathyPerspectiveTaking).label('avg_EmpathyPerspectiveTaking'),
                func.avg(Feedback.FocusAttention).label('avg_FocusAttention'),
                func.avg(Feedback.CuriosityInquiry).label('avg_CuriosityInquiry'),
                func.avg(Feedback.PersistenceProblemSolving).label('avg_PersistenceProblemSolving'),
                func.avg(Feedback.CommunicationSkills).label('avg_CommunicationSkills'),
                func.avg(Feedback.ArtisticExpression).label('avg_ArtisticExpression'),
                func.avg(Feedback.MovementPlay).label('avg_MovementPlay'),
            )
            .filter(Feedback.StudentID == student_id, extract('year', Feedback.Date) == year)
            .group_by('month')
            .order_by('month')
            .all()
        )

        if not feedback_data:
            return jsonify({"message": "No feedback data found for the given student and year"}), 404

        result = {
            "student_id": student_id,
            "year": year,
            "monthly_metrics": [
                {
                    "month_number": entry.month,
                    "month_name": calendar.month_name[entry.month],  # Converts 1 -> "January"
                    "TPS": entry.avg_TPS,
                    "Attendance": entry.avg_Attendance,
                    "OrganizationPlanning": entry.avg_OrganizationPlanning,
                    "TimeManagement": entry.avg_TimeManagement,
                    "TaskInitiationCompletion": entry.avg_TaskInitiationCompletion,
                    "SelfCareIndependence": entry.avg_SelfCareIndependence,
                    "PeerInteraction": entry.avg_PeerInteraction,
                    "EmpathyPerspectiveTaking": entry.avg_EmpathyPerspectiveTaking,
                    "FocusAttention": entry.avg_FocusAttention,
                    "CuriosityInquiry": entry.avg_CuriosityInquiry,
                    "PersistenceProblemSolving": entry.avg_PersistenceProblemSolving,
                    "CommunicationSkills": entry.avg_CommunicationSkills,
                    "ArtisticExpression": entry.avg_ArtisticExpression,
                    "MovementPlay": entry.avg_MovementPlay
                }
                for entry in feedback_data
            ]
        }

        return jsonify(result), 200

    except ValueError:
        return jsonify({"error": "Invalid request parameters"}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

