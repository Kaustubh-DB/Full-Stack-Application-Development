import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Chart} from 'chart.js'

@Component({
  selector: 'app-team-jira-statistics',
  templateUrl: './team-jira-statistics.component.html',
  styleUrls: ['./team-jira-statistics.component.css']
})
export class TeamJiraStatisticsComponent implements OnInit {

  team_data
  assignment_id
  team_index

  created_resolved
  resolution_time
  assignee_report
  cumulative_created_resolved

  created_resolved_data
  resolution_time_data
  assignee_report_data
  cumulative_created_resolved_data

  constructor(
    private router: Router,
    private activatedroute:ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.assignment_id = this.activatedroute.snapshot.params['assignment_id']
    this.team_index = this.activatedroute.snapshot.params['team_index']
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/createResolvedCumulative'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.created_resolved_data = data[this.team_index]
      // console.log(this.created_resolved_data)
      this.created_resolved = new Chart('cumulative_created_resolved', {
        type: 'line',
        data: {
        labels: this.created_resolved_data['dates'],
        datasets: [{
            label: 'Created Issues',
            data: this.created_resolved_data['created_issues'],
            fill:true,
            backgroundColor: "rgba(255, 0, 255,0.75)",
            lineTension:0.2,
            borderColor:"red",
            borderWidth: 1
        },{
          label: 'Resolved Issues',
          data: this.created_resolved_data['resolved_issues'],
          fill:true,
          backgroundColor: "rgba(0, 255, 0,0.6)",
          lineTension:0.2,
          borderColor:"green",
          borderWidth: 1
        }]
        }, 
        options: {
          title:{
              text:"Cumulative Created and Resolved Issues Chart",
              display:true
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
        }
      });
      
    })


    var url='http://localhost:5000/api/assignee_report'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.assignee_report_data = data[this.team_index]
      console.log(this.assignee_report_data)
      this.assignee_report = new Chart('assignee_report', {
        type: 'pie',
        data: {
        labels: this.assignee_report_data['assignees'],
        datasets: [{
            label: '# of Votes',
            data: this.assignee_report_data['num_issues'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)'
          ],
            borderWidth: 1
        }]
        }, 
        options: {
        title:{
            text:"Assignee Report",
            display:true
        },
        
        }
      });
      
    })
     
    var url='http://localhost:5000/api/resolution_time'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.resolution_time_data = data[this.team_index]
      console.log(this.resolution_time_data)
      
      this.resolution_time = new Chart('resolution_time', {
        type: 'bar',
        data: {
        labels: this.resolution_time_data['dates'],
        datasets: [{
            label: 'Average Resolution Time',
            data: this.resolution_time_data['average_resolution_time'],
            borderWidth: 1
        }]
        }, 
        options: {
          title:{
              text:"Average Resolution Time",
              display:true
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
        }
      });
      
    })

    
    var url='http://localhost:5000/api/created_resolved'
    
    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.created_resolved_data = data[this.team_index]
      console.log(this.created_resolved_data)
      this.created_resolved = new Chart('created_resolved', {
        type: 'line',
        data: {
        labels: this.created_resolved_data['dates'],
        datasets: [{
            label: 'Number of Issues Created',
            data: this.created_resolved_data['created_issues'],
            fill:false,
            lineTension:0.2,
            borderColor:"red",
            borderWidth: 1
        },
        {
          label: 'Number of Issues Resolved',
          data: this.created_resolved_data['resolved_issues'],
          fill:false,
          lineTension:0.2,
          borderColor:"green",
          borderWidth: 1
      }]
        }, 
        options: {
        title:{
            text:"Created and Resolved Issues",
            display:true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
        }
      });

    })




  }

}
