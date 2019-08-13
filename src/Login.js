import React, { Component } from 'react';

    class Login extends Component {
      state = {
        username: '',
        password: '',
        UsernameErr:'',
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
        const { username, password,} = this.state;

        return (
          <div className="container">
            <form
              className="form-signin"
              onSubmit={this.onSubmit}
            >
              <h2 className="form-signin-heading">
                Log In
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
                />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                />
                <span className="help-block"></span>
              </div>

              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        );
      }
    };

   export default Login; 
  