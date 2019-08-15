import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToggleLogInButton from './ToggleLogInButton';
import './Navbar.css';

class Navbar extends Component {

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    render() {
        var { dict, changeLanguage, changeLogInStatus } = this.props;
        return (
        <div>
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
                        <li className="nav-item" id="toggleLogBtn">
                            <ToggleLogInButton dict={dict.toggleLog} changeLogInStatus={changeLogInStatus}/>
                        </li>
                        {
                            this.isLoggedIn() ?
                                <li className="nav-item d-none d-xl-inline greetingMsg">
                                    <p className="greetingMsgText">Hello, <span className="fullName">{this.props.jwtPayload.fullName}</span> !</p>
                                </li>
                            :
                                null
                        }
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
            {
                this.isLoggedIn() ?
                    <p className="d-xl-none text-center greetMsgTextSm">Hello, <span className="fullName">{this.props.jwtPayload.fullName}</span> !</p>
                :
                    null
            }
        </div>
        );
    }

}

export default Navbar;