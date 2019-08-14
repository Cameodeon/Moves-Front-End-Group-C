import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

class LogIn extends Component{

  state = {
    username: "",
    password: "",
    errMsg: "",     
  }

  constructor(props){
    super(props);
    this.onChange= this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  url = "https://movesws-teamc-baa.herokuapp.com/api/user/login";

  onChange(e){
      this.setState({[e.target.name]: e.target.value});
  }

  isLoggedIn() {
    return localStorage.getItem('access_token');
  }
  
  submitForm(e){
    e.preventDefault();
    const credentials = {
      "userName": this.state.username,
      "password": this.state.password,
    };
    fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then((data) => {
      if (data.token) {
        this.props.history.goBack();
        this.props.changeLogInStatus(true, data.token);
      } else {
        this.setState({errMsg: data.message});
      }
    })
    .catch(error => {
      console.log("Caught an error:", error.message);
    });
  
  }

  render() {
    return this.isLoggedIn() ? <Redirect to='/'/> : (      
      <div className="container-fluid">
        <h2 className="form-signin-heading">Log In</h2>
        <p className="errMsg">{this.state.errMsg}</p>
        <div className="form-group">
          <label htmlFor="username" className="control-label">Username</label>
          <div className="col-md-12 col-xl-6">
            <input type="text" name="username" id="username" className="form-control" value={this.state.username} ref={(i) => {this.input = i}} onChange={this.onChange} autoFocus />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="control-label">Password</label>
          <div className="col-md-12 col-xl-6">
            <input type="password" name="password" id="password" className="form-control" value={this.state.password} ref={(i) => {this.input = i}} onChange={this.onChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-2 col-md-6">
            <button className="btn btn-primary" onClick={this.submitForm} >Log In</button>
          </div>
        </div>
    </div>
    )
  }
}

export default withRouter(LogIn);