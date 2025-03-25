from app import db, app
from models import Program, Educator, Student, Admin
from faker import Faker
from datetime import date, timedelta
import random

with app.app_context():
    fake = Faker()

    # Reset the database (optional but good for dev)
    db.drop_all()
    db.create_all()

    # --- Add Programs ---
    programs = [
        Program(ProgramName='Autism Support'),
        Program(ProgramName='Speech Therapy'),
        Program(ProgramName='Occupational Therapy'),
    ]
    db.session.add_all(programs)
    db.session.commit()

    # --- Add Educators ---
    educators = []
    for _ in range(10):
        program = random.choice(programs)
        educator = Educator(
            Name=fake.name(),
            Email=fake.unique.email(),
            ProgramID=program.ProgramID,
            Designation=random.choice(['Special Educator', 'Therapist', 'Trainer']),
            Phone=fake.msisdn()[:10],
            HighEducationQualification=random.choice(['B.Ed', 'M.Ed', 'MA Psychology', 'Diploma']),
            DateOfBirth=fake.date_of_birth(minimum_age=25, maximum_age=50),
            DateOfJoining=fake.date_between(start_date='-5y', end_date='-1y'),
            Status='Active',
            Tenure=random.randint(1, 5),
            WorkLocation=fake.city(),
            EmergencyContactName=fake.name(),
            EmergencyContactNumber=fake.msisdn()[:10],
            BloodGroup=random.choice(['A+', 'B+', 'O+', 'AB+']),
            IsRegistered=True,
            Password='temp123'
        )
        educator.set_password('password123')
        educators.append(educator)

    db.session.add_all(educators)
    db.session.commit()


    # --- Add Admin Users ---
    admins = [
        Admin(
            AdminName="Super Admin",
            Email="admin@example.com",
            PasswordHash="admin123"
        ),
        Admin(
            AdminName="Support Admin",
            Email="support@example.com",
            PasswordHash="support123"
        )
    ]
    
    for admin in admins:
        admin.set_password('test123')
        
    db.session.add_all(admins)
    db.session.commit()

    # --- Add Students ---
    students = []
    for _ in range(20):
        program = random.choice(programs)
        primary_educator = random.choice(educators)
        secondary_educator = random.choice(educators)
        student = Student(
            FirstName=fake.first_name(),
            LastName=fake.last_name(),
            Gender=random.choice(['M', 'F']),
            DateOfBirth=fake.date_of_birth(minimum_age=5, maximum_age=18),
            DateOfJoining=fake.date_between(start_date='-5y', end_date='-1y'),
            EmailID=fake.unique.email(),
            ProgramID=program.ProgramID,
            PrimaryEducatorID=primary_educator.EducatorID,
            SecondaryEducatorID=secondary_educator.EducatorID if secondary_educator != primary_educator else None,
            Status=random.choice(['Active', 'Graduated', 'Discontinued']),
            IsRegistered=True,
            Password='temp123',
            CurrentLevel=random.choice(['Beginner', 'Intermediate', 'Advanced']),
            ContactNumber=fake.msisdn()[:10],
            ParentsEmail=fake.email(),
            Address=fake.address(),
            PreferredLanguage=random.choice(['English', 'Hindi', 'Tamil', 'Telugu']),
            LearningStyle=random.choice(['Visual', 'Auditory', 'Kinesthetic']),
            PreferredCommunicationStyle=random.choice(['Verbal', 'Non-verbal']),
            ParentAnnualIncome=random.randint(100000, 800000),
        )
        student.set_password('password123')
        students.append(student)

    db.session.add_all(students)
    db.session.commit()

    print("Faker mock data seeded successfully!")