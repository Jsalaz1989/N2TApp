from flask import render_template, url_for

from . import homeBlueprint


@homeBlueprint.route('/')
def index():

    return render_template('index.html')
