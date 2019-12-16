import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-bamboo-statistics',
  templateUrl: './bamboo-statistics.component.html',
  styleUrls: ['./bamboo-statistics.component.css']
})
export class BambooStatisticsComponent implements OnInit {
  assignment_id
  bamboo_data
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }


  viewBambooStatistics(i){
    this.router.navigate(["/teamBambooStatistics", this.assignment_id, i])
  }

  ngOnInit() {
    this.assignment_id = this.route.snapshot.params['assignment_id']
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'
      // jwttoken: this.cookie.get("jwttoken")
    });



    var url='http://localhost:5000/api/build_success_rate'

    this.http.post(url, {"assignment_id": this.assignment_id}).subscribe(data => {
      this.bamboo_data = data
      console.log(this.bamboo_data)

    })
  }

}
