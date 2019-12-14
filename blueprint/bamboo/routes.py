from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json
import requests


jira = Blueprint('bamboo', __name__)
connection = 'mongodb://heroku_kx6px18d:v28mkan5jd6dt86c9oqn2n9c8p@ds353378.mlab.com:53378/heroku_kx6px18d?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_kx6px18d']


@jira.route("/build_success_rate", methods = ["POST"])
def build_success_rate():
    data = request.get_json()
    assignment_id = data["assignment_id"]
    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})
    teams = data['teams']
    bamboo_url = data['bamboo_url']
    all_data = []
    for team in teams:
        team_name = team['team_name']
        bamboo_id = team['bamboo_id']
        bamboo_query = {
            "_id": ObjectId(bamboo_id)
        }
        bamboo_data = db.bamboo.find_one(bamboo_query)
        bamboo_key = bamboo_data['bamboo_key']
        url = bamboo_url + '/rest/api/latest/result/' + bamboo_key + '.json'
        response = requests.get(url)
        response = json.loads(response.text)
        
        build_number = response['results']['result'][0]['buildNumber']
        build_key = response['results']['result'][0]['buildResultKey'].split('-')
        print(build_key)
        print(build_number)
        success = 0

        while build_number > 0: 
            temp = build_key[0] + '-' + build_key[1] + '-' + str(build_number) + '.json'
            print(temp)
            url = bamboo_url + '/rest/api/latest/result/' + temp 
            result = requests.get(url)
            build_number -= 1
            
            result = json.loads(result.text)
            if result['buildState'] == "Successful":
                success += 1

        data_update = {
            "$set":{
                "success": success,
                "total": response['results']['result'][0]['buildNumber']
            }
        }
        data = {
            "success": success,
            "total": response['results']['result'][0]['buildNumber']
        }

        res = db.bamboo.update_one({"_id": ObjectId(bamboo_id)}, data_update)
        all_data.append(data)
    return jsonify(all_data)
