from flask import Blueprint
import requests
from flask import Flask, jsonify, request
from flask_pymongo import MongoClient
from requests.auth import HTTPBasicAuth
import json
from bson.objectid import ObjectId
from datetime import date, timedelta


jira_url = "http://localhost:8080"

jira = Blueprint('jira', __name__)

connection = 'mongodb://heroku_kx6px18d:v28mkan5jd6dt86c9oqn2n9c8p@ds353378.mlab.com:53378/heroku_kx6px18d?retryWrites=false'
client = MongoClient(connection)
db = client['heroku_kx6px18d']



@jira.route("/api/createResolvedCumulative", methods=["GET"])
def create_resolved_cumulative():
    data = request.get_json()
    assignment_id = data["assignment_id"]
    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})

    start_date = data["start"].split("/")
    end_date = data["end"].split("/")
    jira_url = data['jira_url']
    teams = data['teams']
    sdate = date(int(start_date[2]), int(start_date[0]), int(start_date[1]))   # start date
    edate = date(int(end_date[2]), int(end_date[0]), int(end_date[1]))    # end date
    delta = edate - sdate       # as timedelta
    all_data = []

    for team in teams:
        team_name = team['team_name']
        jira_id = team['jira_id']
        jira_query = {
            "_id": ObjectId(jira_id)
        }
        jira_data = db.jira.find_one(jira_query)
        jira_key = jira_data['jira_key']

        issues = db.jira.find_one({"_id": ObjectId(jira_data['_id'])}, {"_id": 0, "issues": 1})
        issues = issues["issues"]
        created_issues = {}
        resolved_issues = {}
        for i in range(delta.days + 1):
            day = sdate + timedelta(days=i)
            date_str = day.strftime("%Y-%m-%d").split(" ")[0]
            created_issues[date_str] = 0
            resolved_issues[date_str] = 0
        for issue in issues:
            issue = dict(issue)
            created_issues[issue["created_date"]] += 1
            if issue['resolution_date'] != "null":
                resolved_issues[issue["created_date"]] += 1
        dates = list(created_issues.keys())
        created_issues = list(created_issues.values())
        resolved_issues = list(resolved_issues.values())
        for i in range(1, len(created_issues)):
            created_issues[i] = created_issues[i] + created_issues[i-1]
            resolved_issues[i] = resolved_issues[i] + resolved_issues[i-1]
        resp = {
            "team_name": team_name,
            "created_issues": created_issues,
            "resolved_issues": resolved_issues,
            "dates": dates
        }
        all_data.append(resp)
    return jsonify(all_data)



@jira.route("/api/assignee_report", methods=["GET"])
def assignee_report_chart():

    data = request.get_json()
    assignment_id = data["assignment_id"]
    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})

    teams = data['teams']
    all_data = []
    for team in teams:
        team_name = team['team_name']
        jira_id = team['jira_id']
        jira_query = {
            "_id": ObjectId(jira_id)
        }
        jira_data = db.jira.find_one(jira_query)
        jira_key = jira_data['jira_key']

        issues = db.jira.find_one({"_id": ObjectId(jira_data['_id'])}, {"_id": 0, "issues": 1})
        issues = issues["issues"]
        map_assignee = {}
        for issue in issues:
            issue = dict(issue)
            map_assignee[issue['assignee_name']] = map_assignee.get(issue['assignee_name'], 0) + 1
        all_data.append(map_assignee)
    return jsonify(all_data)


@jira.route("/api/resolution_time", methods=['GET'])
def resolution_time_chart():
    data = request.get_json()
    assignment_id = data["assignment_id"]

    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})
    start_date = data["start"].split("/")
    end_date = data["end"].split("/")
    jira_url = data['jira_url']
    teams = data['teams']
    sdate = date(int(start_date[2]), int(start_date[0]), int(start_date[1]))   # start date
    edate = date(int(end_date[2]), int(end_date[0]), int(end_date[1]))    # end date
    delta = edate - sdate       # as timedelta
    all_data = []

    for team in teams:
        team_name = team['team_name']
        jira_id = team['jira_id']
        jira_query = {
            "_id": ObjectId(jira_id)
        }
        jira_data = db.jira.find_one(jira_query)
        jira_key = jira_data['jira_key']

        issues = db.jira.find_one({"_id": ObjectId(jira_data['_id'])}, {"_id": 0, "issues": 1})



        issues = issues["issues"]
            # as timedelta
        avg_resolution_time = {}
        for i in range(delta.days + 1):
            day = sdate + timedelta(days=i)
            date_str = day.strftime("%Y-%m-%d").split(" ")[0]
            avg_resolution_time[date_str] = 0
        sum = 0
        num_issues_resolved = 0
        for issue in issues:
            if issue["resolution_date"] != "null":
                issue = dict(issue)
                res_date = issue["resolution_date"].split("-")
                creat_date = issue["created_date"].split("-")
                res_date = date(int(res_date[0]), int(res_date[1]), int(res_date[2]))
                creat_date = date(int(creat_date[0]), int(creat_date[1]), int(creat_date[2]))
                current_res_time = (res_date - creat_date).days + 1
                sum += current_res_time
                num_issues_resolved += 1
                avg_resolution_time[issue["resolution_date"]] = sum/num_issues_resolved
        resp = {
            "average_resolution_time": list(avg_resolution_time.values()),
            "dates": list(avg_resolution_time.keys()),
            "team_name": team_name
        }
        all_data.append(resp)
    return jsonify(all_data)


@jira.route("/api/created_resolved", methods=['GET'])
def created_resolved_chart():
    data = request.get_json()
    assignment_id = data["assignment_id"]

    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})
    start_date = data["start"].split("/")
    end_date = data["end"].split("/")
    jira_url = data['jira_url']
    teams = data['teams']
    sdate = date(int(start_date[2]), int(start_date[0]), int(start_date[1]))   # start date
    edate = date(int(end_date[2]), int(end_date[0]), int(end_date[1]))    # end date
    delta = edate - sdate       # as timedelta
    all_data = []

    for team in teams:
        dates = []
        created_issues = {}
        resolved_issues = {}
        team_name = team['team_name']
        jira_id = team['jira_id']
        jira_query = {
            "_id": ObjectId(jira_id)
        }
        jira_data = db.jira.find_one(jira_query)
        jira_key = jira_data['jira_key']

        issues = db.jira.find_one({"_id": ObjectId(jira_data['_id'])}, {"_id": 0, "issues": 1})
        issues = issues["issues"]
        for i in range(delta.days + 1):
            day = sdate + timedelta(days=i)
            date_str = day.strftime("%Y-%m-%d").split(" ")[0]
            dates.append(date_str)
            created_issues[date_str] = 0
            resolved_issues[date_str] = 0
        for issue in issues:
            issue = dict(issue)
            created_issues[issue["created_date"]] += 1
            if issue['resolution_date'] != "null":
                resolved_issues[issue["created_date"]] += 1
        resp = {
            "created_issues": list(created_issues.values()),
            "resolved_issues": list(resolved_issues.values()),
            "dates": dates,
            "team_name": team_name
        }
        all_data.append(resp)
    return jsonify(all_data)



@jira.route("/api/jira-usage", methods = ['POST'])
def get_jira_usage():
    data = request.get_json()
    assignment_id = data["assignment_id"]
    data = db.assignments.find_one({"_id": ObjectId(assignment_id)})
    # print(data)
    start_date = data["start"].split("/")
    end_date = data["end"].split("/")
    jira_url = data['jira_url']
    teams = data['teams']
    sdate = date(int(start_date[2]), int(start_date[0]), int(start_date[1]))   # start date
    edate = date(int(end_date[2]), int(end_date[0]), int(end_date[1]))    # end date
    delta = edate - sdate       # as timedelta
    all_data = []
    for team in teams:
        team_name = team['team_name']
        jira_id = team['jira_id']
        jira_query = {
            "_id": ObjectId(jira_id)
        }
        jira_data = db.jira.find_one(jira_query)
        jira_key = jira_data['jira_key']


        url = jira_url + '/rest/api/2/search?jql=project="'+ jira_key + '"'
        auth = HTTPBasicAuth("rajnandu@iu.edu", "cmFqbmFuZHU6MTIzNDU2Nzg=")
        headers = {
        "Accept": "application/json",
        "Authorization": "Basic cmFqbmFuZHU6MTIzNDU2Nzg="
        }
        response = requests.get(url,headers=headers)
        response = json.loads(response.text)
        issues = response['issues']
        issues_list = []
        
        for i in issues:
            # d = {}
            # d["created_date"] = i["fields"]["created"].split("T")[0]

            # d["resolution_date"] = i["fields"]["resolutiondate"].split("T")[0] if i["fields"]["resolutiondate"] else "null"
            
            # d["assignee_name"] = i["fields"]["assignee"]["name"] if i["fields"]["assignee"] else "null"
            # # create_data = date()
            # issues_list.append(d)
            d = {}
            d["created_date"] = i["fields"]["created"].split("T")[0]

            d["resolution_date"] = i["fields"]["resolutiondate"].split("T")[0] if i["fields"]["resolutiondate"] else "null"
            
            d["assignee_name"] = i["fields"]["assignee"]["name"] if i["fields"]["assignee"] else "null"

            create_date = d['created_date'].split("-")
            
            create_date = date(int(create_date[0]), int(create_date[1]), int(create_date[2]))
            print("start date")
            print(sdate)
            print("created_date")
            print(create_date)
            print("End data")
            print(edate)
            if create_date >= sdate and create_date <= edate:
                print("inside")
                # if d['resolution_date'] != "null":
                #     print("Inside second if")
                #     resolution_date = d['resolution_date'].split("-")
                #     resolution_date = date(int(resolution_date[0]), int(resolution_date[1]), int(resolution_date[2]))
                    
                #     print(resolution_date)
                #     if resolution_date >= sdate and resolution_date<=edate:
                        
                issues_list.append(d)



        # dates = []
        created_issues = {}
        resolved_issues = {}
        for i in range(delta.days + 1):
            day = sdate + timedelta(days=i)
            date_str = day.strftime("%Y-%m-%d").split(" ")[0]
            # dates.append(date_str)
            created_issues[date_str] = 0
            resolved_issues[date_str] = 0

        for issue in issues_list:
            # issue = dict(issue)
            created_issues[issue["created_date"]] += 1
            if issue['resolution_date'] != "null":
                resolved_issues[issue["created_date"]] += 1
        # print("created")
        # print(created_issues)
        # print("resolved")
        # print(resolved_issues)
        created_issues = list(created_issues.values())
        resolved_issues = list(resolved_issues.values())

        diff_created = 0
        diff_resolved = 0
        for i in range(1, len(resolved_issues)):
            resolved_issues[i] += resolved_issues[i-1]
            resolved_issues[i] /= i+1
            created_issues[i] += created_issues[i-1]
            created_issues[i] /= i+1
            diff_created += abs(created_issues[i] - created_issues[i-1])
            diff_resolved += abs(resolved_issues[i] - resolved_issues[i-1])
        diff_created /= len(resolved_issues)-1
        diff_resolved /= len(resolved_issues)-1
        print()
        data = {
            "$set":{
                "issues": issues_list,
                "average_diff_created": diff_created,
                "average_diff_resolved": diff_resolved,
                "resolved_created_difference": abs(diff_created-diff_resolved)
            }
        }

        r = db.jira.update_one({"_id": ObjectId(jira_id)}, data)
        data = {
            "team_name": team_name,
            "issues": issues_list,
            "average_diff_created": diff_created,
            "average_diff_resolved": diff_resolved,
            "resolved_created_difference": abs(diff_created-diff_resolved)
        }
        all_data.append(data)
    return jsonify(all_data)
