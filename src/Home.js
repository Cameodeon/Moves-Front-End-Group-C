import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';


class Home extends Component {

    state = {
        dict: {  }
    };

    componentDidMount() {
        this.setState({dict: this.props.dict});
    }

    render() {
        var dict = this.state.dict;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/lawAndTradition">
                            <MenuItem image="/image/menuIcon/libra.png" title={dict.lawAndTradition} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/location">
                            <MenuItem image="/image/menuIcon/location.png" title={dict.location} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/thiefCases">
                            <MenuItem image="/image/menuIcon/thief.png" title={dict.thiefCases} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/languageBarrier">
                            <MenuItem image="/image/menuIcon/speaking.png" title={dict.languageBarrier} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/overnightStay">
                            <MenuItem image="/image/menuIcon/sleeping.png" title={dict.overnightStay} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/medicalNeed">
                            <MenuItem image="/image/menuIcon/medicalNeed.png" title={dict.medicalNeed} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/safetyTips">
                            <MenuItem image="/image/menuIcon/charity.png" title={dict.safetyTips} />
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <Link to="/content/faq">
                            <MenuItem image="/image/menuIcon/help.png" title={dict.faqPage} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
