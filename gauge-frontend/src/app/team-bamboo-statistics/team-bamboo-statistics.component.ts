import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Chart} from 'chart.js'


@Component({
  selector: 'app-team-bamboo-statistics',
  templateUrl: './team-bamboo-statistics.component.html',
  styleUrls: ['./team-bamboo-statistics.component.css']
})
export class TeamBambooStatisticsComponent implements OnInit {

  team_data
  assignment_id
  team_index
  PieChart
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



    var url='http://localhost:5000/api/build_success_rate'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.team_data = data[this.team_index]
      console.log(this.team_data)
      
      this.PieChart = new Chart('chart', {
        type: 'pie',
        data: {
        labels: ["Success", "Failed"],
        datasets: [{
            label: '# of Votes',
            data: [this.team_data['success'], this.team_data['total']-this.team_data['success']],
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
            text:"Bar Chart",
            display:true
        },
        
        }
      });
    })
  }

}
