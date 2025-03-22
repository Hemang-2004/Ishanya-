from app import app, db
from models import Educator

# Run inside the Flask app context
with app.app_context():
    # Create a test educator
    test_educator = Educator(
        EducatorID="E0001",
        Name="John Doe",
        Email="john@example.com",
        Phone="1234567890",
        Password="password123" 
    )
    test_educator.set_password("password123")  # Hash the password

    # Add to the database
    db.session.add(test_educator)
    db.session.commit()

    print("Educator added successfully!")
