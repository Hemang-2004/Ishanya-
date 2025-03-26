from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
import json

db = SQLAlchemy()
bcrypt = Bcrypt()

# class Program(db.Model):
#     __tablename__ = 'program'
#     ProgramID = db.Column(db.Integer, primary_key=True)
#     ProgramName = db.Column(db.String(20), nullable=False)
#     educators = db.relationship('Educator', backref='program', lazy=True)
#     students = db.relationship('Student', backref='program', lazy=True)
#     assessments = db.relationship('Assessment', backref='suggested_program', lazy=True)

class Program(db.Model):
    __tablename__ = 'program'
    
    ProgramID = db.Column(db.Integer, primary_key=True)
    ProgramName = db.Column(db.String(20), nullable=False)
    Description = db.Column(db.Text, nullable=True)
    Category = db.Column(db.String(20), nullable=False, default="education")
    StartDate = db.Column(db.Date, nullable=True)
    EndDate = db.Column(db.Date, nullable=True)
    Status = db.Column(db.String(20), nullable=False, default="active")
    Capacity = db.Column(db.Integer, nullable=True)

    educators = db.relationship('Educator', backref='program', lazy=True)
    students = db.relationship('Student', backref='program', lazy=True)
    assessments = db.relationship('Assessment', backref='suggested_program', lazy=True)


class Educator(UserMixin, db.Model):
    __tablename__ = 'educator'
    EducatorID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-incremented primary key
    Name = db.Column(db.String(30), nullable=False)
    Photo = db.Column(db.String(100))
    Designation = db.Column(db.String(30))
    ProgramID = db.Column(db.Integer, db.ForeignKey('program.ProgramID'))
    Email = db.Column(db.String(50), unique=True, nullable=False)
    Phone = db.Column(db.String(10))
    HighEducationQualification = db.Column(db.String(50))
    DateOfBirth = db.Column(db.Date)
    DateOfJoining = db.Column(db.Date)
    DateOfLeaving = db.Column(db.Date, nullable=True)
    Status = db.Column(db.String(20))
    Tenure = db.Column(db.Integer)
    WorkLocation = db.Column(db.String(50))
    EmergencyContactName = db.Column(db.String(30))
    EmergencyContactNumber = db.Column(db.String(10))
    BloodGroup = db.Column(db.String(3))
    Password = db.Column(db.Text, nullable=False)
    CVFilePath = db.Column(db.String(255), nullable=True)  # Path to CV file

    IsRegistered = db.Column(db.Boolean)

    students_primary = db.relationship('Student', backref='primary_educator', lazy=True, foreign_keys='Student.PrimaryEducatorID')
    students_secondary = db.relationship('Student', backref='secondary_educator', lazy=True, foreign_keys='Student.SecondaryEducatorID')
    assessments = db.relationship('Assessment', backref='educator', lazy=True)
    feedbacks = db.relationship('Feedback', backref='educator', lazy=True)
    chats = db.relationship('Chat', backref='educator', lazy=True)

    def get_id(self):
        return self.EducatorID

    def get_name(self):
        return self.Name

    def set_password(self, password):
        self.Password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.Password, password)

class Student(UserMixin, db.Model):
    __tablename__ = 'student'
    StudentID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-incremented primary key
    FirstName = db.Column(db.String(30), nullable=False)
    LastName = db.Column(db.String(30), nullable=False)
    DateOfBirth = db.Column(db.Date)
    Gender = db.Column(db.String(1), nullable=False)
    Photo = db.Column(db.String(100))
    PrimaryDiagnosis = db.Column(db.String(30))
    Comorbidity = db.Column(db.String(30))
    UDID = db.Column(db.String(3))
    Status = db.Column(db.String(20))
    IntegrationType = db.Column(db.String(30))
    EmailID = db.Column(db.String(50), unique=True, nullable=False)  # Increased length for better email support
    ProgramID = db.Column(db.Integer, db.ForeignKey('program.ProgramID'))
    CurrentLevel = db.Column(db.String(20))
    DateOfJoining = db.Column(db.Date)
    AadharFilePath = db.Column(db.String(255), nullable=True)  # Path to Aadhar file
    UDIDFilePath = db.Column(db.String(255), nullable=True)  # Path to UDID file
    MedicalCertificatePath = db.Column(db.String(255), nullable=True)  # Path to Medical Certificate file
    DaysOfWeek = db.Column(db.Text)
    PrimaryEducatorID = db.Column(db.Integer, db.ForeignKey('educator.EducatorID'))  # Foreign key now references new auto-incremented ID
    SecondaryEducatorID = db.Column(db.Integer, db.ForeignKey('educator.EducatorID'))
    FathersName = db.Column(db.String(30))
    MothersName = db.Column(db.String(30))
    BloodGroup = db.Column(db.String(3))
    Allergies = db.Column(db.Text)
    ContactNumber = db.Column(db.String(10))
    AltContactNumber = db.Column(db.String(10))
    ParentsEmail = db.Column(db.String(50))
    Address = db.Column(db.String(100))
    Transport = db.Column(db.String(3))
    # Strengths = db.Column(db.Text)
    # Weaknesses = db.Column(db.Text)
    PreferredLanguage = db.Column(db.String(15))
    AssistiveDevices = db.Column(db.Text)
    LearningStyle = db.Column(db.String(15))
    PreferredCommunicationStyle = db.Column(db.String(20))
    IsRegistered = db.Column(db.Boolean)
    ParentAnnualIncome = db.Column(db.Integer)
    Password = db.Column(db.Text, nullable=False)

    assessments = db.relationship('Assessment', backref='student', lazy=True)
    feedbacks = db.relationship('Feedback', backref='student', lazy=True)
    chats = db.relationship('Chat', backref='student', lazy=True)

    def get_id(self):
        return str(self.StudentID)
    
    def get_name(self):
        return self.FirstName

    def set_password(self, password):
        self.Password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.Password, password)

class Assessment(db.Model):
    __tablename__ = 'assessment'
    AssessmentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StudentID = db.Column(db.Integer, db.ForeignKey('student.StudentID'))
    AssessmentDate = db.Column(db.Date)
    AssessmentTime = db.Column(db.Time)
    EducatorID = db.Column(db.String(6), db.ForeignKey('educator.EducatorID'))
    Location = db.Column(db.String(50))
    SuggestedProgram = db.Column(db.Integer, db.ForeignKey('program.ProgramID'))
    Comments = db.Column(db.Text)

# class Feedback(db.Model):
#     __tablename__ = 'feedback'
#     StudentID = db.Column(db.Integer, db.ForeignKey('student.StudentID'), primary_key=True)
#     EducatorID = db.Column(db.String(6), db.ForeignKey('educator.EducatorID'), primary_key=True)
#     Date = db.Column(db.Date, primary_key=True)
#     Comments = db.Column(db.Text)
#     TPS = db.Column(db.Integer)
#     Attendance = db.Column(db.Integer)
#     OrganizationPlanning = db.Column(db.Integer)
#     TimeManagement = db.Column(db.Integer)
#     TaskInitiationCompletion = db.Column(db.Integer)
#     SelfCareIndependence = db.Column(db.Integer)
#     PeerInteraction = db.Column(db.Integer)
#     EmpathyPerspectiveTaking = db.Column(db.Integer)
#     FocusAttention = db.Column(db.Integer)
#     CuriosityInquiry = db.Column(db.Integer)
#     PersistenceProblemSolving = db.Column(db.Integer)
#     CommunicationSkills = db.Column(db.Integer)
#     ArtisticExpression = db.Column(db.Integer)
#     MovementPlay = db.Column(db.Integer)
#     Strengths = db.Column(db.Text)
#     Weaknesses = db.Column(db.Text)

class Feedback(db.Model):
    __tablename__ = 'feedback'

    StudentID = db.Column(db.Integer, db.ForeignKey('student.StudentID'), primary_key=True)
    EducatorID = db.Column(db.String(6), db.ForeignKey('educator.EducatorID'), primary_key=True)
    Term = db.Column(db.Integer, primary_key=True)
    # Text fields
    Comments = db.Column(db.Text)
    # Strengths = db.Column(db.Text)
    # Weaknesses = db.Column(db.Text)



    # Integer rating fields
    TPS = db.Column(db.Integer)
    Attendance = db.Column(db.Integer)
    # OrganizationPlanning = db.Column(db.Integer)
    # TimeManagement = db.Column(db.Integer)
    # TaskInitiationCompletion = db.Column(db.Integer)
    # SelfCareIndependence = db.Column(db.Integer)
    # PeerInteraction = db.Column(db.Integer)
    # EmpathyPerspectiveTaking = db.Column(db.Integer)
    # FocusAttention = db.Column(db.Integer)
    # CuriosityInquiry = db.Column(db.Integer)
    # PersistenceProblemSolving = db.Column(db.Integer)
    # CommunicationSkills = db.Column(db.Integer)
    # ArtisticExpression = db.Column(db.Integer)
    # MovementPlay = db.Column(db.Integer)

    FeedbackMetrics = db.Column(db.Text, nullable=True)  # Storing JSON as a string

    def __init__(self, StudentID, EducatorID, Comments=None,
                 TPS=None, Attendance=None, Term=None, FeedbackMetrics=None):
        
        self.StudentID = StudentID
        self.EducatorID = EducatorID
        self.Comments = Comments
        self.Term = Term
        # self.Strengths = Strengths
        # self.Weaknesses = Weaknesses
        self.TPS = TPS
        self.Attendance = Attendance
        # self.OrganizationPlanning = OrganizationPlanning
        # self.TimeManagement = TimeManagement
        # self.TaskInitiationCompletion = TaskInitiationCompletion
        # self.SelfCareIndependence = SelfCareIndependence
        # self.PeerInteraction = PeerInteraction
        # self.EmpathyPerspectiveTaking = EmpathyPerspectiveTaking
        # self.FocusAttention = FocusAttention
        # self.CuriosityInquiry = CuriosityInquiry
        # self.PersistenceProblemSolving = PersistenceProblemSolving
        # self.CommunicationSkills = CommunicationSkills
        # self.ArtisticExpression = ArtisticExpression
        # self.MovementPlay = MovementPlay
        self.FeedbackMetrics = json.dumps(FeedbackMetrics) if FeedbackMetrics else json.dumps({})  # Ensure JSON format

    def to_dict(self):
        return {
            "StudentID": self.StudentID,
            "EducatorID": self.EducatorID,
            "Comments": self.Comments,
            # "Strengths": self.Strengths,
            # "Weaknesses": self.Weaknesses,
            "TPS": self.TPS,
            "Attendance": self.Attendance,
            "Term": self.Term,
            # "OrganizationPlanning": self.OrganizationPlanning,
            # "TimeManagement": self.TimeManagement,
            # "TaskInitiationCompletion": self.TaskInitiationCompletion,
            # "SelfCareIndependence": self.SelfCareIndependence,
            # "PeerInteraction": self.PeerInteraction,
            # "EmpathyPerspectiveTaking": self.EmpathyPerspectiveTaking,
            # "FocusAttention": self.FocusAttention,
            # "CuriosityInquiry": self.CuriosityInquiry,
            # "PersistenceProblemSolving": self.PersistenceProblemSolving,
            # "CommunicationSkills": self.CommunicationSkills,
            # "ArtisticExpression": self.ArtisticExpression,
            # "MovementPlay": self.MovementPlay,
            "FeedbackMetrics": json.loads(self.FeedbackMetrics) if self.FeedbackMetrics else {},
        }



class Chat(db.Model):
    __tablename__ = 'chat'
    ChatID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StudentID = db.Column(db.Integer, db.ForeignKey('student.StudentID'))
    EducatorID = db.Column(db.String(6), db.ForeignKey('educator.EducatorID'))
    DateTime = db.Column(db.DateTime)
    SenderType = db.Column(db.String(10), nullable=False)  # 'student' or 'educator'
    Message = db.Column(db.Text)


class Admin(db.Model):
    __tablename__ = "admin"

    AdminID = db.Column(db.Integer, primary_key=True)
    AdminName = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(120), unique=True, nullable=False)
    PasswordHash = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        """Hash and set the password"""
        self.PasswordHash = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        """Check hashed password"""
        return bcrypt.check_password_hash(self.PasswordHash, password)

    def get_id(self):
        """Return the admin's unique identifier"""
        return self.AdminID
    def get_name(self):
        return self.AdminName