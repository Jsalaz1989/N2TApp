from flask import Blueprint

authBlueprint = Blueprint('auth', __name__)

from . import routes