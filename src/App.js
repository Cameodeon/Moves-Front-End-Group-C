import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import NotFound from './NotFound';
import './App.css';
import 'bootstrap/js/src/collapse.js';

import Home from './Home';

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
      this.state.langFileDir = `languageUI/en-CA.json`;
    } else {
      this.state.language = localStorage.getItem("lang");
      this.state.langFileDir = `languageUI/${localStorage.getItem("lang")}.json`;
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
      langFileDir: `languageUI/${newLang}.json`
    }, () => {
      localStorage.setItem("lang", newLang);
      fetch(this.state.langFileDir, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
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
          {/* <Route exact path='/content/:slug' render={props => <Content slug={props.match.params.slug}/>} />
          <Route exact path='/emergencyContact' render={() => <EmergencyContact/>} />*/}
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
        <h1>MO:VES</h1>
        <p>{dict.description}</p>
        <Link id="emergencyButton" className="btn btn-danger" to="/emergency">{dict.call}</Link>
        {/* <a href="tel:123-456-7890">123-456-7890</a> */}
      </div>

    </header>
  );
}

const Navbar = (props) => {
    var { dict, changeLanguage } = props;
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id="customNavbar">
        <button className="navbar-toggler btn-lg" type="button" data-toggle="collapse" data-target="#menuBar">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <button className="navbar-toggler navbar-button" type="button" data-toggle="collapse" data-target="#languageSelector">
          {dict.selectLang}
        </button>

        <div className="collapse navbar-collapse" id="menuBar" data-parent="#customNavbar">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link className="navbar-brand nav-link" to="/">{dict.home}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">{dict.help}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">{dict.info}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">{dict.about}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">{dict.contact}</Link>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="languageSelector" data-parent="#customNavbar">
          <ul className="navbar-nav ml-auto text-center">
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => changeLanguage("en-CA")}>
                {dict.english}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => changeLanguage("vn")}>
                {dict.vietnamese}
              </button>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="#">{dict.danish}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">{dict.french}</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );

}
