import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from './Auth';
import ToggleLogInButton from './ToggleLogInButton';
import './Navbar.css';

class Navbar extends Component {

    checkLangauge(langCode) {
        return localStorage.getItem('lang') === langCode;
    }

    render() {
        var { dict, changeLanguage, toggleLogIn } = this.props;
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
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="#">{dict.help}</Link>
                        </li>*/}
                        <li className="nav-item">
                            <a className="nav-link" href="https://cfvaa.com" target="_blank" rel="noopener noreferrer">{dict.icva}</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/content/about">{dict.about}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/content/contact">{dict.contact}</Link>
                        </li>
                        <li className="nav-item" id="toggleLogBtn">
                            <ToggleLogInButton dict={dict.toggleLog} toggleLogIn={toggleLogIn} />
                        </li>
                        {
                            Auth.isAuth() ?
                                <li className="nav-item d-none d-xl-inline greetingMsg">
                                    <p className="greetingMsgText">{dict.hello}, <span className="fullName">{Auth.getUser().fullName}</span>!</p>
                                </li>
                            :
                                null
                        }
                    </ul>
                </div>

                <div className="collapse navbar-collapse" id="languageSelector" data-parent="#customNavbar">
                    <ul className="navbar-nav ml-auto text-center">
                        <li className="nav-item first-nav-item">
                            <button className="nav-link btn" onClick={() => changeLanguage("en-CA")} disabled={this.checkLangauge('en-CA')}>
                                <span className="flag-icon flag-icon-gb"></span> &nbsp;
                                English
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => changeLanguage("fr")} disabled={this.checkLangauge('fr')}>
                                <span className="flag-icon flag-icon-fr"></span> &nbsp;
                                Français
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {
                Auth.isAuth() ?
                    <p className="d-xl-none text-center greetMsgTextSm">{dict.hello}, <span className="fullName">{Auth.getUser().fullName}</span>!</p>
                :
                    null
            }
        </div>
        );
    }

}

export default Navbar;