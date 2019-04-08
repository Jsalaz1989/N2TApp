#from flask import Blueprint, request, jsonify
from flask import Blueprint, request, render_template, session, jsonify, redirect, url_for, abort
from flask_security import login_user
from flask_security.utils import verify_password
from models import User

loginBlueprint = Blueprint('login',__name__)

@loginBlueprint.route('/login', methods=["GET", "POST"])
def login():

	if request.method == 'GET':
		return render_template('login.html')
	
	elif request.method == 'POST':

		email = request.form.get("email")
		user = User.query.filter_by(email=email).first()
		print("user = ", user)

		if not user:
			return abort(401)

		attemptedPassword = request.form.get("password")
		storedPassword = user.password
		print("storedPassowrd = ", storedPassword)

		if not verify_password(attemptedPassword, storedPassword):
			return abort(401)

		login_user(user)

		print('user.is_authenticated = ', user.is_authenticated)

		#session['email'] = email
		#print("session = ", session)
		
		next = request.args.get('next')
		print("next = ", next)
		
		if next:
			print('redirecting')
			return redirect(next)
		
		return 'bleh'