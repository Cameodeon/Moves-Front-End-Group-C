import React, { Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

export default class setting extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = false

        
        if(token == null){
            loggedIn = false
        }
        this.state = {
            loggedIn
        }
    }
    render(){
        if(this.state.loggedIn === false){
            return <Redirect to = "/login"/>
        }
        return(
            <div>
                <h1>This is a Setting  Page, Only auth can see this</h1>
                <Link to="/logout">Logout</Link>
            </div>

        )
    }
}