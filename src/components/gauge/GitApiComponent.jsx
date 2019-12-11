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
    }

    callGitBackEndAPI() {
        console.log("IN API")
        let username = AuthenticationService.getLoggedInUserName()
        let team1weekone = this.state.Team1Week1
        let team1weektwo = this.state.Team1Week2
        let team1weekthreee = this.state.Team1Week3
        console.log("TEAM!WEEK2",team1weektwo)
        console.log("TEAM!WEEK3",team1weekthreee)
        GitHubDataService.postTeam1Data(team1weekone,team1weektwo,team1weekthreee)
            .then(
                response => {
                    console.log("RESSPOONNSEE"+response);
                    //this.setState({ todos: response.data })
                }
            )
            .catch(err =>{
                console.log("Error" + err);
            });
            // GitHubDataService.postTeam2Data(team1weekone,team1weektwo,team1weekthreee)
            // .then(
            //     response => {
            //         console.log("RESSPOONNSEE"+response);
            //         //this.setState({ todos: response.data })
            //     }
            // )
            // .catch(err =>{
            //     console.log("Error" + err);
            // });
    }

  
    async componentDidMount(){

        const urlTeam1 = "https://api.github.com/repos/fabpot/symfony/stats/contributors"
        const responseTeam1 = await fetch(urlTeam1)
        const dataTeam1 = await responseTeam1.json();
        var i=0
        for(i=0; i<dataTeam1[99].weeks.length; i++){//for github IU testing put 0 instead of 99
            if(i>=500){         
                if(i == 500){        
                    let temp= [];                    // Remove this if condition when testing for github iu
            console.log("***Inside",i,dataTeam1[99].weeks[i])   
            temp.push(dataTeam1[99].weeks[i].c)
            temp.push(dataTeam1[99].weeks[i].a)
            temp.push(dataTeam1[99].weeks[i].d)
            this.setState({Team1Week1:temp}) 
                }
                if(i == 504){        
                    let temp= [];                    // Remove this if condition when testing for github iu
            console.log("***Inside",i,dataTeam1[99].weeks[i])   
            temp.push(dataTeam1[99].weeks[i].c)
            temp.push(dataTeam1[99].weeks[i].a)
            temp.push(dataTeam1[99].weeks[i].d)
            this.setState({Team1Week2:temp}) 
                }
                if(i == 509){        
                    let temp= [];                    // Remove this if condition when testing for github iu
            console.log("***Inside",i,dataTeam1[99].weeks[i])   
            temp.push(dataTeam1[99].weeks[i].c)
            temp.push(dataTeam1[99].weeks[i].a)
            temp.push(dataTeam1[99].weeks[i].d)
            this.setState({Team1Week3:temp}) 
                }
            }
        }

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