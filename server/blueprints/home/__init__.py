from flask import Blueprint
from os.path import abspath

templateFolder = '../client/public'
staticFolder = '../client/public'

# templateFolder = '../client/static'
# staticFolder = '../client/public'

# print('name = ', __name__)

templateFolder = abspath(templateFolder)
staticFolder = abspath(staticFolder)

# print('templateFolder = ', templateFolder)
# print('staticFolder = ', staticFolder)



homeBlueprint = Blueprint('home', __name__, template_folder=templateFolder, static_folder=staticFolder)
#homeBlueprint = Blueprint('home', __name__)


# print('templateFolder = ', abspath(homeBlueprint.template_folder))
# print('staticFolder = ', abspath(homeBlueprint.static_folder))


from . import routes

