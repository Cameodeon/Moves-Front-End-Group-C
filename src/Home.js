import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Home extends React.Component {

    state = { dict: { } };

    componentDidMount() {
        this.setState({dict: this.props.dict});
    }

    render() {
        var dict = this.state.dict;
        return (
            <ul className="list-inline">
                <li className="list-inline-item"><HomeItem image="../public/image/libra.png" title={dict.lawAndTradition} /></li>
                {/* <li className="list-inline-item"><HomeItem image="../public/image/location.png" title={dict.location} /></li> */}
                <li className="list-inline-item"><HomeItem image="../public/image/thief.png" title={dict.thiefCases} /></li>
                <li className="list-inline-item"><HomeItem image="../public/image/speaking.png" title={dict.languageBarrier} /></li>
                <li className="list-inline-item"><HomeItem image="../public/image/sleeping.png" title={dict.overnightStay} /></li>
            </ul>
        );
    }
}

export default Home;

const HomeItem = (props) => {
    return (
        <div>
            <img src={this.props.image} alt={this.props.title} />
            <h4>{this.props.title}</h4>
        </div>
    );
}
