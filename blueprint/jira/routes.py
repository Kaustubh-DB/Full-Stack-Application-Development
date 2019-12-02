from flask import Blueprint
import requests
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from requests.auth import HTTPBasicAuth
import json
from bson.objectid import ObjectId

jira = Blueprint('jira', __name__)

connection = 'mongodb://heroku_hpkv6n2z:o7srfm2i8egtbu0td9vtgk6jp0@ds349618.mlab.com:49618/heroku_hpkv6n2z?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_hpkv6n2z']

@jira.route("/api/jira-usage", methods = ['GET'])
def get_jira_usage():

    data = request.get_json()
    jira_key = data['jira_key']

    url = 'http://localhost:8080/rest/api/2/search?jql=project="'+ jira_key + '"'

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
        d["created_date"] = i["fields"]["created"]

        d["resolution_date"] = i["fields"]["resolutiondate"]
        issues_list.append(d)

    data = {
        "$set":{
            "issues": issues_list
        }

    }
    r = db.jira.update_one({"jira_key": jira_key}, data)
    print()
    return jsonify(issues_list)
