# from flask_restx import Namespace, Resource, fields
# from models import Notes
# from flask_jwt_extended import jwt_required
# from flask import request



# notes_ns=Namespace('notes', description='A namespace of Notes')

# notes_model = notes_ns.model(
#     "Notes",
#     {
#         "id": fields.Integer(),
#         "title": fields.String(),
#         "content": fields.String()
#     }
# )

# @notes_ns.route('/hello')  # Correct way to define the route in Flask-RESTX
# class HelloResource(Resource):
#     def get(self):
#         return {"message": "Hello, World!"}
# # Register a Resource with the Api

# @notes_ns.route('/notes')
# class NotesResource(Resource):
#     @notes_ns.marshal_with(notes_model)
#     def get(self):
#         """Get all notes"""
#         notes = Notes.query.all()
#         return notes
#     @notes_ns.marshal_with(notes_model)
#     @notes_ns.expect(notes_model)
#     @jwt_required()
#     def post(self):
#         """Create a new note"""
#         data=request.get_json()

#         new_note = Notes(
#             title=data.get("title"),
#             content=data.get("content")
#         )
#         new_note.save()
#         return new_note, 201
# @notes_ns.route('/notes/<int:id>')
# class NoteResource(Resource):
#     @notes_ns.marshal_with(notes_model)
#     def get(self, id):
#         """Get a note by id"""
#         note=Notes.query.get_or_404(id)
#         return note
#     @notes_ns.marshal_with(notes_model)
#     @jwt_required()
#     def put(self, id):
#         """Update a note by id"""
#         note_to_update = Notes.query.get_or_404(id) 
#         data=request.get_json()
#         note_to_update.update(
#             title=data.get("title"),
#             content=data.get("content")
#         )
#         return note_to_update, 200
#     @notes_ns.marshal_with(notes_model)
#     @jwt_required()
#     def delete(self, id):
#         """Delete a note by id"""
#         note_to_delete = Notes.query.get_or_404(id)
#         note_to_delete.delete()
#         return note_to_delete
        




from flask_restx import Namespace, Resource, fields
from models import Notes
from flask_jwt_extended import jwt_required
from flask import request, jsonify

# Namespace for Notes
notes_ns = Namespace('notes', description='A namespace for Notes')

# Define Notes Model Schema for Serialization
notes_model = notes_ns.model(
    "Notes",
    {
        "id": fields.Integer(),
        "title": fields.String(required=True, description="The title of the note"),
        "content": fields.String(required=True, description="The content of the note"),
    }
)

@notes_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello, World!"}

@notes_ns.route('/notes')
class NotesResource(Resource):
    @notes_ns.marshal_with(notes_model, envelope="data")
    def get(self):
        """Get all notes"""
        notes = Notes.query.all()
        return notes

    @notes_ns.expect(notes_model)
    @notes_ns.marshal_with(notes_model, code=201)
    @jwt_required()
    def post(self):
        """Create a new note"""
        data = request.get_json()

        new_note = Notes(
            title=data.get("title"),
            content=data.get("content")
        )
        new_note.save()  # Make sure the Notes model has a save() method
        return new_note, 201

@notes_ns.route('/notes/<int:id>')
class NoteResource(Resource):
    @notes_ns.marshal_with(notes_model)
    def get(self, id):
        """Get a note by ID"""
        note = Notes.query.get_or_404(id)
        return note

    @notes_ns.expect(notes_model)
    @notes_ns.marshal_with(notes_model)
    @jwt_required()
    def put(self, id):
        """Update a note by ID"""
        note_to_update = Notes.query.get_or_404(id)
        data = request.get_json()

        note_to_update.title = data.get("title", note_to_update.title)
        note_to_update.content = data.get("content", note_to_update.content)
        note_to_update.save()  # Make sure the Notes model has an update/save() method
        return note_to_update, 200

    @jwt_required()
    def delete(self, id):
        """Delete a note by ID"""
        note_to_delete = Notes.query.get_or_404(id)
        note_to_delete.delete()  # Make sure the Notes model has a delete() method
        return {"message": f"Note {id} deleted successfully"}, 200
