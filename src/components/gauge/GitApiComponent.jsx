import React, { Component } from 'react'
import GitHubDataService from '../../api/gaugeservice/GitHubDataService.js'
import moment from 'moment'
import ls from 'local-storage'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AuthenticationService from './AuthenticationService.js'
import axios from 'axios'

class GitApiComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

            TotalcommitsTeam1: 14,
            TotalcommitsTeam2: 0,
            TotalcommitsTeam3: 0,
            TotalcommitsTeam4: 0,
            Team1Week1:[],
            Team1Week2:[],
            Team1Week3:[],
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
            NoCommitsPerWeekTeam4:[],
            todos:[]



        }
        this.callGitBackEndAPI = this.callGitBackEndAPI.bind(this);
        // this.handleChange = this.handleChange.bind(this)
        // this.loginClicked = this.loginClicked.bind(this)
       // this.renderTableData=this.renderTableData.bind(this)
    }

    // renderTableData() {
    //     return this.state.students.map((student, index) => {
    //        const { id, name, age, email } = student //destructuring
    //        return (
    //           <tr key={id}>
    //              <td>{id}</td>
    //              <td>{name}</td>
    //              <td>{age}</td>
    //              <td>{email}</td>
    //           </tr>
    //        )
    //     })
    //  }

     componentDidMount() {
        console.log('componentDidMount')
        this.getbackendGitData();
        console.log(this.state.TotalcommitsTeam1)
    }

    callGitBackEndAPI() {
        console.log("IN API")
        let username = AuthenticationService.getLoggedInUserName()
        
        console.log("USERNAME",username)
        console.log("SARRRAYVALUE",this.state.Team1Week1)
        GitHubDataService.retrieveAllGitDataFromDB(this.state.Team1Week1)
            .then(
                response => {
                    console.log("RESSPOONNSEE"+response);
                    //this.setState({ todos: response.data })
                }
            )
            .catch(err =>{
                console.log("Error" + err);
            });
    }

  
    async componentDidMount(){

        const urlTeam1 = "https://api.github.com/repos/fabpot/symfony/stats/contributors"
        const responseTeam1 = await fetch(urlTeam1)
        const dataTeam1 = await responseTeam1.json();

        for(i=0; i<dataTeam1[99].weeks.length; i++){//for github IU testing put 0 instead of 99
            if(i>=500){         
                if(i ==500){        
                    let temp= [];                    // Remove this if condition when testing for github iu
            console.log("***Inside",i,dataTeam1[99].weeks[i])   
            temp.push(dataTeam1[99].weeks[i].c)
            temp.push(dataTeam1[99].weeks[i].a)
            temp.push(dataTeam1[99].weeks[i].d)
            this.setState({Team1Week1:temp}) 
                }
                if(i ==504){        
                    let temp= [];                    // Remove this if condition when testing for github iu
            console.log("***Inside",i,dataTeam1[99].weeks[i])   
            temp.push(dataTeam1[99].weeks[i].c)
            temp.push(dataTeam1[99].weeks[i].a)
            temp.push(dataTeam1[99].weeks[i].d)
            this.setState({Team1Week2:temp}) 
                }
                if(i ==509){        
                    let temp= [];                    // Remove this if condition when testing for github iu
            console.log("***Inside",i,dataTeam1[99].weeks[i])   
            temp.push(dataTeam1[99].weeks[i].c)
            temp.push(dataTeam1[99].weeks[i].a)
            temp.push(dataTeam1[99].weeks[i].d)
            this.setState({Team1Week3:temp}) 
                }
            }
        }

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
        //console.log("EMPIRICAL",AdcdataTeam1)
       // this.setState({weeklyCountTeam1:dataTeam[0].weeks})
       let additionPerWeekTeam1 =[]
       let deletionPerWeekTeam1 = []
       let commitsPerWeekTeam1 = []//*

       for(var i=0; i<AdcdataTeam1[0].weeks.length;i++){
        additionPerWeekTeam1.push(AdcdataTeam1[0].weeks[i].a)
        // deletionPerWeekTeam1.push(AdcdataTeam1[0].weeks[i].d)
        //commitsPerWeekTeam1.push(AdcdataTeam1[0].weeks[i].c)    
       }
       this.setState({NoAdditionPerWeekTeam1:additionPerWeekTeam1})
    //    this.setState({NoDeletionPerWeekTeam1:deletionPerWeekTeam1})
      // this.setState({NoCommitsPerWeekTeam1:commitsPerWeekTeam1})
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
       // console.log(AdcdataTeam2)
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
    

    render() {
        console.log('render')
        return (
            <div>
               <div> <h4 align = "center">GitHub Statistics</h4><br/></div>
            
            <button className="btn btn-success" onClick={this.callGitBackEndAPI}>GetStats</button>

            <div> Team1Week1 : {this.state.Team1Week1}</div>
            <div> Team1Week2 : {this.state.Team1Week2}</div>
            <div> Team1Week3 : {this.state.Team1Week3}</div>
            

           </div> 
        )
    }
}
export default GitApiComponent