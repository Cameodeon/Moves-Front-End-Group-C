import React, { Component } from 'react';
import MenuItem from './MenuItem';

class EmergencyContact extends Component {

    render() {
        var dict = this.props.dict;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <a href="tel:+33644222103">
                            <MenuItem buttonType="warning" image="/image/country/morocco.png" title={dict.moroccoCallCenter} subtitle="+33 644 222 103" />
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href="tel:+45 91765840">
                            <MenuItem buttonType="danger" image="/image/country/denmark.png" title={dict.denmarkCallCenter} subtitle="+45 91 76 58 40" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export default EmergencyContact;