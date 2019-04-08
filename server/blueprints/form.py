from flask import render_template, Blueprint, request
import json

formBlueprint = Blueprint('form',__name__)

@formBlueprint.route('/form', methods=["GET", "POST"])
def index():

    if request.method == 'GET':
        #return render_template("index.html")
        return 'fag'
        
    elif request.method == 'POST':
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
