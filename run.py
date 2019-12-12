# from blueprint import app
# app.run(debug=True)
from flask import Flask
from flask_cors import CORS
from blueprint.jira.routes import jira as jira
from blueprint.assignment.routes import jira as assignment
from blueprint.bamboo.routes import jira as bamboo
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(jira)
app.register_blueprint(assignment)
app.register_blueprint(bamboo)


if __name__ == "__main__":
    app.run(host = "0.0.0.0",port = 5000, debug=True)