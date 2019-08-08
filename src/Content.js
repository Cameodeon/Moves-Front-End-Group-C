import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent : ""
    };
    localStorage.setItem("lang", "en-CA");
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/textContent/${localStorage.getItem("lang")}/${this.props.slug}`)
    .then((response) => {
      if (response.status !== 200) {
        return;
      }

      response.json().then((data) => {
        this.setState({ textContent: data.data[0].content });
      });

    })
  }

  render() {
    return (
      <div>{ ReactHtmlParser(this.state.textContent) }</div>
    );
  }
}

export default Content;
