import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-jira-statistics',
  templateUrl: './jira-statistics.component.html',
  styleUrls: ['./jira-statistics.component.css']
})
export class JiraStatisticsComponent implements OnInit {
  assignment_id
  jira_data
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }


  viewJiraStatistics(i){
    this.router.navigate(["/teamJiraStatistics", this.assignment_id, i])
  }

  ngOnInit() {
    this.assignment_id = this.route.snapshot.params['assignment_id']
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/jira-usage'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.jira_data = data
      console.log(this.jira_data)
      
    })
  }

}
