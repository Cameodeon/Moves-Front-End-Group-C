import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Content extends Component {

  state = {
    textContent : "",
    title: ""
  };

  url = `https://localhost:8080/api/textContent/${localStorage.getItem("lang")}/`;

  componentDidMount() {
    fetch(this.url + this.props.slug)
    .then(response => (response.status !== 200 ? Promise.reject("Bad Response") : response.json()))
    .then(data => this.setState({
      textContent: data.data[0].content,
      title: data.data[0].title
    }))
    .catch(err =>this.setState({ 
      textContent: "<h2>Content Coming Soon...</h2>",
      title: "Hello!"
    }));
  }

  render() {
    return (
      <div>
        { ReactHtmlParser(this.state.textContent) }
      </div>
    );
  }
}

export default Content;
