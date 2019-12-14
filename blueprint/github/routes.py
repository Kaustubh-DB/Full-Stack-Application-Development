from flask import Blueprint
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json
from datetime import date, timedelta
import requests
import time


jira = Blueprint('github', __name__)
connection = 'mongodb://heroku_kx6px18d:v28mkan5jd6dt86c9oqn2n9c8p@ds353378.mlab.com:53378/heroku_kx6px18d?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_kx6px18d']


@jira.route("/github_usage", methods = ["POST"])
def get_github_usage():
    data = request.get_json()
    assignment_id = data['assignment_id']
    assignment_query = {
        "_id": ObjectId(assignment_id)
    }
    data = db.assignments.find_one(assignment_query)
    print(data)
    start_date = data["start"].split("/")
    end_date = data["end"].split("/")
    github_url = data['github_url']
    teams = data['teams']
    sdate = date(int(start_date[2]), int(start_date[0]), int(start_date[1]))   # start date
    edate = date(int(end_date[2]), int(end_date[0]), int(end_date[1])) + timedelta(days=1)
    sdate = time.mktime(sdate.timetuple())
    edate = time.mktime(edate.timetuple())
    print(sdate)
    print(edate)
    all_data = []
    for team in teams:
        team_name = team['team_name']
        github_id = team['github_id']
        github_query = {
            "_id": ObjectId(github_id)
        }
        github_data = db.github.find_one(github_query)
        github_username = github_data['github_username']
        github_repository_name = github_data['github_repository_name']
        git_api_url = github_url + github_username + '/' + github_repository_name + "/stats/contributors"
        response = requests.get(git_api_url)
        response = json.loads(response.text)
        compiled_data = {}
        for author in response:
            weeks = author['weeks']
            i = 0
            for week in weeks:
                if week['w'] >= sdate and week['w']<edate:
                    if i not in compiled_data:
                        compiled_data[i] = week
                    else:
                        for key in compiled_data[i].keys():
                            if key != "w":
                                compiled_data[i][key] += week[key]
                    i += 1
        week_list = []
        additions = []
        deletions = []
        commits = []
        count = 1
        for i in compiled_data.keys():
            week_list.append(count)
            obj_w_c_d = compiled_data[i]
            additions.append(obj_w_c_d['a'])
            deletions.append(obj_w_c_d['d'])
            commits.append(obj_w_c_d['c'])
        data_update = {
            "$set":{
                "additions": additions,
                "deletions": deletions,
                "commits": commits
            }
        }
        team_all_data = {
            "additions": additions,
            "deletions": deletions,
            "commits": commits
        }
        r = db.github.update_one({"_id": ObjectId(github_id)}, data_update)
        all_data.append(team_all_data)

    return jsonify(all_data)