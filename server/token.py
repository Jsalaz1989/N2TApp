from itsdangerous import URLSafeTimedSerializer

from flask import current_app


def generate_confirmation_token(email):

    app = current_app._get_current_object()

    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])


def confirm_token(token, expiration=3600):

    app = current_app._get_current_object()

    print('app.config["SECRET_KEY"] = ', app.config["SECRET_KEY"])
    print('token = ', token)

    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except Exception as exception:
        print('Exception in confirm_token: ', type(exception).__name__)
        return False
    return email