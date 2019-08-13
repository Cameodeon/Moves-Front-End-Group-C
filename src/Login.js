import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

export default class Login extends Component{
  constructor(props){
    super(props)
    let loggedIn = false
    this.state = {
      username:"",
      password:"",
      loggedIn
       
    }
    this.onChange= this.onChange.bind(this)
    this.submitForm = this.onChange.bind(this)
  }

  url = "http://localhost:8080/api/user/login";

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }

  componentDidMount() {
   
  }
  
  submitForm(e){
    const credentials = {
      "userName": this.state.userName,
      "password": this.state.password,
    };
    
    fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      headers: { 
        // Currently in excess of what is needed; probably need only the first three
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, HEAD, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Origin,Content-Type,Accept,Authorization,Expires,Pragma,x-custom-header"
      },
      body: JSON.stringify(credentials)
    })
    .then(response => {
      if (response.ok) {
        response.json()
        .then((data) => {
          localStorage.setItem('access_token', data.token);
          return this.props.history.push("/token");
        });
      } else if (response.status >= 400 && response.status < 500) {
        // Error caused by the requestor          
        throw Error(`HTTP ${response.status}, ${response.statusText}`);
      } else {
        throw Error(`HTTP ${response.status}, ${response.statusText}`);
      }
    })
    .catch(error => {
      // Handles an error thrown above, as well as network general errors
      console.log("Caught an error:", error.message);
    });
  
  }

  render(){
    if(this.state.loggedIn){
      return <Redirect to="/setting"/>
    }

    return(
      
      
      <div className="container">
      <form
        className="form-signin"
        onSubmit={this.onSubmit}
      >
        <h2 className="form-signin-heading">
          Log In
        </h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onChange}
            autoFocus
          />
          <span className="help-block"></span>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <span className="help-block"></span>
        </div>

        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
    )
  }
}
