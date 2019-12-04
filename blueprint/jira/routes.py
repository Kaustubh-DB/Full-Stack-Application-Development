from flask import Blueprint
import requests
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from requests.auth import HTTPBasicAuth
import json
from bson.objectid import ObjectId
from datetime import date, timedelta


jira_url = "http://149.161.132.18:8080"

jira = Blueprint('jira', __name__)

connection = 'mongodb://heroku_hpkv6n2z:o7srfm2i8egtbu0td9vtgk6jp0@ds349618.mlab.com:49618/heroku_hpkv6n2z?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_hpkv6n2z']


@jira.route("/api/created_resolved", methods=['GET'])
def created_resolved_chart():
    data = request.get_json()
    jira_key = data['jira_key']
    assignment_id = data["assignment_id"]
    issues = db.jira.find_one({"jira_key": jira_key}, {"_id": 0, "issues": 1})
    proj = {
        "start":1,
        "end": 1
    }
    start_end = db.testing.find_one({"_id": ObjectId(assignment_id)}, proj)
    print(start_end)
    start_date = start_end["start"].split("/")
    end_date = start_end["end"].split("/")
    print()
    sdate = date(int(start_date[2]), int(start_date[0]), int(start_date[1]))   # start date
    edate = date(int(end_date[2]), int(end_date[0]), int(end_date[1]))    # end date

    delta = edate - sdate       # as timedelta
    dates = []
    for i in range(delta.days + 1):
        day = sdate + timedelta(days=i)
        
        dates.append(day)

    print(dates)

    return jsonify(dates)



@jira.route("/api/jira-usage", methods = ['POST'])
def get_jira_usage():
    data = request.get_json()
    jira_key = data['jira_key']
    url = jira_url + '/rest/api/2/search?jql=project="'+ jira_key + '"'
    auth = HTTPBasicAuth("jdeshkar@iu.edu", "amRlc2hrYXI6cXdlcnR5")
    headers = {
       "Accept": "application/json",
       "Authorization": "Basic amRlc2hrYXI6cXdlcnR5"
    }
    response = requests.get(url,headers=headers)
    response = json.loads(response.text)
    issues = response['issues']
    issues_list = []
    for i in issues:
        d = {}
        d["created_date"] = i["fields"]["created"].split("T")[0]

        d["resolution_date"] = i["fields"]["resolutiondate"].split("T")[0] if i["fields"]["resolutiondate"] else "null"
        issues_list.append(d)
    data = {
        "$set":{
            "issues": issues_list
        }
    }
    r = db.jira.update_one({"jira_key": jira_key}, data)
    print()
    return jsonify(issues_list)
