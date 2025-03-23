from datetime import datetime, timezone
from sqlalchemy import text
from flask import Blueprint, request, jsonify
from models import Educator, Program, Student, db, Admin
from utils import *

admin_bp = Blueprint("admin", __name__)

@admin_bp.route('/dashboard', methods=['GET'])
def dashboard():
    return jsonify({
        "num_registered_students": num_registered_students(),
        "num_dropouts": num_dropouts(),
        "students_enrolled_programwise": [
            {"program": name, "count": count} for name, count in students_enrolled_programwise()
        ],
        "students_graduated_programwise": [
            {"program": name, "count": count} for name, count in students_graduated_programwise()
        ],
        "num_educators_programwise": [
            {"program": name, "count": count} for name, count in num_educators_programwise()
        ],
        "students_per_educator": num_students_per_educator(),
        "top_performing_students": top_performers(),
        "top_educators": top_educators()
    })


@admin_bp.route('/registration-requests', methods=['GET'])
def get_registration_requests():
    try:
        students = Student.query.filter(
            (Student.IsRegistered == False) | (Student.IsRegistered == None)
        ).all()

        educators = Educator.query.filter(
            (Educator.IsRegistered == False) | (Educator.IsRegistered == None)
        ).all()


        student_data = [
            {
                "id": s.StudentID,  
                "name": f"{s.FirstName} {s.LastName}",
                "gender": s.Gender,
                "email": s.EmailID,
                "phone": s.ContactNumber,
                "address": s.Address,
                "role": "student"
            }
            for s in students
        ]

        educator_data = [
            {
                "id": e.EducatorID,  
                "name": e.Name,
                "email": e.Email,
                "phone": e.Phone,
                "address": e.WorkLocation,
                "role": "educator"
            }
            for e in educators
        ]
        educator_data = []
        print(student_data)
        return jsonify({"success": True, "students": student_data, "educators": educator_data}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500




@admin_bp.route('/reject-registration', methods=['POST'])
def reject_registration():
    try:
        data = request.json
        user_id = data.get("id")
        role = data.get("role")  # "student" or "educator"

        if not user_id or role not in ["student", "educator"]:
            return jsonify({"success": False, "message": "Invalid request data"}), 400

        if role == "student":
            student = Student.query.get(user_id)
            if not student:
                return jsonify({"success": False, "message": "Student not found"}), 404

            db.session.delete(student)

        elif role == "educator":
            educator = Educator.query.get(user_id)
            if not educator:
                return jsonify({"success": False, "message": "Educator not found"}), 404

            db.session.delete(educator)

        db.session.commit()
        return jsonify({"success": True, "message": f"{role.capitalize()} rejected and removed successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500



@admin_bp.route('/approve-and-assign-educator', methods=['POST'])
def approve_and_assign_educator():
    try:
        data = request.json
        educator_id = data.get("educator_id")
        program_id = data.get("program_id")

        if not educator_id or not program_id:
            return jsonify({"success": False, "message": "Educator ID and Program ID are required"}), 400

        educator = Educator.query.get(educator_id)
        if not educator:
            return jsonify({"success": False, "message": "Educator not found"}), 404

        if educator.IsRegistered:
            return jsonify({"success": False, "message": "Educator is already registered"}), 400

        program = Program.query.get(program_id)
        if not program:
            return jsonify({"success": False, "message": "Program not found"}), 404

        # Approve and assign educator
        educator.IsRegistered = True
        educator.DateOfJoining = datetime.now(timezone.utc)
        educator.ProgramID = program_id

        db.session.commit()
        return jsonify({"success": True, "message": "Educator approved and assigned to program successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500




@admin_bp.route('/get-educators/<int:program_id>', methods=['GET'])
def get_educators_by_program(program_id):
    try:
        program = Program.query.get(program_id)
        if not program:
            return jsonify({"success": False, "message": "Program not found"}), 404

        educators = Educator.query.filter_by(ProgramID=program_id, isRegistered=True).all()

        educator_list = [
            {"EducatorID": edu.EducatorID, "Name": edu.Name, "Email": edu.Email}
            for edu in educators
        ]

        return jsonify({"success": True, "educators": educator_list}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500





@admin_bp.route('/approve-and-assign-student', methods=['POST'])
def approve_and_assign_student():
    try:
        data = request.json
        student_id = data.get("student_id")
        program_id = data.get("program_id")
        primary_educator_id = data.get("primary_educator_id")
        secondary_educator_id = data.get("secondary_educator_id")  # Optional

        if not student_id or not program_id or not primary_educator_id:
            return jsonify({"success": False, "message": "Student ID, Program ID, and Primary Educator ID are required"}), 400

        student = Student.query.get(student_id)
        if not student:
            return jsonify({"success": False, "message": "Student not found"}), 404

        if student.IsRegistered:
            return jsonify({"success": False, "message": "Student is already registered"}), 400

        program = Program.query.get(program_id)
        if not program:
            return jsonify({"success": False, "message": "Program not found"}), 404

        primary_educator = Educator.query.get(primary_educator_id)
        if not primary_educator or primary_educator.ProgramID != program_id:
            return jsonify({"success": False, "message": "Primary Educator not found or does not belong to the selected program"}), 400

        # Validate secondary educator if provided
        if secondary_educator_id:
            secondary_educator = Educator.query.get(secondary_educator_id)
            if not secondary_educator or secondary_educator.ProgramID != program_id:
                return jsonify({"success": False, "message": "Secondary Educator not found or does not belong to the selected program"}), 400
            student.SecondaryEducatorID = secondary_educator_id  # Update only if valid

        # Approve student and assign program + educators 
        student.IsRegistered = True
        student.Enrollment = datetime.now(timezone.utc)
        student.ProgramID = program_id
        student.PrimaryEducatorID = primary_educator_id

        db.session.commit()
        return jsonify({"success": True, "message": "Student approved and assigned to program and educators successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    
