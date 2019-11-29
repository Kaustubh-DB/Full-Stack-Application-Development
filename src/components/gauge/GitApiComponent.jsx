import React, { Component } from 'react'
import TodoDataService from '../../api/gaugeservice/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import ls from 'local-storage'

class GitApiComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            commitTeam1: 0,
            commitTeam2: 0,
            commitTeam3: 0,
            commitTeam4: 0

        }
        // this.handleChange = this.handleChange.bind(this)
        // this.loginClicked = this.loginClicked.bind(this)
    }


    async componentDidMount(){

        const urlTeam1 = "https://api.github.com/repos/Kaustubh-DB/Empirical-Java/stats/contributors"
        const responseTeam1 = await fetch(urlTeam1)
        const dataTeam1 = await responseTeam1.json();
        this.setState({commitTeam1:dataTeam1[0].total})

        const urlTeam2 = "https://api.github.com/repos/Kaustubh-DB/Object-Oriented-Software-Development/stats/contributors"
        const responseTeam2 = await fetch(urlTeam2)
        const dataTeam2 = await responseTeam2.json();
        this.setState({commitTeam2:dataTeam2[0].total})

        const urlTeam3 = "https://api.github.com/repos/Kaustubh-DB/AI-Projects/stats/contributors"
        const responseTeam3 = await fetch(urlTeam3)
        const dataTeam3 = await responseTeam3.json();
        this.setState({commitTeam3:dataTeam3[0].total})

        const urlTeam4 = "https://api.github.com/repos/Kaustubh-DB/Assigment1_OOSD/stats/contributors"
        const responseTeam4 = await fetch(urlTeam4)
        const dataTeam4 = await responseTeam4.json();
        this.setState({commitTeam4:dataTeam4[0].total})


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
                        Commits of Team1:{this.state.commitTeam1}<br/>
                        Commits of Team2:{this.state.commitTeam2}<br/>
                        Commits of Team3:{this.state.commitTeam3}<br/>
                        Commits of Team4:{this.state.commitTeam4}<br/>
                        </div>
                </div>
            </div>
        )
    }
}
export default GitApiComponent