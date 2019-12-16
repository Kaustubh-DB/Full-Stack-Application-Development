import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-overall-rankings',
  templateUrl: './overall-rankings.component.html',
  styleUrls: ['./overall-rankings.component.css']
})
export class OverallRankingsComponent implements OnInit {

  teams
  assignment_id
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



    var url='http://localhost:5000/api/overall_rankings'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.teams = data['team_names']
      console.log(this.teams)

    })

  }

}
