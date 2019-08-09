import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

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
                <div className="row text-center">
                    <HomeItem className="col-xs-6 col-md-4" image="image/menuIcon/libra.png" title={dict.lawAndTradition} />
                    <HomeItem className="col-xs-6 col-md-4" image="image/menuIcon/location.png" title={dict.location} />
                    <HomeItem className="col-xs-6 col-md-4" image="image/menuIcon/thief.png" title={dict.thiefCases} />
                    <HomeItem className="col-xs-6 col-md-4" image="image/menuIcon/speaking.png" title={dict.languageBarrier} />
                    <HomeItem className="col-xs-6 col-md-4" image="image/menuIcon/sleeping.png" title={dict.overnightStay} />
                </div>
            </div>
        );
    }
}

export default Home;

const HomeItem = (props) => {
    return (
        <div className="text-center content">
            <img className="image-responsive" src={props.image} alt={props.title} />
            <p>{props.title}</p>
        </div>
    );
}
