from flask import Blueprint, request, jsonify
from models import db, Student

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
