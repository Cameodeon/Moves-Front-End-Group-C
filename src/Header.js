import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

class Header extends Component {

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    render() {
        var dict = this.props.dict;
        return(
          <header>
            <div className="header text-center">
                <h1 className="appTitle">MO:VES</h1>
                <p className="appDescription">{dict.description}</p>
                {
                this.isLoggedIn() ?
                <Link id="emergencyButton" className="btn btn-danger" to="/emergency">
                    <FontAwesomeIcon icon={['fas', 'phone-alt']} style={{color: 'white'}} size="lg" /> &nbsp;
                    {dict.call}
                </Link>
                :
                null
                }
            </div>
          </header>
        );
    }

}

export default Header;