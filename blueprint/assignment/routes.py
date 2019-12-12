from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json

jira = Blueprint('assignment', __name__)
connection = 'mongodb://heroku_kx6px18d:v28mkan5jd6dt86c9oqn2n9c8p@ds353378.mlab.com:53378/heroku_kx6px18d?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_kx6px18d']


@jira.route("/api/create_assignment", methods=["POST"])
def create_assignment():
    file = request.files['assignment'].read()
    data = json_util.loads(file)
    db.assignments.insert_one(data)
    return "Hi"

@jira.route("/assignments", methods = ['GET'])
def get_assignment():
    results = []

    for field in db.testing.find():
        field['_id'] = str(field['_id'])
        results.append(field)
    return jsonify(results)

@jira.route("/new/assignment", methods = ['POST'])
def add_assignment():

    data = request.get_json()
    print(data)
    name = data['name']
    start = data['start']
    end = data['end']

    assignment_id = db.testing.insert({'name': name, 'start': start, 'end': end, 'teams': []})
    new_assignment = db.testing.find_one({'_id':assignment_id})
    return jsonify({'assignment_id': str(assignment_id)})

@jira.route("/new/teams", methods = ['POST'])
def add_teams():

    data = request.get_json()
    team_name = data["team_name"]
    assignment_id = data["assignment_id"]
    data_jira = {
        "jira_key": data["jira_key"]
    }
    jira_id = db.jira.insert(data_jira)
    print(type(jira_id))

    data_assignment = {
        "$push":{
            "teams": {
                "team_name": team_name,
                "jira_id": str(jira_id)
            }
        }
    }
    db.testing.update({"_id": ObjectId(assignment_id)}, data_assignment)
    return jsonify({'assignment_id': assignment_id})
