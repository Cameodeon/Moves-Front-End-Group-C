import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './LogOut.css'

class LogOut extends Component {

    state = {
        second: 3
    }

    componentDidMount() {
        let interval = setInterval(() => {
            this.setState({second: this.state.second - 1}, () => {
                if (this.state.second === 0) {
                    this.props.history.goBack();
                    clearInterval(interval);
                }
            });
        }, 1000);
    }

    render() {
        var { dict } = this.props;
        return (
            <div className="container-fluid">
                <h2 className="logoutHeader">{dict.header}</h2>
                <p className="logoutMsg">{dict.messagePart1} <span className="timerSecond">{this.state.second}</span> {dict.messagePart2}.</p>
            </div>
        );
    }

}

export default withRouter(LogOut);
