import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Auth from './Auth';

class ToggleLogInButton extends Component {

    constructor(props) {
        super(props);
        this.onLogOutButtonClick = this.onLogOutButtonClick.bind(this);
    }

    onLogOutButtonClick() {
        this.props.toggleLogIn(false);
    }

    render(){
        var { dict } = this.props;
        return(
            <div>
                {
                !Auth.isAuth() ?
                <Link className="nav-link btn-dark" to="/login">
                    <FontAwesomeIcon icon={['fas', 'users']} style={{color: 'white'}} size="lg" /> &nbsp;
                    {dict.login}
                </Link>
                :
                <Link role="button" onClick={this.onLogOutButtonClick} className="nav-link btn-dark" to="/logout">
                    <FontAwesomeIcon icon={['fas', 'sign-out-alt']} style={{color: 'white'}} size="lg" /> &nbsp;
                    {dict.logout}
                </Link>
                }
            </div>
        )
    }
}

export default ToggleLogInButton;