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
            <div className="container">
                <div className="row">
                    <HomeItem image="image/menuIcon/libra.png" title={dict.lawAndTradition} />
                    <HomeItem image="image/menuIcon/location.png" title={dict.location} />
                    <HomeItem image="image/menuIcon/thief.png" title={dict.thiefCases} />
                    <HomeItem image="image/menuIcon/speaking.png" title={dict.languageBarrier} />
                    <HomeItem image="image/menuIcon/sleeping.png" title={dict.overnightStay} />
                </div>
            </div>
        );
    }
}

export default Home;

const HomeItem = (props) => {
    return (
        <div className="col-xs-3 col-md-4" >
            <div className="dummy"></div>
            <div className="thumbnail">
                <img className="image-responsive" src={props.image} alt={props.title} />
                <p>{props.title}</p>
            </div>
        </div>
    );
}
