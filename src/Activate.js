import React, { Component } from 'react';

    class Activate extends Component {
      state = {
        username: '',
        newpassword: '',
        confirmNewpassword:'',
        PasswordErr:'',

      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();

        //handle form processing here....
      }

      render() {
        const { username, newpassword, confirmNewpassword} = this.state;

        return (
          <div className="container">
            <form
              className="form-signin"
              onSubmit={this.onSubmit}
            >
              <h2 className="form-signin-heading">
                Activate Account : <h4>Please Change Your Password to Continue</h4> 
              </h2>

              <div className="form-group">
                <input
                  type="text"
                  name="Username"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={this.onChange}
                  autoFocus
                  disabled
                />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="New Password"
                  className="form-control"
                  placeholder="New Password"
                  value={newpassword}
                  onChange={this.onChange}
                />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="Confirm New Password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmNewpassword}
                  onChange={this.onChange}
                />
                <span className="help-block"></span>
              </div>

              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Activate
              </button>
            </form>
          </div>
        );
      }
    };

   export default Activate; 