from flask import Blueprint, request, render_template, session, jsonify, json, redirect, url_for, abort
from flask_security.utils import hash_password, verify_password, login_user
from ...models import db, User

from . import authBlueprint

from ...token import generate_confirmation_token, confirm_token

from ...email import send_email

from datetime import datetime

@authBlueprint.route('/checkUserExists', methods=["POST"])
def checkUserExists():
	
	email = request.data.decode()
	print('email = ', email)

	user = User.query.filter_by(email=email).first()
	print("user = ", user)

	userExists = True
	if not user:
		userExists = False
	print('userExists = ', userExists)
		
	return jsonify(userExists=userExists), 200


@authBlueprint.route('/registerUser', methods=["POST"])
def registerUser():

	requestJSON = request.get_json()
	print('requestJSON = ', requestJSON)

	email = requestJSON['email']
	password = requestJSON['password']

	# print('email = ', email)
	# print('password = ', password)

	newUser = User(email=email, password=hash_password(password))
	db.session.add(newUser)
	db.session.commit()

	token = generate_confirmation_token(newUser.email)
	print('token = ', token)
	
	confirm_url = url_for('auth.confirmUser', token=token, _external=True)
	print('confirm_url = ', confirm_url)

	confEmailText = 'Please click on the link to activate your account: ' + confirm_url
	send_email(subject='Welcome', 
			   recipients=[newUser.email], 
			   text_body=confEmailText, 
			   #html_body='<h1>HTML body</h1>'
			   )

	return jsonify(userRegistered=True)
	#return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 


@authBlueprint.route('/confirmUser')
def confirmUser():
	try:
		token = request.args.get('token')
		print('token = ', token)

		email = confirm_token(token)
		print('email = ', email)
	except:
		print('Token corrupted or expired')
	
	if not email:
		return redirect('/confirmed?email=null')

	print('Querying for user')
	user = User.query.filter_by(email=email).first()
	print('user = ', user)

	if user.active:
		print('Email already confirmed')
	else:
		user.active = True
		user.confirmedAt = datetime.now()
		db.session.commit()
		print('Email confirmed')

	return redirect('http://localhost:3000/registerConfirmed?email='+email)
	# return redirect('/registerConfirmed?email='+email)


@authBlueprint.route('/logInUser', methods=["POST"])
def logInUser():

	requestJSON = request.get_json()
	print('requestJSON = ', requestJSON)

	email = requestJSON['email']
	password = requestJSON['password']

	print('email = ', email)
	print('password = ', password)

	user = User.query.filter_by(email=email).first()
	print("user = ", user)

	if not user.active:
		print('User not activated')
		return jsonify(userLoggedIn=False)

	if not verify_password(password, user.password):
		print('Incorrect password')
		return jsonify(userLoggedIn=False)
		#return json.dumps({'success':True}), 205, {'ContentType':'application/json'} 
	
	print('Logging user in')
	login_user(user)
	
	#return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
	return jsonify(userLoggedIn=True)


@authBlueprint.route('/resetPasswordEmail', methods=["POST"])
def sendResetPasswordEmail():

	requestJSON = request.get_json()
	print('requestJSON = ', requestJSON)

	email = requestJSON['email']
	password = requestJSON['password']

	print('email = ', email)
	print('password = ', password)

	user = User.query.filter_by(email=email).first()
	print("user = ", user)

	token1 = generate_confirmation_token(email)
	print('token1 = ', token1)

	token2 = generate_confirmation_token(password)
	print('token2 = ', token2)

	resetUrl =	url_for('auth.resetPassword', token1=token1, token2=token2, _external=True)

	resetEmailText = 'Please click on the link to reset your account: ' + resetUrl
	send_email(subject='Reset password', 
			recipients=[email], 
			text_body=resetEmailText, 
			)
	 
	#return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
	return jsonify(resetEmailSent=True)


@authBlueprint.route('/resetPassword')
def resetPassword():
	try:
		token1 = request.args.get('token1')
		print('token1 = ', token1)

		email = confirm_token(token1)
		print('email = ', email)
	except:
		print('Token 1 corrupted or expired')

	if not email:
		return redirect('/confirmed?email=null')

	try:
		token2 = request.args.get('token2')
		print('token2 = ', token2)

		newPassword = confirm_token(token2)
		print('newPassword = ', newPassword)
	except:
		print('Token 2 corrupted or expired')
	
	print('Querying for user')
	user = User.query.filter_by(email=email).first()
	print('user = ', user)

	user.password = hash_password(newPassword)
	db.session.commit()
	print('Password reset to ' + newPassword)

	return redirect('http://localhost:3000/resetConfirmed?email='+email)
	# return redirect('/resetConfirmed?email='+email)
