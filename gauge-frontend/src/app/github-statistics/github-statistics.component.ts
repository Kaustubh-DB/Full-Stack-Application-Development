import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-github-statistics',
  templateUrl: './github-statistics.component.html',
  styleUrls: ['./github-statistics.component.css']
})
export class GithubStatisticsComponent implements OnInit {

  assignment_id
  github_data
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { 
    
  }

  viewGithubStatistics(i){
    this.router.navigate(["/teamGithubStatistics", this.assignment_id, i])
  }

  ngOnInit() {
    this.assignment_id = this.route.snapshot.params['assignment_id']
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/github_usage'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.github_data = data
      console.log(this.github_data)

    })
    
  }

}
