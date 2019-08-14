import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './Home';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Content from './Content';
import EmergencyContact from './EmergencyContact';
import LogIn from "./LogIn";
import LogOut from './LogOut';
import Activate from './Activate';
import Setting from './Setting';
import './App.css';

class App extends Component {

  state = {
    language: localStorage.getItem("lang"),
    langFileDir: "",
    dict: {  },
    loaded: false,
    isLoggedIn: localStorage.getItem('access_token') ? true : false
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
    this.isLoggedIn = this.isLoggedIn.bind(this);
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
    } else {
      localStorage.removeItem('access_token');
    }
    this.setState({isLoggedIn: newStatus});
  }

  isLoggedIn() {
    return this.state.isLoggedIn;
  }

  render() {
    var dict = this.state.dict;
    return !this.state.loaded ? null : (
      <div className="container-fluid">
        <Header dict={dict.header} />
        <Navbar dict={dict.navbar} changeLanguage={this.onChangeLanguage} changeLogInStatus={this.onToggleLogIn} isLoggedIn={this.isLoggedIn} />
        <hr />
        <Switch>
          <Route exact path='/' render={() => <Home dict={dict.home}/>} />
          <Route exact path='/content/:slug' render={props => <Content slug={props.match.params.slug}/>} />
          <Route exact path='/emergency' render={() => <EmergencyContact dict={dict.emergency} />} />
          <Route exact path='/login' render={() => <LogIn changeLogInStatus={this.onToggleLogIn} isLoggedIn={this.isLoggedIn} />}/>
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

const Header = (props) => {
  var dict = props.dict;
  return(
    <header>
      <div className="header text-center">
        <h1 className="appTitle">MO:VES</h1>
        <p className="appDescription">{dict.description}</p>
        <Link id="emergencyButton" className="btn btn-danger" to="/emergency">
          <FontAwesomeIcon icon={['fas', 'phone-alt']} style={{color: 'white'}} size="lg" /> &nbsp;
          {dict.call}
        </Link>
      </div>
    </header>
  );
}
