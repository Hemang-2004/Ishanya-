from flask import Blueprint, request, jsonify
from models import db, Educator, Student, Admin
from flask_jwt_extended import create_access_token
from werkzeug.utils import secure_filename
import os
from ocr import parse_aadhar, parse_cv


auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if role == 'admin':
        user = Admin.query.filter_by(Email=email).first()
    elif role == 'educator':
        user = Educator.query.filter_by(Email=email).first()
    else:
        user = Student.query.filter_by(EmailID=email).first()

    # Check if user exists but is not registered
    if role != 'admin' and user and user.IsRegistered is None or user.IsRegistered is False:
        return jsonify({"error": "You will be allowed to login once the admin has registered you."}), 403

    # Ensure IsRegistered is True
    if user:
        if user.check_password(password):
            token = create_access_token(identity={"id": user.get_id(), "role": role})
            return jsonify({"token": token, "role": role}), 200

    return jsonify({"error": "Invalid credentials"}), 401



def validate_required_fields(data, required_fields):
    """Check if all required fields are present in the request data."""
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

@auth_bp.route("/register/educator", methods=["POST"])
def register_educator():
    """Handles registration for Educators."""
    try:
        data = request.get_json()

        # Required Fields
        required_fields = ["Name", "Email", "Password"]
        validate_required_fields(data, required_fields)

        # Create Educator with required fields
        educator = Educator(
            Name=data["Name"],
            Email=data["Email"]
        )
        educator.set_password(data["Password"])  # Hash password using model method

        # Fill optional fields if provided
        optional_fields = [
            "Photo", "Designation", "ProgramID", "Phone", "HighEducationQualification",
            "DateOfBirth", "DateOfJoining", "DateOfLeaving", "Status", "Tenure",
            "WorkLocation", "EmergencyContactName", "EmergencyContactNumber", "BloodGroup"
        ]
        for field in optional_fields:
            if field in data:
                setattr(educator, field, data[field])

        db.session.add(educator)
        db.session.commit()

        return jsonify({"message": "Educator registered successfully!"}), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": "An error occurred. Please try again."}), 500


@auth_bp.route("/register/student", methods=["POST"])
def register_student():
    """Handles registration for Students."""
    try:
        data = request.get_json()

        # Required Fields
        required_fields = ["FirstName", "LastName", "Gender", "EmailID", "Password"]
        validate_required_fields(data, required_fields)

        # Create Student with required fields
        student = Student(
            FirstName=data["FirstName"],
            LastName=data["LastName"],
            Gender=data["Gender"],
            EmailID=data["EmailID"]
        )
        student.set_password(data["Password"])  # Hash password using model method

        # Fill optional fields if provided
        optional_fields = [
            "DateOfBirth", "Photo", "PrimaryDiagnosis", "Comorbidity", "UDID",
            "Enrollment", "Status", "IntegrationType", "ProgramID", "CurrentLevel",
            "Attendance", "DaysOfWeek", "PrimaryEducatorID", "SecondaryEducatorID",
            "FathersName", "MothersName", "BloodGroup", "Allergies", "ContactNumber",
            "AltContactNumber", "ParentsEmail", "Address", "Transport", "Strengths",
            "Weaknesses", "PreferredLanguage", "AssistiveDevices", "LearningStyle",
            "PreferredCommunicationStyle", "ParentAnnualIncome"
        ]
        for field in optional_fields:
            if field in data:
                setattr(student, field, data[field])

        db.session.add(student)
        db.session.commit()

        return jsonify({"message": "Student registered successfully!"}), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": "An error occurred. Please try again."}), 500


UPLOAD_FOLDER = "uploads/"
ALLOWED_EXTENSIONS_CV = {"pdf", "jpg", "jpeg", "png"}
ALLOWED_EXTENSIONS_AADHAR = {"jpg", "jpeg", "png"}


if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file_CV(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_CV

def allowed_file_aadhar(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_AADHAR

@auth_bp.route("/parse_aadhar", methods=["POST"])
def parse_aadhar_api():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file_aadhar(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        try:
            parsed_data = parse_aadhar(file_path)
            parsed_data["filename"] = filename
            return jsonify(parsed_data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file type"}), 400

@auth_bp.route("/parse_resume", methods=["POST"])
def parse_resume_api():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file_CV(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        try:
            parsed_data = parse_cv(file_path)
            parsed_data["filename"] = filename
            return jsonify(parsed_data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file type"}), 400
