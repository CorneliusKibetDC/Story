from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Notes, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, get_jwt_identity, jwt_required

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)  # Initialize the SQLAlchemy extension
migrate = Migrate(app, db)  # Initialize the Flask-Migrate extension
JWTManager(app)  # Initialize the Flask-JWT-Extended extension
api = Api(app, doc='/docs')  # Create the Api instance with Swagger docs enabled

notes_model = api.model(
    "Notes",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "content": fields.String()
    }
)

signup_model=api.model(
    'Signup',
    {
         "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)
login_model=api.model(
    'Login',
    {
         "username": fields.String(),
        "password": fields.String()
    }
)
# Register a Resource with the Api
@api.route('/hello')  # Correct way to define the route in Flask-RESTX
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello, World!"}
@api.route('/signup')
class Signup(Resource):

    @api.expect(signup_model)
    def post(self):
        data=request.get_json()

        username=data.get("username")

        db_user=User.query.filter_by(username=username).first()
        if db_user is not None:
            return jsonify({"message":"Username already exists"})
        new_user = User(
            email=data.get("email"),
            username=data.get("username"),
            password=generate_password_hash(data.get("password"))
        )
        new_user.save()
        return jsonify({"message": "user created sucessfully"})


@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data=request.get_json()
        username=data.get("username")
        password=data.get("password")
        
        db_user=User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return jsonify(
                {"access_token": access_token, "refresh_token":refresh_token}
            )
                

    

@api.route('/notes')
class NotesResource(Resource):
    @api.marshal_with(notes_model)
    def get(self):
        """Get all notes"""
        notes = Notes.query.all()
        return notes
    @api.marshal_with(notes_model)
    @api.expect(notes_model)
    @jwt_required()
    def post(self):
        """Create a new note"""
        data=request.get_json()

        new_note = Notes(
            title=data.get("title"),
            content=data.get("content")
        )
        new_note.save()
        return new_note, 201
@api.route('/notes/<int:id>')
class NoteResource(Resource):
    @api.marshal_with(notes_model)
    def get(self, id):
        """Get a note by id"""
        note=Notes.query.get_or_404(id)
        return note
    @api.marshal_with(notes_model)
    @jwt_required()
    def put(self, id):
        """Update a note by id"""
        note_to_update = Notes.query.get_or_404(id) 
        data=request.get_json()
        note_to_update.update(
            title=data.get("title"),
            content=data.get("content")
        )
        return note_to_update, 200
    @api.marshal_with(notes_model)
    @jwt_required()
    def delete(self, id):
        """Delete a note by id"""
        note_to_delete = Notes.query.get_or_404(id)
        note_to_delete.delete()
        return note_to_delete, 200
        


@app.shell_context_processor
def make_shell_context():
    return {
        'db': db, 
        'Notes': Notes
        }

if __name__ == '__main__':
    app.run()
