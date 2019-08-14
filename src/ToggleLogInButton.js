import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class ToggleLogInButton extends Component {

    constructor(props) {
        super(props);
        this.onLogOutButtonClick = this.onLogOutButtonClick.bind(this);
    }

    onLogOutButtonClick() {
        this.props.changeLogInStatus(false);
    }

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    render(){
        var { dict } = this.props;
        return(
            <div>
                {!this.isLoggedIn() ?
                <Link className="navbar-brand nav-link btn-dark" to="/login">
                    <FontAwesomeIcon icon={['fas', 'users']} style={{color: 'white'}} size="lg" /> &nbsp;
                    {dict.login}
                </Link>
                :
                <Link role="button" onClick={this.onLogOutButtonClick} className="navbar-brand nav-link btn-dark" to="/logout">
                    <FontAwesomeIcon icon={['fas', 'sign-out-alt']} style={{color: 'white'}} size="lg" /> &nbsp;
                    {dict.logout}
                </Link>
                }
            </div>
        )
    }
}

export default ToggleLogInButton;