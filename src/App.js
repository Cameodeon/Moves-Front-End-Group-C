import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Home from './Home';
import Header from './Header';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Content from './Content';
import EmergencyContact from './EmergencyContact';
import LogIn from "./LogIn";
import LogOut from './LogOut';
import './App.css';

class App extends Component {

  state = {
    language: localStorage.getItem("lang"),
    langFileDir: "",
    dict: {  },
    loaded: false,
    isLoggedIn: localStorage.getItem('access_token') ? true : false,
    jwt_payload: { }
  };

  constructor(props) {
    super(props);
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "en-CA");
      this.state.language = 'en-CA';
      this.state.langFileDir = `/languageUI/en-CA.json`;
    } else {
      this.state.language = localStorage.getItem("lang");
      this.state.langFileDir = `/languageUI/${localStorage.getItem("lang")}.json`;
    }
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onToggleLogIn = this.onToggleLogIn.bind(this);
  }

  componentDidMount() {
    fetch(this.state.langFileDir, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => this.setState({dict: data, loaded: true}));
    if (this.state.isLoggedIn) {
      let token = localStorage.getItem('access_token');
      var jwt_payload = jwtDecode(token);
      this.setState({ jwt_payload });
    }
  }

  onChangeLanguage(newLang) {
    this.setState({loaded: false,
      language: newLang,
      langFileDir: `/languageUI/${newLang}.json`
    }, () => {
      localStorage.setItem("lang", newLang);
      fetch(this.state.langFileDir, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => this.setState({dict: data, loaded: true}));
    });
  }

  onToggleLogIn(newStatus, optionalToken) {
    if (newStatus) {
      localStorage.setItem('access_token', optionalToken);
      let token = localStorage.getItem('access_token');
      var jwt_payload = jwtDecode(token);
      this.setState({ jwt_payload });
    } else {
      localStorage.removeItem('access_token');
    }
    this.setState({isLoggedIn: newStatus});
  }

  render() {
    var dict = this.state.dict;
    return !this.state.loaded ? null : (
      <div className="container-fluid">
        <Header dict={dict.header} />
        <Navbar dict={dict.navbar} changeLanguage={this.onChangeLanguage} changeLogInStatus={this.onToggleLogIn} jwtPayload={this.state.jwt_payload} />
        <hr />
        <Switch>
          <Route exact path='/' render={() => <Home dict={dict.home}/>} />
          <Route exact path='/content/:slug' render={props => <Content slug={props.match.params.slug}/>} />
          <Route exact path='/emergency' render={() => <EmergencyContact dict={dict.emergency} />} />
          <Route exact path='/login' render={() => <LogIn changeLogInStatus={this.onToggleLogIn} />}/>
          <Route exact path='/logout' render={() => <LogOut />} />
          {/* <Route exact path="/logout" render={() => <Logout />}/>
          <Route exact path="/setting" render={() => <Setting/>}/>
          <Route exact path="/activate" render={() => <Activate/>}/> */}
          <Route render={() => <NotFound dict={dict.notfound} />} />
        </Switch>
        <hr />
      </div>
    );
  }

}

export default App;
