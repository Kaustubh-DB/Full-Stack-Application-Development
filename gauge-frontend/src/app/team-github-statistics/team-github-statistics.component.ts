import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router"
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Chart} from 'chart.js'


@Component({
  selector: 'app-team-github-statistics',
  templateUrl: './team-github-statistics.component.html',
  styleUrls: ['./team-github-statistics.component.css']
})
export class TeamGithubStatisticsComponent implements OnInit {
  
  team_data
  assignment_id
  team_index

  // Graphs
  additions_chart
  deletions_chart
  commits_chart
  average_new_lines_chart

  constructor(
    private router: Router,
    private activatedroute:ActivatedRoute,
    private http: HttpClient
  ) { 

  }

  ngOnInit() {
    this.assignment_id = this.activatedroute.snapshot.params['assignment_id']
    this.team_index = this.activatedroute.snapshot.params['team_index']
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/github_usage'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.team_data = data[this.team_index]
      


      this.additions_chart = new Chart('additions_chart', {
        type: 'bar',
        data: {
        labels: this.team_data['week_list'],
        datasets: [{
            label: 'Number of Additions each week',
            data: this.team_data['additions'],
            
            borderWidth: 1
        }]
        }, 
        options: {
          title:{
              text:"Bar Chart",
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


      this.deletions_chart = new Chart('deletions_chart', {
        type: 'bar',
        data: {
        labels: this.team_data['week_list'],
        datasets: [{
            label: 'Number of Deletions each week',
            data: this.team_data['deletions'],
            
            borderWidth: 1
        }]
        }, 
        options: {
          title:{
              text:"Bar Chart",
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


      this.commits_chart = new Chart('commits_chart', {
        type: 'bar',
        data: {
        labels: this.team_data['week_list'],
        datasets: [{
            label: 'Number of Commits each week',
            data: this.team_data['commits'],
            borderWidth: 1
        }]
        }, 
        options: {
          title:{
              text:"Bar Chart",
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

      this.average_new_lines_chart = new Chart('average_new_lines_chart', {
        type: 'bar',
        data: {
        labels: this.team_data['week_list'],
        datasets: [{
            label: 'Number of Additions each week',
            data: this.team_data['average_new_lines'],
            
            borderWidth: 1
        }]
        }, 
        options: {
          title:{
              text:"Bar Chart",
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
    
    // console.log(this.team_data['week_list'])

    
  }

}
