import React, { Component } from 'react'
import TodoDataService from '../../api/gaugeservice/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import ls from 'local-storage'

class GitApiComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            TotalcommitsTeam1: 14,
            TotalcommitsTeam2: 0,
            TotalcommitsTeam3: 0,
            TotalcommitsTeam4: 0,
            NoAdditionPerWeekTeam1: [],
            NoDeletionPerWeekTeam1:[10,0,0,0],
            NoCommitsPerWeekTeam1:[2,3,4,5],
            NoAdditionPerWeekTeam2: [],
            NoDeletionPerWeekTeam2:[],
            NoCommitsPerWeekTeam2:[],
            NoAdditionPerWeekTeam3: [60,84,92,0],
            NoDeletionPerWeekTeam3:[],
            NoCommitsPerWeekTeam3:[],
            NoAdditionPerWeekTeam4: [],
            NoDeletionPerWeekTeam4:[],
            NoCommitsPerWeekTeam4:[]



        }
        // this.handleChange = this.handleChange.bind(this)
        // this.loginClicked = this.loginClicked.bind(this)
    }


    async componentDidMount(){

        const urlTeam1 = "https://api.github.com/repos/Kaustubh-DB/Empirical-Java/stats/contributors"
        const responseTeam1 = await fetch(urlTeam1)
        const dataTeam1 = await responseTeam1.json();
       // this.setState({TotalcommitsTeam1:dataTeam1[0].total})
        console.log(dataTeam1[0])

        const urlTeam2 = "https://api.github.com/repos/Kaustubh-DB/Object-Oriented-Software-Development/stats/contributors"
        const responseTeam2 = await fetch(urlTeam2)
        const dataTeam2 = await responseTeam2.json();
        this.setState({TotalcommitsTeam2:dataTeam2[0].total})

        const urlTeam3 = "https://api.github.com/repos/Kaustubh-DB/AI-Projects/stats/contributors"
        const responseTeam3 = await fetch(urlTeam3)
        const dataTeam3 = await responseTeam3.json();
        this.setState({TotalcommitsTeam3:dataTeam3[0].total})

        const urlTeam4 = "https://api.github.com/repos/Kaustubh-DB/Assigment1_OOSD/stats/contributors"
        const responseTeam4 = await fetch(urlTeam4)
        const dataTeam4 = await responseTeam4.json();
        this.setState({TotalcommitsTeam4:dataTeam4[0].total})

        const AdcurlTeam1 = "https://api.github.com/repos/Kaustubh-DB/Empirical-Java/stats/contributors"
        const AdcresponseTeam1 = await fetch(AdcurlTeam1)
        const AdcdataTeam1 = await AdcresponseTeam1.json();
       // this.setState({weeklyCountTeam1:dataTeam[0].weeks})
       let additionPerWeekTeam1 =[]
       let deletionPerWeekTeam1 = []
       let commitsPerWeekTeam1 = []

       for(var i=0; i<AdcdataTeam1[0].weeks.length;i++){
        additionPerWeekTeam1.push(AdcdataTeam1[0].weeks[i].a)
        // deletionPerWeekTeam1.push(AdcdataTeam1[0].weeks[i].d)
        //commitsPerWeekTeam1.push(AdcdataTeam1[0].weeks[i].c)    
       }
       this.setState({NoAdditionPerWeekTeam1:additionPerWeekTeam1})
    //    this.setState({NoDeletionPerWeekTeam1:deletionPerWeekTeam1})
       this.setState({NoCommitsPerWeekTeam1:commitsPerWeekTeam1})
       //console.log(tempArray)
    //    console.log(dataTeam[0].weeks)
    //     console.log(dataTeam[0].weeks[0])
        const AdcurlTeam2 = "https://api.github.com/repos/Kaustubh-DB/Object-Oriented-Software-Development/stats/contributors"
        const AdcresponseTeam2 = await fetch(AdcurlTeam2)
        const AdcdataTeam2 = await AdcresponseTeam2.json();
       // this.setState({weeklyCountTeam1:dataTeam[0].weeks})
       let additionPerWeekTeam2 =[]
       let deletionPerWeekTeam2 = []
       let commitsPerWeekTeam2= []

       for(var i=0; i<AdcdataTeam2[0].weeks.length;i++){
        additionPerWeekTeam2.push(AdcdataTeam2[0].weeks[i].a)
        deletionPerWeekTeam2.push(AdcdataTeam2[0].weeks[i].d)
        commitsPerWeekTeam2.push(AdcdataTeam2[0].weeks[i].c)    
       }
       this.setState({NoAdditionPerWeekTeam2:additionPerWeekTeam2})
       this.setState({NoDeletionPerWeekTeam2:deletionPerWeekTeam2})
       this.setState({NoCommitsPerWeekTeam2:commitsPerWeekTeam2})
              //console.log(tempArray)
        console.log(AdcdataTeam2[0].weeks)
    //     console.log(AdcdataTeam2[0].weeks[0])

       const AdcurlTeam3 = "https://api.github.com/repos/Kaustubh-DB/AI-Projects/stats/contributors"
        const AdcresponseTeam3 = await fetch(AdcurlTeam3)
        const AdcdataTeam3 = await AdcresponseTeam3.json();
       // this.setState({weeklyCountTeam1:dataTeam[0].weeks})
       let additionPerWeekTeam3 =[]
       let deletionPerWeekTeam3 = []
       let commitsPerWeekTeam3= []

       for(var i=0; i<AdcdataTeam3[0].weeks.length;i++){
        additionPerWeekTeam3.push(AdcdataTeam3[0].weeks[i].a)
        deletionPerWeekTeam3.push(AdcdataTeam3[0].weeks[i].d)
        commitsPerWeekTeam3.push(AdcdataTeam3[0].weeks[i].c)    
       }
    //    this.setState({NoAdditionPerWeekTeam3:additionPerWeekTeam3})
       this.setState({NoDeletionPerWeekTeam3:deletionPerWeekTeam3})
       this.setState({NoCommitsPerWeekTeam3:commitsPerWeekTeam3})
       console.log(AdcdataTeam3[0].weeks)

       const AdcurlTeam4 = "https://api.github.com/repos/Kaustubh-DB/Assigment1_OOSD/stats/contributors"
        const AdcresponseTeam4 = await fetch(AdcurlTeam4)
        const AdcdataTeam4 = await AdcresponseTeam4.json();
       // this.setState({weeklyCountTeam1:dataTeam[0].weeks})
       let additionPerWeekTeam4 =[]
       let deletionPerWeekTeam4 = []
       let commitsPerWeekTeam4= []

       for(var i=0; i<AdcdataTeam4[0].weeks.length;i++){
        additionPerWeekTeam4.push(AdcdataTeam4[0].weeks[i].a)
        deletionPerWeekTeam4.push(AdcdataTeam4[0].weeks[i].d)
        commitsPerWeekTeam4.push(AdcdataTeam4[0].weeks[i].c)    
       }
       this.setState({NoAdditionPerWeekTeam4:additionPerWeekTeam4})
       this.setState({NoDeletionPerWeekTeam4:deletionPerWeekTeam4})
       this.setState({NoCommitsPerWeekTeam4:commitsPerWeekTeam4})

    }
    
    async useEffect(){
        // https://api.github.com/repos/twitter/bootstrap/branches
        //# https://api.github.com/repos/:user/:repo/branches
        //fetch("https://api.github.com/repos/kaustubh-DB/Assigment1_OOSD/master")
        const url = "https://api.github.com/search/repositories?q=stars:>100000"
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
        result.items.foreach(i => console.log(i.full_name))
        // fetch("")
        // .then(res => res.json())
        // .then(data => {
        //     setData(data)
        // })
    }

    
    async getIssues(){

        const url = "https://api.github.com/search/issues?q=author:raisedadead repo:freeCodeCamp/freeCodeCamp type:issue"
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
       // result.items.foreach(i => console.log(i.full_name))

          Array.prototype.forEach.call(result.items, child => {
              console.log(child.commit)
        });
        // // fetch("")
        // .then(res => res.json())
        // .then(data => {
        //     setData(data)
        // })
    }

    async getStatistics(){

        const url = "https://api.github.com/repos/Kaustubh-DB/Empirical-Java/stats/contributors"
        const response = await fetch(url)
        const data = await response.json();
        console.log(data[0].total)

    }


    render() {
        console.log('render')
        return (
            <div>
                <h4 align = "center">Search Github User</h4>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div></div>
                <div></div>
                <div className="container">
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <div>
                        <button className="btn btn-success"onClick={this.useEffect} >Search</button>
                        </div>
                        <div>
                        Commits of Team1:{this.state.TotalcommitsTeam1}<br/>
                        {/* Commits of Team2:{this.state.TotalcommitsTeam2}<br/> */}
                        Commits of Team2:{this.state.TotalcommitsTeam3}<br/>
                        Commits of Team3:{this.state.TotalcommitsTeam4}<br/>
                        No of Addition Per Week Team 1: {this.state.NoAdditionPerWeekTeam1} <br/>
                        No of Deletion Per Week Team 1:{this.state.NoDeletionPerWeekTeam1}<br/>
                        No of Commits Per Week Team 1: {this.state.NoCommitsPerWeekTeam1} <br/>
                        {/* No of Addition Per Week Team 2: {this.state.NoAdditionPerWeekTeam2} <br/>
                        No of Deletion Per Week Team 2:{this.state.NoDeletionPerWeekTeam2}<br/>
                        No of Commits Per Week Team 2: {this.state.NoCommitsPerWeekTeam2} <br/> */}
                        No of Addition Per Week Team 2: {this.state.NoAdditionPerWeekTeam3} <br/>
                        No of Deletion Per Week Team 2:{this.state.NoDeletionPerWeekTeam3}<br/>
                        No of Commits Per Week Team 2: {this.state.NoCommitsPerWeekTeam3} <br/>
                        No of Addition Per Week Team 3: {this.state.NoAdditionPerWeekTeam4} <br/>
                        No of Deletion Per Week Team 3:{this.state.NoDeletionPerWeekTeam4}<br/>
                        No of Commits Per Week Team 3: {this.state.NoCommitsPerWeekTeam4} <br/>


                        </div>
                </div>
            </div>
        )
    }
}
export default GitApiComponent