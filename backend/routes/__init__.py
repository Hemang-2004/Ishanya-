from .auth import auth_bp
from .educator import educator_bp
from .student import student_bp
from .admin import admin_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(educator_bp, url_prefix="/educators")
    app.register_blueprint(student_bp, url_prefix="/students")
    app.register_blueprint(admin_bp, url_prefix="/admins")
    