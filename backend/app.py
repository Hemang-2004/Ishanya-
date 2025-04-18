from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import register_routes
from flask_jwt_extended import JWTManager  # Import JWTManager

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize database
db.init_app(app)

# Initialize JWT
jwt = JWTManager(app)

# Register routes
register_routes(app)

@app.route('/')  # Test route
def home():
    return "Flask app is working"

# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)


#I AM COMMENTING THIS FOR THE MOBILE USEAGE BELOW AS I AM USING MOBILE I HAVE ADDED MY SNIPPET

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)

