import React, { Component } from 'react'
import TodoDataService from '../../api/gaugeservice/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class GitApiComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }


    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })


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
                </div>
            </div>
        )
    }
}
export default GitApiComponent