from flask_restx import Resource, Namespace, fields, Api
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from flask import Flask, request, jsonify





auth_ns=Namespace('auth', description='Authentication namespace')

api = Api()

signup_model=auth_ns.model(
    "Signup",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)
login_model=auth_ns.model(
    'Login',
    {
         "username": fields.String(),
        "password": fields.String()
    }
)



@auth_ns.route('/signup')
class Signup(Resource):

    @auth_ns.expect(signup_model)
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
    

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
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