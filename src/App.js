import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import Home from './Home';

class App extends React.Component {

  state = { dict: { } };

  constructor(props) {
    super(props);
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "en-CA");
    }
  }

  componentDidMount() {
    fetch(`../public/languageUI/${localStorage.getItem("lang")}.json`)
    .then(res => res.json())
    .then(data => this.setState({dict: data}));
  }

  render() {
    var dict = this.state.dict;
    return (
      <div className="container-fluid">
        <Header dict={dict.header} />
        <Navbar dict={dict.navbar} />
        <hr />
        <Switch>
          <Route exact path='/' render={() => <Home dict={dict.home}/>} />
          <Route exact path='/content/:slug' render={props => <Content slug={props.match.params.slug}/>} />
          <Route exact path='/emergencyContact' render={() => <EmergencyContact/>} />
          <Route render={() => <NotFound/>} />
        </Switch>
        <hr />
      </div>
    )
  }

}

export default App;
