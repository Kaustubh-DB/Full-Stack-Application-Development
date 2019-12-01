from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

from blueprint.jira.routes import mod
from blueprint.assignment.routes import mod


app.register_blueprint(assignment.routes.mod)
app.register_blueprint(jira.routes.mod)
