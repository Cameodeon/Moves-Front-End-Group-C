import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <footer>
                <div className="container-fluid footer bg-dark">
                    <p className="footer-content">&copy; 2019, <span className="appName">MO:VES</span>, Business Academy Aarhus, Team C</p>
                </div>
            </footer>
        );
    }

}

export default Footer;