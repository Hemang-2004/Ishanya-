from flask import Blueprint, request, jsonify
from models import Chat, Feedback, Program, Student, db, Educator
from datetime import datetime, timezone
import json

educator_bp = Blueprint("educator", __name__)

@educator_bp.route("/", methods=["GET"])
def get_educators():
    educators = Educator.query.all()
    return jsonify([{"id": e.EducatorID, "name": e.Name} for e in educators])

@educator_bp.route("/<educator_id>", methods=["GET"])
def get_educator(educator_id):
    educator = Educator.query.get(educator_id)
    if educator:
        return jsonify({"id": educator.EducatorID, "name": educator.Name})
    return jsonify({"error": "Educator not found"}), 404


def get_graduated_students_data(educator_id=None, program_id=None, use_average=False):
    try:
        if educator_id:
            educators = Educator.query.filter_by(EducatorID=educator_id).all()
        elif program_id:
            educators = Educator.query.filter_by(ProgramID=program_id).all()
        else:
            return jsonify({"error": "Educator ID or Program ID required"}), 400

        if not educators:
            return jsonify({"message": "No educators found"}), 404

        result = []
        for educator in educators:
            students = Student.query.filter(
                Student.PrimaryEducatorID == educator.EducatorID,
                Student.Status.ilike('graduated')
            ).all()

            student_data = []
            for student in students:
                feedbacks = Feedback.query.filter_by(StudentID=student.StudentID).order_by(Feedback.Date.desc()).all()

                if use_average and feedbacks:
                    metrics = {
                        "TPS_metric": sum(f.TPS for f in feedbacks) / len(feedbacks),
                        "attendance": sum(f.Attendance for f in feedbacks) / len(feedbacks),
                    }
                else:
                    latest_feedback = feedbacks[0] if feedbacks else None
                    metrics = {
                        "TPS_metric": latest_feedback.TPS if latest_feedback else None,
                        "attendance": latest_feedback.Attendance if latest_feedback else None,
                    }

                student_data.append({
                    "student_id": student.StudentID,
                    "name": f"{student.FirstName} {student.LastName}",
                    "integration_type": student.IntegrationType,
                    "metrics": metrics
                })

            result.append({
                "educator_id": educator.EducatorID,
                "name": educator.Name,
                "num_graduated_students": len(students),
                "graduated_students": student_data
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@educator_bp.route('/educators-and-graduates/<int:program_id>', methods=['GET']) 
def get_educators_and_graduates(program_id):
    return get_graduated_students_data(program_id=program_id, use_average=True) 


@educator_bp.route('/graduated-students/<int:educator_id>', methods=['GET'])
def get_graduated_students_of_an_educator(educator_id):
    return get_graduated_students_data(educator_id=educator_id, use_average=True)


# @educator_bp.route('/give-feedback/<int:educator_id>/<int:student_id>', methods=['POST'])
# def submit_feedback(educator_id, student_id):
#     try: 
#         data = request.json
        
#         required_fields = [
#             "TPS", "Attendance", "OrganizationPlanning", "TimeManagement", 
#             "TaskInitiationCompletion", "SelfCareIndependence", "PeerInteraction", 
#             "EmpathyPerspectiveTaking", "FocusAttention", "CuriosityInquiry", 
#             "PersistenceProblemSolving", "CommunicationSkills", 
#             "ArtisticExpression", "MovementPlay", "Comments"
#         ]
        
#         if not all(field in data for field in required_fields):
#             return jsonify({"error": "Missing required fields"}), 400
        
#         # Validate the range (1-5) for numeric fields
#         for field in required_fields[:-1]:  # Exclude "Comments"
#             if not (1 <= data[field] <= 5):
#                 return jsonify({"error": f"Invalid value for {field}, must be between 1 and 5"}), 400

#         new_feedback = Feedback(
#             StudentID = student_id,
#             EducatorID = educator_id,
#             TPS = data["TPS"],
#             Attendance = data["Attendance"],
#             OrganizationPlanning = data["OrganizationPlanning"],
#             TimeManagement = data["TimeManagement"],
#             TaskInitiationCompletion = data["TaskInitiationCompletion"],
#             SelfCareIndependence = data["SelfCareIndependence"],
#             PeerInteraction = data["PeerInteraction"],
#             EmpathyPerspectiveTaking = data["EmpathyPerspectiveTaking"],
#             FocusAttention = data["FocusAttention"],
#             CuriosityInquiry = data["CuriosityInquiry"],
#             PersistenceProblemSolving = data["PersistenceProblemSolving"],
#             CommunicationSkills = data["CommunicationSkills"],
#             ArtisticExpression = data["ArtisticExpression"],
#             MovementPlay = data["MovementPlay"],
#             Comments = data["Comments"],
#             Date = datetime.now(timezone.utc)
#         )

#         db.session.add(new_feedback)
#         db.session.commit()

#         return jsonify({"message": "Feedback submitted successfully"}), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@educator_bp.route('/give-feedback/<int:educator_id>/<int:student_id>', methods=['POST'])
def submit_feedback(educator_id, student_id):
    try:
        data = request.json

        required_fields = [
            "TPS", "Attendance", "OrganizationPlanning", "TimeManagement",
            "TaskInitiationCompletion", "SelfCareIndependence", "PeerInteraction",
            "EmpathyPerspectiveTaking", "FocusAttention", "CuriosityInquiry",
            "PersistenceProblemSolving", "CommunicationSkills",
            "ArtisticExpression", "MovementPlay", "Comments"
        ]

        # Validate that all required fields exist in request data
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Validate range (1-5) for numeric fields
        for field in required_fields[:-1]:  # Exclude "Comments"
            if not (1 <= data[field] <= 5):
                return jsonify({"error": f"Invalid value for {field}, must be between 1 and 5"}), 400

        # Extract additional feedback metrics as JSON
        feedback_metrics = data.get("FeedbackMetrics", {})

        # Create Feedback object
        new_feedback = Feedback(
            StudentID=student_id,
            EducatorID=educator_id,
            Date=datetime.now(timezone.utc),
            TPS=data["TPS"],
            Attendance=data["Attendance"],
            OrganizationPlanning=data["OrganizationPlanning"],
            TimeManagement=data["TimeManagement"],
            TaskInitiationCompletion=data["TaskInitiationCompletion"],
            SelfCareIndependence=data["SelfCareIndependence"],
            PeerInteraction=data["PeerInteraction"],
            EmpathyPerspectiveTaking=data["EmpathyPerspectiveTaking"],
            FocusAttention=data["FocusAttention"],
            CuriosityInquiry=data["CuriosityInquiry"],
            PersistenceProblemSolving=data["PersistenceProblemSolving"],
            CommunicationSkills=data["CommunicationSkills"],
            ArtisticExpression=data["ArtisticExpression"],
            MovementPlay=data["MovementPlay"],
            Comments=data["Comments"],
            FeedbackMetrics=json.dumps(feedback_metrics)  # Save as JSON string
        )

        db.session.add(new_feedback)
        db.session.commit()

        return jsonify({"message": "Feedback submitted successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@educator_bp.route('/get-educators', methods=['GET'])
def get_all_educators():
    try:
        educators = (
            db.session.query(Educator, Program.ProgramName)
            .join(Program, Educator.ProgramID == Program.ProgramID)
            .filter(Educator.IsRegistered == True)
            .all()
        )

        if not educators:
            return jsonify({"message": "No educators found"}), 404

        educator_list = [{
            "educator_id": educator.EducatorID,
            "name": educator.Name, 
            "program_id": educator.ProgramID,
            "program_name": program_name
        } for educator, program_name in educators]

        return jsonify({"educators": educator_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

# @educator_bp.route('/students/<int:educator_id>', methods=['GET'])
# def get_students_for_educator(educator_id):
#     try:
#         students = Student.query.filter(Student.PrimaryEducatorID == educator_id).all()
#         print(students)
#         if not students:
#             return jsonify({"message": "No students found"}), 404

#         student_list = [{
#             "student_id": student.StudentID,
#             "name": f"{student.FirstName} {student.LastName}",
#             "program_id": student.ProgramID,
#         } for student in students]

#         return jsonify({"educator_id": educator_id, "students": student_list}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
@educator_bp.route('/students/<int:educator_id>', methods=['GET'])
def get_students_for_educator(educator_id):
    try:
        students = Student.query.filter(Student.PrimaryEducatorID == educator_id).all()
        
        if not students:
            return jsonify({"message": "No students found"}), 404

        # Creating the student list with program names
        student_list = []
        for student in students:
            # Fetch the program name from the Program table
            program = Program.query.filter_by(ProgramID=student.ProgramID).first()
            program_name = program.ProgramName if program else "Unknown Program"
            status = 'active' if student.Status == 'Active' or student.Status == 'Graduated' else 'at-risk'

            student_data = {
                "student_id": student.StudentID,
                "email": student.EmailID,
                "name": f"{student.FirstName} {student.LastName}",
                "program_id": student.ProgramID,
                "program_name": program_name,  # Adding the program name to the student data
                "status": status  # Adding the student's status (active or at-risk)
            }
            student_list.append(student_data)

        return jsonify({"educator_id": educator_id, "students": student_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@educator_bp.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        student_id = data.get('student_id')
        educator_id = data.get('educator_id')
        message = data.get('message')

        if not student_id or not educator_id or not message:
            return jsonify({"error": "Missing required fields"}), 400

        new_message = Chat(
            StudentID=student_id,
            EducatorID=educator_id,
            Message=message,
            DateTime=datetime.now(timezone.utc)
        )

        db.session.add(new_message)
        db.session.commit()

        return jsonify({"message": "Message sent successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


