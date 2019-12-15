import { Component, OnInit } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit {

  assignments
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  getGithubStats(assignment_id){
    console.log(assignment_id)
    this.router.navigate(['/githubstatistics', assignment_id]);
    
  }
  getSonarqubeStats(assignment_id){
    console.log(assignment_id)
  }
  getJiraStats(assignment_id){
    console.log(assignment_id)
  }
  getBambooStats(assignment_id){
    console.log(assignment_id)
  }
  getOverallStats(assignment_id){
    console.log(assignment_id)
  }
  ngOnInit() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/assignments'

    this.http.get(url, {headers}).subscribe(data => {
      console.log(data)
      this.assignments = data
    })
  }

}
