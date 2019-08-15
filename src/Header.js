import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from './Auth';
import './Header.css';

class Header extends Component {

    render() {
        var { dict } = this.props;
        return(
          <header>
            <div className="header text-center">
                <h1 className="appTitle">MO:VES</h1>
                <p className="appDescription">{dict.description}</p>
                {
                Auth.isAuth() ?
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