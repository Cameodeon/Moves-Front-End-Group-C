import React, { Component } from 'react';
import MenuItem from './MenuItem';

class EmergencyContact extends Component {

    state = {
        dkCallCenter: "",
        maCallCenter: ""
    }

    constructor(props) {
        super(props);
        this.onCallButtonClick = this.onCallButtonClick.bind(this);
    }

    url = `https://movesws-teamc-baa.herokuapp.com/api/`;
    
    phoneName = ['dkCallCenter', "maCallCenter"];

    onCallButtonClick(target) {
        fetch(`${this.url}contactLog/create`, {
           method: 'POST',
           mode: 'cors',
           headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify({ target })
        });
    }

    componentDidMount() {
        this.phoneName.forEach(e => {
            fetch(`${this.url}phoneNumber/${e}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(response => response.json())
            .then(res => {
                this.setState({ [e]: res.data[0].formattedNumber });
            });
        });
    }

    render() {
        var { dict } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <a href={`tel:${this.state.maCallCenter}`} role="button" onClick={() => this.onCallButtonClick(this.state.maCallCenter)}>
                            <MenuItem buttonType="warning" image="/image/country/morocco.png" title={dict.moroccoCallCenter} subtitle={this.state.maCallCenter} />
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href={`tel:${this.state.dkCallCenter}`} role="button" onClick={() => this.onCallButtonClick(this.state.dkCallCenter)}>
                            <MenuItem buttonType="danger" image="/image/country/denmark.png" title={dict.denmarkCallCenter} subtitle={this.state.dkCallCenter} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export default EmergencyContact;