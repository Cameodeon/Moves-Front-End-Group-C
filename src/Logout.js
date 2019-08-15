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
        return (
            <div className="container-fluid">
                <h2>You are logged out!</h2>
                <p>Redirecting to previous page in <span className="timerSecond">{this.state.second}</span> second(s).</p>
            </div>
        );
    }

}

export default withRouter(LogOut);