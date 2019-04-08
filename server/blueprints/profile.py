from flask import Blueprint, request, jsonify, session
from flask_security import login_required
from models import db, User, Role
from json import dumps

profileBlueprint = Blueprint('profile',__name__)

@profileBlueprint.route('/profile/<email>')
@login_required
def profile(email):

	user = User.query.filter_by(email=email).first()
	userJSON = user.serialize
	print("userJSON = ", userJSON)

	print('session = ', session)

	return jsonify(user=userJSON)