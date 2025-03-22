from flask import Flask
from config import Config
from models import db
from routes import register_routes
from flask_jwt_extended import JWTManager  # Import JWTManager

app = Flask(__name__)
app.config.from_object(Config)

# Initialize database
db.init_app(app)

# Initialize JWT
jwt = JWTManager(app)

# Register routes
register_routes(app)

@app.route('/')  # Test route
def home():
    return "Flask app is working"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
