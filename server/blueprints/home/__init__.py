from flask import Blueprint, current_app
from os.path import abspath

# templateFolder = ''
# staticFolder = ''

# print('current_app = ', current_app)


# app = current_app._get_current_object()
# print('app = ', app)

# with app.context():
#     print('app = ', app)

# app = current_app._get_current_object()
# print('app = ', app)

# print('current_app.config = ', current_app.config)

# with app.app_context():
templateFolder = current_app.config['TEMPLATE_FOLDER']
staticFolder = current_app.config['STATIC_FOLDER']

# templateFolder = '../client/public'
# staticFolder = '../client/public'

# templateFolder = '../client/static'
# staticFolder = '../client/public'

# print('name = ', __name__)

# templateFolder = abspath(templateFolder)
# staticFolder = abspath(staticFolder)

# print('templateFolder = ', templateFolder)
# print('staticFolder = ', staticFolder)



homeBlueprint = Blueprint('home', __name__, template_folder=abspath(templateFolder), static_folder=abspath(staticFolder))
#homeBlueprint = Blueprint('home', __name__)


# print('templateFolder = ', abspath(homeBlueprint.template_folder))
# print('staticFolder = ', abspath(homeBlueprint.static_folder))


from . import routes

