from app import db, app
from models import Program, Educator, Student, Admin, Feedback
from datetime import date, timedelta
import random

feedback_list = []

for _ in range(40):
    feedback_list.append({
        "Punctuality": random.choice(["Always on time", "Mostly on time", "Occasionally late", "Needs improvement"]),
        "Preparedness": random.choice(["Well-prepared for sessions", "Comes prepared but needs reminders", "Sometimes forgets materials", "Needs help organizing"]),
        "BehavioralIssues": random.choice(["None observed", "Occasionally distracted", "Needs redirection", "Difficulty staying focused"]),
        "Assistance": random.choice(["Minimal guidance needed", "Requires occasional redirection", "Needs frequent assistance"]),
        "ParentalSupport": random.choice(["Highly supportive home environment", "Moderate parental involvement", "Limited parental support"]),
        "CommunicationSkills": {
            "FollowingInstructions": round(random.uniform(3, 5), 1),
            "PoliteWords": round(random.uniform(2.5, 5), 1),
            "AskingQuestions": round(random.uniform(2.5, 5), 1),
            "Conversation": round(random.uniform(2.5, 5), 1),
            "Describing": round(random.uniform(3, 5), 1),
            "Commenting": round(random.uniform(2.5, 5), 1),
            "EmotionalCommunication": round(random.uniform(3, 5), 1),
            "SentenceFormation": round(random.uniform(3.5, 5), 1),
            "Notes": random.choice(["", "Needs improvement in conversation", "Working on sentence formation"])
        },
        "CognitionSkills": {
            "Prediction": round(random.uniform(3.5, 5), 1),
            "LogicalSequencing": round(random.uniform(3.5, 5), 1),
            "ProblemSolving": round(random.uniform(3, 5), 1),
            "CauseEffect": round(random.uniform(3.5, 5), 1),
            "DecisionMaking": round(random.uniform(3.5, 5), 1),
            "OddOneOut": round(random.uniform(3.5, 5), 1),
            "Notes": ""
        },
        "AcademicSkills": {
            "EnglishReading": random.choice(["Good", "Needs improvement", "Excellent", "Average"]),
            "EnglishWriting": random.choice(["Good", "Needs improvement", "Excellent", "Average"]),
            "EVS": random.choice(["Good", "Needs improvement", "Excellent", "Average"]),
            "Math": random.choice(["Good", "Needs improvement", "Excellent", "Average"])
        },
        "FunctionalSkills": {
            "CopyingDrawing": round(random.uniform(3, 5), 1),
            "Pasting": round(random.uniform(3, 5), 1),
            "Folding": round(random.uniform(3, 5), 1),
            "Cutting": round(random.uniform(3, 5), 1),
            "KitchenUtensils": round(random.uniform(3, 5), 1),
            "Ingredients": round(random.uniform(3, 5), 1),
            "Pouring": round(random.uniform(3, 5), 1),
            "Scooping": round(random.uniform(3, 5), 1),
            "PersonalHygiene": round(random.uniform(3, 5), 1),
            "FoldingClothes": round(random.uniform(3, 5), 1),
            "FillingWater": round(random.uniform(3, 5), 1),
            "Packing": round(random.uniform(3, 5), 1),
            "Wiping": round(random.uniform(3, 5), 1),
            "GroupActivities": round(random.uniform(3, 5), 1),
            "Notes": ""
        },
        "Extracurricular": random.choice(["Enjoys music and dance", "Enjoys storytelling", "Loves sports", "Engages in creative arts", ""]),
        "Strengths": random.choice(["Good problem-solving skills", "Strong logical reasoning", "Creative thinker", "Good leadership skills", ""]),
        "LearningEnvironment": random.choice(["Engaged in interactive learning", "Responds well to structured tasks", "Needs more hands-on learning", "Prefers independent work"])
    })


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

    FirstNames = [
        "Aarav", "Vihaan", "Ishaan", "Rohan", "Arjun", "Reyansh", "Advait", "Dhruv", "Kabir", "Neil",
        "Kunal", "Harsh", "Yash", "Ritik", "Pranav", "Ayaan", "Om", "Shaurya", "Manav", "Aryan",
        "Anaya", "Myra", "Siya", "Ira", "Aadhya", "Kiara", "Tara", "Riya", "Saanvi", "Meera",
        "Avni", "Pari", "Charvi", "Jiya", "Mira", "Nisha", "Pihu", "Trisha", "Zara", "Vanya"
    ]

    LastNames = [
        "Kumar", "Sharma", "Verma", "Singh", "Gupta", "Mishra", "Reddy", "Nair", "Bose", "Mehta",
        "Iyer", "Chopra", "Menon", "Banerjee", "Joshi", "Patel", "Das", "Pillai", "Malhotra", "Desai",
        "Bhat", "Ghosh", "Chatterjee", "Roy", "Dutta", "Saxena", "Sengupta", "Tiwari", "Bajaj", "Bhandari",
        "Chowdhury", "Kulkarni", "Thakur", "Naidu", "Pandey", "Mahajan", "Jain", "Goel", "Bhattacharya", "Shukla"
    ]

    Genders = [
        "Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male",
        "Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male",
        "Female", "Female", "Female", "Female", "Female", "Female", "Female", "Female", "Female", "Female",
        "Female", "Female", "Female", "Female", "Female", "Female", "Female", "Female", "Female", "Female"
    ]

    for i in range(40):
        program = random.choice(programs)
        primary_educator = random.choice(educators)
        secondary_educator = random.choice(educators)
        student = Student(
            FirstName=FirstNames[i],
            LastName=LastNames[i],
            Gender=Genders[i],
            DateOfBirth=date.today() - timedelta(days=random.randint(2000, 6000)),
            DateOfJoining=date.today() - timedelta(days=random.randint(100, 365)),
            EmailID=f"{FirstNames[i].lower()}.{LastNames[i].lower()}@school.edu",
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
            FeedbackMetrics=feedback_list[i],
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
                FeedbackMetrics=feedback_list[i],
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
