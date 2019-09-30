from flask import Flask, render_template
from .models import db, User, Role, migrate
from flask_security import Security, SQLAlchemyUserDatastore
from flask_cors import CORS


from os.path import abspath

from .email import mail

from .config import DevelopmentConfig

#Config = 'config.DevelopmentConfig'
#def create_app(config_class=Config):
def create_app(config_class=DevelopmentConfig):


    # Load Flask app    
    app = Flask(__name__, instance_path=abspath('.'), instance_relative_config=True)



    
    # Register the blueprints
    with app.app_context():
       
        # Load configuration
        #print('config_class = ', abspath(config_class))
        app.config.from_object(config_class)

        # Import blueprints (NOTE: needs to be here after app.config)
        from .blueprints.home import homeBlueprint
        from .blueprints.auth import authBlueprint

        app.register_blueprint(homeBlueprint)
        app.register_blueprint(authBlueprint)

    # Catch-all chooses client routes (React) over server routes (Flask)
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return render_template('index.html')
        #return 'You want path: %s' % path

    # Initialize database
    db.init_app(app)

    # Initialize database migration
    migrate.init_app(app, db)
    
    # Initialize mail service
    mail.init_app(app)
        
    # Setup Flask-Security
    userDatastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, userDatastore)     # must be after loading everything into app, like registering blueprints
    CORS(app)
    
    return app