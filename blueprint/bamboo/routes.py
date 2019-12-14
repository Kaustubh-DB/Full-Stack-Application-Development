from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json

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
        url = bamboo_url + '/rest/api/latest/result/'