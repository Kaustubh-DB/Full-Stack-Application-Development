from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json
from datetime import date, timedelta
import requests
import time


jira = Blueprint('assignment', __name__)
connection = 'mongodb://heroku_kx6px18d:v28mkan5jd6dt86c9oqn2n9c8p@ds353378.mlab.com:53378/heroku_kx6px18d?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_kx6px18d']


@jira.route("/api/create_assignment", methods=["POST"])
def create_assignment():
    file = request.files['assignment'].read()
    data = json_util.loads(file)
    teams = data['teams']
    data['teams'] = []
    for team in teams:
        jira_data = {
            "jira_key":  team['jira_key']            
        }
        jira_id = db.jira.insert(jira_data)

        github_data = {
            "github_username":  team['github_username'],     
            "github_repository_name": team['github_repository_name']       
        }
        github_id = db.github.insert(github_data)

        bamboo_data = {
            "bamboo_key":  team['bamboo_key'],
            "bamboo_plan_key": team["bamboo_plan_key"]         
        }
        bamboo_id = db.bamboo.insert(bamboo_data)

        sonarqube_data = {
            "sonarqube_key":  team['sonarqube_key']            
        }
        sonarqube_id = db.sonarqube.insert(sonarqube_data)
        team_data = {
            "team_name": team['team_name'],
            'jira_id': str(jira_id),
            'bamboo_id': str(bamboo_id),
            'sonarqube_id': str(sonarqube_id),
            'github_id': str(github_id)
        }
        data['teams'].append(team_data)
    print(data)
    db.assignments.insert(data)
    return "Hi"


@jira.route("/api/assignments", methods = ['GET'])
def get_assignment():
    results = []
    for field in db.assignments.find({}):
        field["_id"] = str(field["_id"])
        results.append(field)
    # return jsonify({"result": results})
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

# @jira.route("/teams", methods = ['GET'])
# def get_teams():
#     results = []
#     data = request.get_json()
#     assignment_id = data['assignment_id']
#     assignment_query = {
#         "_id": ObjectId(assignment_id)
#     }
#     data = db.assignments.find_one(assignment_query)
#     teams = data['teams']
#     for team in teams:

#     return jsonify(results)
