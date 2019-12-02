# from blueprint import app
# app.run(debug=True)
from flask import Flask
from flask_cors import CORS
from blueprint.jira.routes import jira as jira
from blueprint.assignment.routes import jira as assignment

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(jira)
app.register_blueprint(assignment)


if __name__ == "__main__":
    #app.debug = True
    app.run(host = "0.0.0.0",port = 5000)
