from datetime import datetime, timezone
from sqlalchemy import text
from flask import Blueprint, request, jsonify
from models import Educator, Program, Student, db, Admin
from utils import *
from werkzeug.utils import secure_filename
import pandas as pd
import bcrypt


admin_bp = Blueprint("admin", __name__)


ALLOWED_COLUMNS = {
    'FirstName', 'LastName', 'DateOfBirth', 'Gender', 'EmailID', 'ProgramID',
    'DateOfJoining', 'ContactNumber', 'ParentsEmail', 'Address'
}

# Route to handle bulk upload
def convert_date(date_value):
    """ Converts a date value to a Python date object (YYYY-MM-DD format) """
    if pd.isna(date_value):  # Handle missing values
        return None
    if isinstance(date_value, int):  # If the date is stored as an integer (e.g., 20230901)
        date_value = str(date_value)  # Convert to string
    if isinstance(date_value, str):
        try:
            return datetime.strptime(date_value, "%Y-%m-%d").date()  # Convert to date object
        except ValueError:
            return None  # Invalid date format, return None
    return None  # Default return for unexpected types

def hash_password(password):
    """Hashes a password using bcrypt."""
    salt = bcrypt.gensalt()  # Generate a salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)  # Hash password
    return hashed_password.decode('utf-8')  # Convert bytes to string

@admin_bp.route('/upload_students', methods=['POST'])
def upload_students():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and (file.filename.endswith('.xlsx') or file.filename.endswith('.csv')):
        filename = secure_filename(file.filename)

        if file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        else:
            df = pd.read_csv(file)

        df = df[list(ALLOWED_COLUMNS.intersection(df.columns))]

        if df.empty:
            return jsonify({'error': 'No valid columns found in the file'}), 400

        students = []
        for _, row in df.iterrows():
            student = Student(
                FirstName=row.get('FirstName'),
                LastName=row.get('LastName'),
                DateOfBirth=convert_date(row.get('DateOfBirth')),  # Convert to date object
                Gender=row.get('Gender'),
                EmailID=row.get('EmailID'),
                ProgramID=row.get('ProgramID'),
                DateOfJoining=convert_date(row.get('DateOfJoining')),  # Convert to date object
                ContactNumber=row.get('ContactNumber'),
                ParentsEmail=row.get('ParentsEmail'),
                Address=row.get('Address'),
                Password=hash_password("Default@123")
            )
            students.append(student)

        try:
            db.session.bulk_save_objects(students)
            db.session.commit()
            return jsonify({'message': 'Students added successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file format. Only .xlsx and .csv allowed'}), 400


@admin_bp.route("/get-feedback-report/<int:studentid>/<int:educatorid>/<int:term>", methods=["GET"])
def get_report(studentid, educatorid, term):
    feedback = Feedback.query.filter_by(StudentID=studentid, EducatorID=educatorid, Term=term).first()

    if not feedback:
        return jsonify({"error": "No feedback found for the given parameters"}), 404

    return jsonify(feedback.to_dict()), 200

@admin_bp.route('/get-all-programs', methods=['GET'])
def get_all_programs():
    programs = Program.query.all()
    return jsonify([{
        "ProgramName": program.ProgramName, 
        "ProgramID": program.ProgramID} 
        for program in programs])

@admin_bp.route('/get-all-students', methods=['GET'])
def get_all_students():
    students = db.session.query(
        Student.StudentID,
        Student.FirstName,
        Student.LastName,
        Student.EmailID,
        Student.Status,
        Student.DateOfJoining,
        Program.ProgramName,
        Educator.Name.label('PrimaryEducatorName')
    ).join(Program, Student.ProgramID == Program.ProgramID)\
     .outerjoin(Educator, Student.PrimaryEducatorID == Educator.EducatorID)\
     .all()

    result = []

    for s in students:
        student_info = {
            "id": s.StudentID,
            "name": f"{s.FirstName} {s.LastName}",
            "email": s.EmailID,
            "program": s.ProgramName,
            "status": s.Status,
            "joined": s.DateOfJoining.strftime("%b %d, %Y") if s.DateOfJoining else None,
            "teacher": s.PrimaryEducatorName
        }

        result.append(student_info)

    return jsonify(result)

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
        "top_educators": top_educators(),
        "num_educators": num_educators(),
        "completion_rate": completion_rate(),
        "active_programs": active_programs()
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




@admin_bp.route('/get-educators-of-program/<int:program_id>', methods=['GET'])
def get_educators_by_program(program_id):
    try:
        program = Program.query.get(program_id)
        if not program:
            return jsonify({"success": False, "message": "Program not found"}), 404

        educators = Educator.query.filter_by(ProgramID=program_id, IsRegistered=True).all()

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
        student.DateOfJoining = datetime.now(timezone.utc)
        student.ProgramID = program_id
        student.PrimaryEducatorID = primary_educator_id
        student.Status = "Active"

        db.session.commit()
        return jsonify({"success": True, "message": "Student approved and assigned to program and educators successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    

def get_students_with_improvement_metric(educator_id=None, program_id=None, status=None, top_n=None):
    try:
        # Filter students based on primary educator or program
        query = Student.query.join(Educator, Student.PrimaryEducatorID == Educator.EducatorID) \
                             .join(Program, Educator.ProgramID == Program.ProgramID) \
                             .add_columns(
                                 Student.StudentID, 
                                 Student.FirstName, 
                                 Student.LastName, 
                                 Student.Status,
                                 Educator.Name.label("primary_educator_name"),
                                 Educator.ProgramID.label("program_id"),
                                 Program.ProgramName.label("program_name"),
                                 Student.SecondaryEducatorID
                             )

        if educator_id:
            query = query.filter(Student.PrimaryEducatorID == educator_id)
        if program_id:
            query = query.filter(Educator.ProgramID == program_id)
        if status:
            query = query.filter(Student.Status.ilike(status))
        
        students = query.all()
        if not students:
            return {"message": "No students found"}, 404

        result = []
        for student in students:
            student_id = student.StudentID
            latest_feedback = db.session.execute(text("""
                SELECT *, 
                    (TPS + Attendance + OrganizationPlanning + TimeManagement + 
                    TaskInitiationCompletion + SelfCareIndependence + PeerInteraction + 
                    EmpathyPerspectiveTaking + FocusAttention + CuriosityInquiry + 
                    PersistenceProblemSolving + CommunicationSkills + ArtisticExpression + 
                    MovementPlay) AS total_score
                FROM feedback WHERE StudentID = :student_id 
                ORDER BY Date DESC LIMIT 1
            """), {"student_id": student_id}).fetchone()

            previous_feedback = db.session.execute(text("""
                SELECT *, 
                    (TPS + Attendance + OrganizationPlanning + TimeManagement + 
                    TaskInitiationCompletion + SelfCareIndependence + PeerInteraction + 
                    EmpathyPerspectiveTaking + FocusAttention + CuriosityInquiry + 
                    PersistenceProblemSolving + CommunicationSkills + ArtisticExpression + 
                    MovementPlay) AS total_score
                FROM feedback WHERE StudentID = :student_id 
                ORDER BY Date DESC LIMIT 1 OFFSET 1
            """), {"student_id": student_id}).fetchone()

            latest_score = latest_feedback.total_score if latest_feedback else 0
            previous_score = previous_feedback.total_score if previous_feedback else 0
            improvement_metric = latest_score - previous_score

            # Fetch secondary educator details
            secondary_educator = Educator.query.filter_by(EducatorID=student.SecondaryEducatorID).first()
            secondary_educator_name = secondary_educator.Name if secondary_educator else None

            result.append({
                "student_id": student_id,
                "name": f"{student.FirstName} {student.LastName}",
                "latest_score": latest_score,
                "previous_score": previous_score,
                "improvement_metric": improvement_metric,
                "program_id": student.program_id,
                "program_name": student.program_name,
                "primary_educator_name": student.primary_educator_name,
                "secondary_educator_name": secondary_educator_name
            })

        # If fetching top performers, return only top N
        if top_n:
            result = sorted(result, key=lambda x: x["improvement_metric"], reverse=True)[:top_n]

        return {"students": result}, 200

    except Exception as e:
        return {"error": str(e)}, 500

# Get Current Students of a primary Educator
@admin_bp.route('/current-students/<int:educator_id>', methods=['GET'])
def get_current_students(educator_id):
    response, status = get_students_with_improvement_metric(educator_id=educator_id, status="Active")
    response["educator_id"] = educator_id
    return jsonify(response), status

# Get Top Performers in a Program
@admin_bp.route('/top-performers/<int:program_id>', methods=['GET'])
def get_top_performers(program_id):
    response, status = get_students_with_improvement_metric(program_id=program_id, status="Active", top_n=10)
    response["program_id"] = program_id
    return jsonify(response), status


@admin_bp.route('/get-programs', methods=['GET'])
def get_programs():
    try:
        programs = Program.query.all()
        programs_list = [
            {"id": p.ProgramID, "name": p.ProgramName}
            for p in programs
        ]
        return jsonify({"success": True, "programs": programs_list}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500