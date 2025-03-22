from flask import Blueprint, request, jsonify
from models import db, Educator, Student, Admin
from flask_jwt_extended import create_access_token

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

    if user and user.check_password(password):
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
            "PreferredCommunicationStyle", "IsRegistered", "ParentAnnualIncome"
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