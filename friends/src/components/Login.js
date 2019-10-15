import React, { Component } from 'react';

import { axiosWithAuth } from "../utils";

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]:e.target.value
      }
    });
  }

  login = e => {
    e.preventDefault();
    // login to retrieve the JWT token
    // add the token to localstorage
    // route to /protected (whatever landing page)
    axiosWithAuth()
      .post('/api/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/FriendsList');
      })
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input type="password"
          name="password"
          placeholder="password"
          value={this.state.credentials.password}
          onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
      </>
    );
  }
}

export default Login;
