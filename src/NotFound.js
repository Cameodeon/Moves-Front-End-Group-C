
import React, { Component } from 'react';

class NotFound extends Component {

    render() {
        var dict = this.props.dict;
        return (
            <div id='error'>
                <h2 className="notFoundTitle">{dict.title}</h2>
                <p className="notFoundDesc">{dict.message}</p>

            </div>

        );
    }
}

export default NotFound;