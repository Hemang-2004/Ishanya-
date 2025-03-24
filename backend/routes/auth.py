from flask import Blueprint, request, jsonify
from models import db, Educator, Student, Admin
from flask_jwt_extended import create_access_token
from werkzeug.utils import secure_filename
import os
from ocr import parse_aadhar, parse_cv
from datetime import datetime, timezone


auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if role == 'admin':
        user = Admin.query.filter_by(Email=email).first()
    elif role == 'teacher':
        user = Educator.query.filter_by(Email=email).first()
    else:
        user = Student.query.filter_by(EmailID=email).first()

    # Check if user exists but is not registered

    # if role != 'admin' and user and user.IsRegistered is None or user.IsRegistered is False:
        # print("hello")
    if role != 'admin' and user and (user.IsRegistered is None or user.IsRegistered is False):
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

# @auth_bp.route("/register/educator", methods=["POST"])
# def register_educator():
#     """Handles registration for Educators."""
#     try:
#         data = request.get_json()

#         # Required Fields
#         required_fields = ["FirstName", "LastName", "Email", "Password"]
#         validate_required_fields(data, required_fields)

#         # Create Educator with required fields
#         educator = Educator(
#             Name=f"{data["FirstName"]} {data["LastName"]}",
#             Email=data["Email"]
#         )
#         educator.set_password(data["Password"])  # Hash password using model method

#         # Fill optional fields if provided
#         optional_fields = [
#             "Photo", "Designation", "ProgramID", "Phone", "HighEducationQualification",
#             "DateOfBirth", "DateOfJoining", "DateOfLeaving", "Status", "Tenure",
#             "WorkLocation", "EmergencyContactName", "EmergencyContactNumber", "BloodGroup"
#         ]
#         for field in optional_fields:
#             if field in data:
#                 setattr(educator, field, data[field])

#         db.session.add(educator)
#         db.session.commit()

#         return jsonify({"message": "Educator registered successfully!"}), 201

#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400

#     except Exception as e:
#         return jsonify({"error": "An error occurred. Please try again."}), 500

@auth_bp.route("/register/educator", methods=["POST"])
def register_educator():
    """Handles registration for Educators."""
    try:
        data = request.form.to_dict()
        resume_file = request.files.get("resume")
        photo_file = request.files.get("photo")

        # Required Fields
        required_fields = ["FirstName", "LastName", "Email", "Password"]
        validate_required_fields(data, required_fields)

        # Create Educator object
        educator = Educator(
            Name=f'{data["FirstName"]} {data["LastName"]}',
            Email=data["Email"]
        )

        educator.set_password(data["Password"])  # Hash password using model method

        optional_fields = [
            "Designation", "ProgramID", "Phone", "HighEducationQualification",
            "DateOfBirth", "DateOfJoining", "DateOfLeaving", "Status", "Tenure",
            "WorkLocation", "EmergencyContactName", "EmergencyContactNumber", "BloodGroup"
        ]
        
        for field in optional_fields:
            if field in data and data[field] != "":
                if field == "DateOfBirth":
                    setattr(educator, field, datetime.strptime(data[field], "%Y-%m-%d").date())
                else:
                    setattr(educator, field, data[field])
            else:
                setattr(educator, field, None)

        # Handle File Uploads
        if resume_file and allowed_file_CV(resume_file.filename):
            resume_filename = secure_filename(resume_file.filename)
            resume_path = os.path.join(UPLOAD_FOLDER, resume_filename)
            resume_file.save(resume_path)
            educator.CVFilePath = resume_path  # Save path in DB

        if photo_file and allowed_file_aadhar(photo_file.filename):
            photo_filename = secure_filename(photo_file.filename)
            photo_path = os.path.join(UPLOAD_FOLDER, photo_filename)
            photo_file.save(photo_path)
            educator.Photo = photo_path  # Save path in DB

        # Save Educator to DB
        db.session.add(educator)
        db.session.commit()

        return jsonify({"message": "Educator registered successfully!"}), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# @auth_bp.route("/register/student", methods=["POST"])
# def register_student():
#     """Handles registration for Students."""
#     try:
#         data = request.get_json()
#         print("data ", data)
#         # Required Fields
#         required_fields = ["FirstName", "LastName", "Gender", "EmailID", "Password"]
#         validate_required_fields(data, required_fields)

#         # Create Student with required fields
#         student = Student(
#             FirstName=data["FirstName"],
#             LastName=data["LastName"],
#             Gender=data["Gender"],
#             EmailID=data["EmailID"]
#         )
#         student.set_password(data["Password"])  # Hash password using model method

#         # Fill optional fields if provided
#         optional_fields = [
#             "DateOfBirth", "Photo", "PrimaryDiagnosis", "Comorbidity", "UDID",
#             "Enrollment", "Status", "IntegrationType", "ProgramID", "CurrentLevel",
#             "Attendance", "DaysOfWeek", "PrimaryEducatorID", "SecondaryEducatorID",
#             "FathersName", "MothersName", "BloodGroup", "Allergies", "ContactNumber",
#             "AltContactNumber", "ParentsEmail", "Address", "Transport", "Strengths",
#             "Weaknesses", "PreferredLanguage", "AssistiveDevices", "LearningStyle",
#             "PreferredCommunicationStyle", "ParentAnnualIncome"
#         ]
#         # print("second printing....")
#         # for field in optional_fields:
#         #     if field in data:
#         #         print(field, data[field])
#         #         setattr(student, field, data[field])
#         for field in optional_fields:
#             if field in data and data[field] != "":
#                 if field == "DateOfBirth":
#                     setattr(student, field, datetime.strptime(data[field], "%Y-%m-%d").date())
#                 elif field == "ParentAnnualIncome":
#                     setattr(student, field, int(data[field]))
#                 else:
#                     setattr(student, field, data[field])
#         else:
#             setattr(student, field, None)

#         db.session.add(student)
#         db.session.commit()

#         return jsonify({"message": "Student registered successfully!"}), 201

#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400

#     except Exception as e:
#         return jsonify({"error": "An error occurred. Please try again."}), 500



@auth_bp.route("/register/student", methods=["POST"])
def register_student():
    try:
        data = request.form.to_dict()
        id_proof_file = request.files.get("idProof")
        photo_file = request.files.get("Photo")
        required_fields = ["FirstName", "LastName", "Gender", "EmailID", "Password"]
        validate_required_fields(data, required_fields)

        student = Student(
            FirstName=data["FirstName"],
            LastName=data["LastName"],
            Gender=data["Gender"],
            EmailID=data["EmailID"]
        )
        student.set_password(data["Password"])

        if id_proof_file and allowed_file_CV(id_proof_file.filename):
            id_proof_filename = secure_filename(id_proof_file.filename)
            id_proof_path = os.path.join(UPLOAD_FOLDER, id_proof_filename)
            id_proof_file.save(id_proof_path)
            student.AadharFilePath = id_proof_path  # Save file path in DB

        if photo_file and allowed_file_aadhar(photo_file.filename):
            photo_filename = secure_filename(photo_file.filename)
            photo_path = os.path.join(UPLOAD_FOLDER, photo_filename)
            photo_file.save(photo_path)
            student.Photo = photo_path
            print(photo_path)

        # Handle optional fields
        optional_fields = ["DateOfBirth", "PrimaryDiagnosis", "Comorbidity", "UDID",
                           "Enrollment", "Status", "IntegrationType", "ProgramID",
                           "CurrentLevel", "Attendance", "DaysOfWeek", "PrimaryEducatorID",
                           "SecondaryEducatorID", "FathersName", "MothersName", "BloodGroup",
                           "Allergies", "ContactNumber", "AltContactNumber", "ParentsEmail",
                           "Address", "Transport", "Strengths", "Weaknesses",
                           "PreferredLanguage", "AssistiveDevices", "LearningStyle",
                           "PreferredCommunicationStyle", "ParentAnnualIncome"]

        for field in optional_fields:
            if field in data and data[field] != "":
                if field == "DateOfBirth":
                    setattr(student, field, datetime.strptime(data[field], "%Y-%m-%d").date())
                elif field == "ParentAnnualIncome":
                    setattr(student, field, int(data[field]))
                else:
                    setattr(student, field, data[field])
            else:
                setattr(student, field, None)

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
