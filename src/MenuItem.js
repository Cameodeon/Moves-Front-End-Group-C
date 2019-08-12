import React, { Component } from 'react';
import './MenuItem.css';

class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.hasSubtitle = this.hasSubtitle.bind(this);
    }

    hasSubtitle() {
        return this.props.subtitle && this.props.subtitle.trim() !== "";
    }

    render() {
        var {image, title, subtitle, buttonType} = this.props;
        if (!buttonType)
            buttonType = "outline-info"
        return (
            <div className={`square btn btn-${buttonType}`}>
                <div className="square-content">
                    <img className="itemIcon" src={image} alt={title} />
                    <p className={"itemTitle " + (this.hasSubtitle() ? "wSubtitle" : "")}>{title}</p>
                    <p className="itemSubtitle">{subtitle}</p>
                </div>
            </div>
        );
    }
}

export default MenuItem;