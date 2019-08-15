import React, { Component } from 'react';
import MenuItem from './MenuItem';

class EmergencyContact extends Component {

    state = {
        dkCallCenter: "",
        maCallCenter: ""
    }

    url = `${process.env.WS_DOMAIN}/api/phoneNumber/`;
    
    phoneName = ['dkCallCenter', "maCallCenter"];

    componentDidMount() {
        this.phoneName.forEach(e => {
            fetch(this.url + e, {
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
        var dict = this.props.dict;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <a href={`tel:${this.state.maCallCenter}`}>
                            <MenuItem buttonType="warning" image="/image/country/morocco.png" title={dict.moroccoCallCenter} subtitle={this.state.maCallCenter} />
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href={`tel:${this.state.dkCallCenter}`}>
                            <MenuItem buttonType="danger" image="/image/country/denmark.png" title={dict.denmarkCallCenter} subtitle={this.state.dkCallCenter} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export default EmergencyContact;