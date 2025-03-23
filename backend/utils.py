from models import *
from sqlalchemy import func, text

def num_registered_students():
    return Student.query.filter_by(IsRegistered=True, Status='Active').count()

def num_dropouts():
    return Student.query.filter_by(IsRegistered=True, Status='Discontinued').count()

def students_enrolled_programwise():
    return db.session.query(
        Program.ProgramName,
        func.count(Student.StudentID)
    ).join(Student).filter(
        Student.IsRegistered == True,
        Student.Status == 'Active'
    ).group_by(Program.ProgramID).all()

def students_graduated_programwise():
    return db.session.query(
        Program.ProgramName,
        func.count(Student.StudentID)
    ).join(Student).filter(
        Student.IsRegistered == True,
        Student.Status == 'Graduated'
    ).group_by(Program.ProgramID).all()

def num_educators_programwise():
    return db.session.query(
        Program.ProgramName,
        func.count(Educator.EducatorID)
    ).join(Educator).group_by(Program.ProgramID).all()

def num_students_per_educator():
    total_educators = Educator.query.count()
    total_students = Student.query.filter_by(IsRegistered=True, Status='Active').count()

    if total_educators == 0:
        return None
    return total_students / total_educators

def top_performers():
    sql = """
    WITH feedback_ranked AS (
        SELECT *,
            (TPS + Attendance + OrganizationPlanning + 
                TimeManagement + TaskInitiationCompletion + 
                SelfCareIndependence + PeerInteraction + 
                EmpathyPerspectiveTaking + FocusAttention + 
                CuriosityInquiry + PersistenceProblemSolving + 
                CommunicationSkills + ArtisticExpression + 
                MovementPlay) AS total_score,
            RANK() OVER (PARTITION BY StudentID ORDER BY Date DESC) AS score_rank
        FROM feedback
    ),

    feedback_diff AS (
        SELECT 
            f1.StudentID,
            f1.total_score AS latest_score,
            f2.total_score AS previous_score,
            (f1.total_score - f2.total_score) AS score_diff
        FROM feedback_ranked f1
        LEFT JOIN feedback_ranked f2 
            ON f1.StudentID = f2.StudentID AND f2.score_rank = 2
        WHERE f1.score_rank = 1
    )

    SELECT StudentID
    FROM feedback_diff
    ORDER BY score_diff DESC
    LIMIT 10;
    """

    result = db.session.execute(text(sql))
    return [row[0] for row in result]

def top_educators():
    sql = """
    SELECT 
        e.EducatorID,
        e.Name,
        COUNT(s.StudentID) AS graduated_students
    FROM educator e
    LEFT JOIN student s ON s.PrimaryEducatorID = e.EducatorID
    WHERE s.Status = 'Graduated'
    GROUP BY e.EducatorID
    ORDER BY graduated_students DESC
    LIMIT 10;
    """

    result = db.session.execute(text(sql))


    return [
        {'EducatorID': row[0], 'Name': row[1], 'GraduatedStudents': row[2]}
        for row in result
    ]

def num_educators():
    return Educator.query.count()

def completion_rate():
    return num_registered_students() * 100 / (num_registered_students() + num_dropouts())

def active_programs():
    return Program.query.count()