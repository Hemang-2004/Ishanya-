from flask import Blueprint, request, jsonify
from models import db, Admin

admin_bp = Blueprint("admin", __name__)