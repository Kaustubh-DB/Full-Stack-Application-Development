import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http'


@Component({
  selector: 'app-sonarqube-statistics',
  templateUrl: './sonarqube-statistics.component.html',
  styleUrls: ['./sonarqube-statistics.component.css']
})
export class SonarqubeStatisticsComponent implements OnInit {
  assignment_id
  sonarqube_data
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.assignment_id = this.route.snapshot.params['assignment_id']
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/sonarqube_statistics'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.sonarqube_data = data
      console.log(this.sonarqube_data)

    })

  }

}
