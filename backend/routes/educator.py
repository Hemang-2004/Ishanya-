from flask import Blueprint, request, jsonify
from models import db, Educator

educator_bp = Blueprint("educator", __name__)

@educator_bp.route("/", methods=["GET"])
def get_educators():
    educators = Educator.query.all()
    return jsonify([{"id": e.EducatorID, "name": e.Name} for e in educators])

@educator_bp.route("/<educator_id>", methods=["GET"])
def get_educator(educator_id):
    educator = Educator.query.get(educator_id)
    if educator:
        return jsonify({"id": educator.EducatorID, "name": educator.Name})
    return jsonify({"error": "Educator not found"}), 404
