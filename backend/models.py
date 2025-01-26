from exts import db
"""
class Notes:
id:
"""
class Notes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    

    def __repr__(self):
        return f'<Notes {self.title}>'
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, content):
        self.title = title
        self.content = content
        db.session.commit()
#user model
"""
class User:
id:integer
email:string
username:string
password:string
"""
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(25), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    def __repr__(self):
        return f"<User {self.username}>"
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        db.session.commit()


