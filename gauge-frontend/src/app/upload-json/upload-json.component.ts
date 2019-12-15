import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.css']
})
export class UploadJsonComponent implements OnInit {
  jsonForm
  jsonFile
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { 
    this.jsonForm = this.formBuilder.group({
      assignment: ''
    })
  }

  onFileSelected(event){
    const file = event.target.files[0]
    this.jsonFile = file
  }
  ngOnInit() {
    console.log("gfhaef")
  }
  onSubmit(data){
    const formData = new FormData()
    formData.append("assignment", this.jsonFile)
    this.http.post<any>('http://localhost:5000/api/create_assignment', formData).subscribe(
      (res)=> console.log("zhjfy"),
      (err) => console.log(err)
    )
  }

}
