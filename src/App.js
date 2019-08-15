import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Content from './Content';
import EmergencyContact from './EmergencyContact';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Auth from './Auth';
import './App.css';

class App extends Component {

  state = {
    language: localStorage.getItem("lang"),
    langFileDir: "",
    dict: {  },
    loaded: false,
    isLoggedIn: Auth.isAuth()
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
  }

  onToggleLogIn(newStatus, optionalToken) {
    if (newStatus) {
      Auth.login(optionalToken);
    } else {
      Auth.signout();
    }
    this.setState({isLoggedIn: newStatus});
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

  render() {
    var dict = this.state.dict;
    return !this.state.loaded ? null : (
      <div className="container-fluid">
        <Header dict={dict.header} />
        <Navbar dict={dict.navbar} changeLanguage={this.onChangeLanguage} toggleLogIn={this.onToggleLogIn} />
        <hr />
        <Switch>
          <Route exact path='/' render={() => <Home dict={dict.home}/>} />
          <Route exact path='/content/:slug' render={props => <Content slug={props.match.params.slug}/>} />
          <PrivateRoute exact path='/emergency' component={() => <EmergencyContact dict={dict.emergency} />} />
          <Route exact path='/login' render={() => <LogIn dict={dict.login} toggleLogIn={this.onToggleLogIn} />}/>
          <Route exact path='/logout' render={() => <LogOut dict={dict.logout} />} />
          <Route render={() => <NotFound dict={dict.notfound} />} />
        </Switch>
        <hr />
      </div>
    );
  }

}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => Auth.isAuth() ? <Component {...props} /> : <Redirect to="/login" />} />
);

export default App;

