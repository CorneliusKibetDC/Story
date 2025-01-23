from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Notes
from exts import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)  # Initialize the SQLAlchemy extension
migrate = Migrate(app, db)  # Initialize the Flask-Migrate extension
api = Api(app, doc='/docs')  # Create the Api instance with Swagger docs enabled

notes_model = api.model(
    "Notes",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "content": fields.String()
    }
)

# Register a Resource with the Api
@api.route('/hello')  # Correct way to define the route in Flask-RESTX
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello, World!"}
    

@api.route('/notes')
class NotesResource(Resource):
    @api.marshal_with(notes_model)
    def get(self):
        """Get all notes"""
        notes = Notes.query.all()
        return notes
    @api.marshal_with(notes_model)
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
