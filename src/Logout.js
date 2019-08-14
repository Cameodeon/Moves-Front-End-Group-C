import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

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
        return (
            <h2>You are logged out! Redirecting to previous page in <span>{this.state.second}</span> second(s).</h2>
        );
    }

}

export default withRouter(LogOut);