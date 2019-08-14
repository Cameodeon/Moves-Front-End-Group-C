import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToggleLogInButton from './ToggleLogInButton';
import './Navbar.css';

class Navbar extends Component {

    render() {
        var { dict, changeLanguage, changeLogInStatus, isLoggedIn } = this.props;
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
                    <li className="nav-item first-nav-item" id="homeBtn">
                        <Link className="navbar-brand nav-link btn-dark" to="/">
                            <FontAwesomeIcon icon={['fas', 'home']} style={{color: 'white'}} size="lg" /> &nbsp;
                            {dict.home}
                        </Link>
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
                    <li className="nav-item" id="loginBtn">
                        <ToggleLogInButton dict={dict.toggleLog} changeLogInStatus={changeLogInStatus} isLoggedIn={isLoggedIn} />
                    </li>
                </ul>
            </div>

            <div className="collapse navbar-collapse" id="languageSelector" data-parent="#customNavbar">
                <ul className="navbar-nav ml-auto text-center">
                    <li className="nav-item first-nav-item">
                        <button className="nav-link btn" onClick={() => changeLanguage("en-CA")}>
                            <span className="flag-icon flag-icon-ca"></span> &nbsp;
                            English (Canada)
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn" onClick={() => changeLanguage("vn")}>
                            <span className="flag-icon flag-icon-vn"></span> &nbsp;
                            Tiếng Việt
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

}

export default Navbar;