from flask import Flask
from flask_restx import Api
from models import Notes, User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from notes import notes_ns
from auth import auth_ns
from flask_cors import CORS




def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app)  # Initialize the Flask-Cors extension
    db.init_app(app)  # Initialize the SQLAlchemy extension
    migrate = Migrate(app, db)  # Initialize the Flask-Migrate extension
    JWTManager(app)  # Initialize the Flask-JWT-Extended extension
    api = Api(app, doc='/docs')  # Create the Api instance with Swagger docs enabled
    api.add_namespace(notes_ns)  # Register the notes namespace
    api.add_namespace(auth_ns)  # Register the auth namespace

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db, 
            'Notes': Notes,
            'User': User
            }

    return app