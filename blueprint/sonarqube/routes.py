from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json
from datetime import date, timedelta
import requests
import time


jira = Blueprint('sonarqube', __name__)
connection = 'mongodb://heroku_kx6px18d:v28mkan5jd6dt86c9oqn2n9c8p@ds353378.mlab.com:53378/heroku_kx6px18d?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_kx6px18d']


@jira.route("/api/sonarqube_statistics", methods = ["POST"])
def get_sonarqube_statistics():
    data = request.get_json()
    assignment_id = data['assignment_id']
    assignment_query = {
        "_id": ObjectId(assignment_id)
    }
    data = db.assignments.find_one(assignment_query)
    teams = data['teams']
    sonarqube_url = data['sonarqube_url']
    all_data = []
    for team in teams:
        team_name = team['team_name']
        sonarqube_id = team['sonarqube_id']
        sonarqube_query = {
            "_id": ObjectId(sonarqube_id)
        }

        sonarqube_data = db.sonarqube.find_one(sonarqube_query)

        url = sonarqube_url + "/api/measures/component?component=" + sonarqube_data['sonarqube_key'] + "&metricKeys=bugs, reliability_rating, vulnerabilities, security_rating, security_hotspots, code_smells, sqale_rating, coverage, duplicated_lines_density, ncloc"
        response = requests.get(url)
        response = json.loads(response.text)
        pass_fail_url = sonarqube_url+"/api/ce/component?component=" + sonarqube_data['sonarqube_key']
        pass_fail_res = requests.get(pass_fail_url)
        pass_fail_res = json.loads(pass_fail_res.text)

        status = pass_fail_res['current']['status']
        status_code = 1
        if status == "SUCCESS":
            status_code = 0
        measures = response['component']['measures']

        list_of_parameters = set(["vulnerabilities", "coverage", "code_smells", "security_rating", "vulnerabilities", "bugs"])
        data = {}
        for measure in measures:
            if measure['metric'] in list_of_parameters:
                data[measure['metric']] = measure['value']
        data["team_name"] = team_name
        data["status"] = status
        data["status_code"] = status_code
        data_update = {
            "$set":data
            
        }
        all_data.append(data)
        r = db.sonarqube.update_one({"_id": ObjectId(sonarqube_id)}, data_update)
    print(all_data)
    all_data = sorted(all_data, key = lambda x: (int(x['status_code']), int(x['bugs']), int(x['code_smells'])))
    return jsonify(all_data)