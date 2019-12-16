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


@jira.route("/api/overall_rankings", methods = ['POST'])
def get_overall_rankings():
    data = request.get_json()
    assignment_id = data["assignment_id"]
    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})
    teams = data['teams']

    all_data = []  
    d = {}  
    for team in teams:
        team_name = team['team_name']
        jira_id = team['jira_id']
        sonarqube_id = team['sonarqube_id']
        github_id = team['github_id']
        bamboo_id = team['bamboo_id']
        jira_query = {
            "_id": ObjectId(jira_id)
        }
        jira_data = db.jira.find_one(jira_query)
        github_query = {
            "_id": ObjectId(github_id)
        }
        github_data = db.github.find_one(github_query)
        bamboo_query = {
            "_id": ObjectId(bamboo_id)
        }
        bamboo_data = db.bamboo.find_one(bamboo_query)
        sonarqube_query = {
            "_id": ObjectId(sonarqube_id)
        }
        sonarqube_data = db.sonarqube.find_one(sonarqube_query)
        team_data = {
            "resolved_created_difference": jira_data['resolved_created_difference'],
            "status_code": sonarqube_data['status_code'],
            "bugs": sonarqube_data['bugs'],
            "code_smells": sonarqube_data['code_smells'],
            "regular_commit_count": github_data['regular_commit_count'],
            "total_commits": github_data["total_commits"],
            "team_name": team_name,
            "success": bamboo_data['success'],
            "total": bamboo_data['total'] 
        }
        all_data.append(team_data)
        d[team_name] = 0
    all_data = sorted(all_data, key = lambda x: (x['success']/x['total'], x['success']))
    for i, team_data in enumerate(all_data):
        d[team_data["team_name"]] += i
    
    all_data = sorted(all_data, key = lambda x: (-x['regular_commit_count'], -x['total_commits']))
    for i, team_data in enumerate(all_data):
        d[team_data["team_name"]] += i
    
    all_data = sorted(all_data, key = lambda x: x['resolved_created_difference'])
    for i, team_data in enumerate(all_data):
        d[team_data["team_name"]] += i
    all_data = sorted(all_data, key = lambda x: (int(x['status_code']), int(x['bugs']), int(x['code_smells'])))
    for i, team_data in enumerate(all_data):
        d[team_data["team_name"]] += i
    d = {k: v for k, v in sorted(d.items(), key=lambda item: item[1])}
    res = {
        "team_names": list(d.keys())
    }
    
        

    return jsonify(res)