from app import db, app
from models import Program, Educator, Student, Admin, Feedback
from datetime import date, timedelta
import random

with app.app_context():
    # Reset the database (optional but good for dev)
    db.drop_all()
    db.create_all()

    # --- Add Programs ---
    programs = [
        Program(ProgramName='Sameti', Description='A program focused on pre-academic skills and socialization for children, fostering engagement and foundational learning.'),
        Program(ProgramName='Sattva', Description='A holistic program emphasizing communication, functional academics, and socio-behavioral development.'),
        Program(ProgramName='Siddhi', Description='An intensive cognitive and academic program designed to enhance memory, reasoning, and general awareness.'),
        Program(ProgramName='Shaale', Description='A structured academic program that prioritizes subject proficiency and effective study habits.'),
        Program(ProgramName='Sutantra', Description='A digital literacy program covering basic computing, cybersecurity, and financial literacy skills.'),
        Program(ProgramName='Spruha', Description='A comprehensive development program targeting cognitive skills, communication, and functional life skills.')
    ]
    db.session.add_all(programs)
    db.session.commit()

    # --- Add Educators ---
    educator_names = [
        "Amit Sharma", "Priya Iyer", "Rajesh Kumar", "Sunita Rao", "Vikram Singh",
        "Neha Verma", "Arjun Patel", "Meera Nair", "Ravi Shankar", "Pooja Joshi"
    ]
    educators = []
    for name in educator_names:
        program = random.choice(programs)
        email = name.lower().replace(" ", "_") + "@school.edu"
        educator = Educator(
            Name=name,
            Email=email,
            ProgramID=program.ProgramID,
            Designation=random.choice(['Special Educator', 'Therapist', 'Trainer']),
            Phone=str(random.randint(7000000000, 9999999999)),
            HighEducationQualification=random.choice(['B.Ed', 'M.Ed', 'MA Psychology', 'Diploma']),
            DateOfBirth=date.today() - timedelta(days=random.randint(9000, 18000)),
            DateOfJoining=date.today() - timedelta(days=random.randint(100, 365)),
            Status='Active',
            Tenure=random.randint(1, 5),
            WorkLocation=random.choice(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']),
            EmergencyContactName=random.choice(educator_names),
            EmergencyContactNumber=str(random.randint(7000000000, 9999999999)),
            BloodGroup=random.choice(['A+', 'B+', 'O+', 'AB+']),
            IsRegistered=True,
            Password='temp123'
        )
        educator.set_password('password123')
        educators.append(educator)
    
    db.session.add_all(educators)
    db.session.commit()

    # --- Add Students ---
    students = []
    for i in range(20):
        program = random.choice(programs)
        primary_educator = random.choice(educators)
        secondary_educator = random.choice(educators)
        student = Student(
            FirstName=f"Student{i+1}",
            LastName="Kumar",
            Gender=random.choice(['M', 'F']),
            DateOfBirth=date.today() - timedelta(days=random.randint(2000, 6000)),
            DateOfJoining=date.today() - timedelta(days=random.randint(100, 365)),
            EmailID=f"student{i+1}@school.edu",
            ProgramID=program.ProgramID,
            PrimaryEducatorID=primary_educator.EducatorID,
            SecondaryEducatorID=secondary_educator.EducatorID if secondary_educator != primary_educator else None,
            Status=random.choice(['Active', 'Graduated', 'Discontinued']),
            IsRegistered=True,
            Password='temp123',
            CurrentLevel=random.choice(['Beginner', 'Intermediate', 'Advanced']),
            ContactNumber=str(random.randint(7000000000, 9999999999)),
            ParentsEmail=f"parent{i+1}@school.edu",
            Address="123 Learning Street, India",
            PreferredLanguage=random.choice(['English', 'Hindi', 'Tamil', 'Telugu']),
            LearningStyle=random.choice(['Visual', 'Auditory', 'Kinesthetic']),
            PreferredCommunicationStyle=random.choice(['Verbal', 'Non-verbal']),
            ParentAnnualIncome=random.randint(100000, 800000),
        )
        student.set_password('password123')
        students.append(student)
    
    db.session.add_all(students)
    db.session.commit()

    # --- Add Feedback ---
    feedback_entries = []
    feedback_metrics = ["general", "communication", "cognition", "academics", "functional", "extracurricular", "strengths"]
    for student in students:
        feedback = Feedback(
            StudentID=student.StudentID,
            EducatorID=student.PrimaryEducatorID,
            Term=1,
            Comments=f"Good progress in {random.choice(feedback_metrics)} skills. Needs improvement in {random.choice(feedback_metrics)}.",
            TPS=random.randint(1, 5),
            Attendance=random.randint(30, 59),
            FeedbackMetrics="{" + ", ".join([f'\"{metric}\": {random.randint(1, 5)}' for metric in feedback_metrics]) + "}",
            AIInsights=f"AI suggests focusing on {random.choice(feedback_metrics)} for better results."
        )
        feedback_entries.append(feedback)
        
        # Some students receive feedback for Term 2
        if random.choice([True, False]):
            feedback2 = Feedback(
                StudentID=student.StudentID,
                EducatorID=student.PrimaryEducatorID,
                Term=2,
                Comments=f"Significant improvement in {random.choice(feedback_metrics)}. Can enhance {random.choice(feedback_metrics)} further.",
                TPS=random.randint(1, 5),
                Attendance=random.randint(30, 59),
                FeedbackMetrics="{" + ", ".join([f'\"{metric}\": {random.randint(1, 5)}' for metric in feedback_metrics]) + "}",
                AIInsights=f"AI suggests continued focus on {random.choice(feedback_metrics)}."
            )
            feedback_entries.append(feedback2)
    
    db.session.add_all(feedback_entries)
    db.session.commit()

    # --- Add Admins ---
    admins = [
        Admin(
            AdminName="Admin1",
            Email="admin1@example.com"
        ),
        Admin(
            AdminName="Admin2",
            Email="admin2@example.com"
        )
    ]

    for admin in admins:
        admin.set_password("password123")

    db.session.add_all(admins)
    db.session.commit()

    print("Database seeded successfully with programs, educators, students, and feedback!")
