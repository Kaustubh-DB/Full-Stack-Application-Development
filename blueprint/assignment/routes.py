from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

mod = Blueprint('assignment', __name__)
connection = 'mongodb://heroku_hpkv6n2z:o7srfm2i8egtbu0td9vtgk6jp0@ds349618.mlab.com:49618/heroku_hpkv6n2z?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_hpkv6n2z']

@mod.route("/assignments", methods = ['GET'])
def get_assignment():
    results = []

    for field in db.testing.find():
        field['_id'] = str(field['_id'])
        results.append(field)
    return jsonify(results)

@mod.route("/new/assignment", methods = ['POST'])
def add_assignment():

    data = request.get_json()
    name = data['name']
    start = data['start']
    end = data['end']

    assignment_id = db.testing.insert({'name': name, 'start': start, 'end': end, 'teams': []})
    new_assignment = db.testing.find_one({'_id':assignment_id})
    return jsonify({'assignment_id': assignment_id})

@mod.route("/new/teams", methods = ['POST'])
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
