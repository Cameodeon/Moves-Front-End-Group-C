import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './Home';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Content from './Content';
import EmergencyContact from './EmergencyContact';
import './App.css';

class App extends Component {

  state = {
    language: localStorage.getItem("lang"),
    langFileDir: "",
    dict: {  },
    loaded: false
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

  render() {
    var dict = this.state.dict;
    return !this.state.loaded ? null : (
      <div className="container-fluid">
        <Header dict={dict.header} />
        <Navbar dict={dict.navbar} changeLanguage={this.onChangeLanguage} />
        <hr />
        <Switch>
          <Route exact path='/' render={() => <Home dict={dict.home}/>} />
          <Route exact path='/content/:slug' render={props => <Content slug={props.match.params.slug}/>} />
          <Route exact path='/emergency' render={() => <EmergencyContact dict={dict.emergency} />} />
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
