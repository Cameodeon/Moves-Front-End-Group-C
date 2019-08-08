
import React, { Component } from 'react';

class NotFound extends Component {

    render() {
        return (
            <div id='error'>
                <h2 className="notFoundTitle">404 - Oops! This page can’t be found.</h2>
                <p className="notFoundDesc">
                    It looks like nothing was found at this location.
                    Maybe try one of the links in the menu or press back to go to the previous page.
                </p>

            </div>

        );
    }
}

export default NotFound;