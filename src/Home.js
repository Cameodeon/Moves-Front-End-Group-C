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
                <div className="row">
                    <HomeItem slug="lawAndTradition" image="/image/menuIcon/libra.png" title={dict.lawAndTradition} />
                    <HomeItem slug="location" image="/image/menuIcon/location.png" title={dict.location} />
                    <HomeItem slug="thiefCases" image="/image/menuIcon/thief.png" title={dict.thiefCases} />
                    <HomeItem slug="languageBarrier" image="/image/menuIcon/speaking.png" title={dict.languageBarrier} />
                    <HomeItem slug="overnightStay" image="/image/menuIcon/sleeping.png" title={dict.overnightStay} />
                </div>
            </div>
        );
    }
}

export default Home;

const HomeItem = (props) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <Link to={`/content/${props.slug}`}>
                <div className="btn btn-outline-info square">
                    <div className="square-content">
                        <img className="homeItemIcon" src={props.image} alt={props.title} /><br />
                        <p className="homeItemTitle">{props.title}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
