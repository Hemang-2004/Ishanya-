# from flask import Blueprint, request, jsonify
# from models import db, Educator, Student
# from flask_jwt_extended import create_access_token

# auth_bp = Blueprint("auth", __name__)

# @auth_bp.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     # Check if user is an Educator
#     user = Educator.query.filter_by(Email=email).first()
#     role = "educator" if user else None

#     # not an Educator
#     if not user:
#         user = Student.query.filter_by(EmailID=email).first()
#         role = "student" if user else None

#     if user and user.check_password(password):
#         token = create_access_token(identity={"id": user.get_id(), "role": role})
#         return jsonify({"token": token, "role": role}), 200

#     return jsonify({"error": "Invalid credentials"}), 401


from flask import Blueprint, request, jsonify
from models import db, Educator, Student, Admin
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Check if user is an Admin
    user = Admin.query.filter_by(Email=email).first()
    role = "admin" if user else None

    # If not Admin, check if Educator
    if not user:
        user = Educator.query.filter_by(Email=email).first()
        role = "educator" if user else None

    # If not Educator, check if Student
    if not user:
        user = Student.query.filter_by(EmailID=email).first()
        role = "student" if user else None

    if user and user.check_password(password):
        token = create_access_token(identity={"id": user.get_id(), "role": role})
        return jsonify({"token": token, "role": role}), 200

    return jsonify({"error": "Invalid credentials"}), 401
