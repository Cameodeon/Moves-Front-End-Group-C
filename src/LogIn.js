import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Auth from './Auth';

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

  url = `https://movesws-teamc-baa.herokuapp.com/api/user/login`;

  onChange(e){
      this.setState({[e.target.name]: e.target.value});
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
        this.props.toggleLogIn(true, data.token);

        // Dummy request for Service Worker to hijack
        fetch('https://movesws-teamc-baa.herokuapp.com/api/phoneNumber/dkCallCenter', { headers: { 'Content-Type':  'application/json', "Authorization": `Bearer ${localStorage.getItem('access_token')}` }});
        fetch('https://movesws-teamc-baa.herokuapp.com/api/phoneNumber/maCallCenter', { headers: { 'Content-Type':  'application/json', "Authorization": `Bearer ${localStorage.getItem('access_token')}` }});
      } else {
        this.setState({errMsg: data.message});
      }
    })
    .catch(error => {
      console.log("Caught an error:", error.message);
    });
  
  }

  render() {
    var { dict } = this.props;
    return Auth.isAuth() ? <Redirect to='/'/> : (      
      <div className="container-fluid">
        <h2 className="form-signin-heading">{dict.login}</h2>
        <p className="errMsg">{this.state.errMsg}</p>
        <div className="form-group">
          <label htmlFor="username" className="control-label">{dict.username}</label>
          <div className="col-md-12 col-xl-6">
            <input type="text" name="username" id="username" className="form-control" value={this.state.username} ref={(i) => {this.input = i}} onChange={this.onChange} autoFocus />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="control-label">{dict.password}</label>
          <div className="col-md-12 col-xl-6">
            <input type="password" name="password" id="password" className="form-control" value={this.state.password} ref={(i) => {this.input = i}} onChange={this.onChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-2 col-md-12 col-xl-6">
            <button className="btn btn-primary btn-block" onClick={this.submitForm}>{dict.login}</button>
          </div>
        </div>
    </div>
    )
  }
}

export default withRouter(LogIn);