import React, { Component } from "react";
import { axiosWithAuth } from '../utils';

class NewFriend extends Component {
  state = {
    newFriend: {
      id: Date.now(),
      name: "",
      age: "",
      email: ""
    }
  };

  handleChange = e => {
    this.setState({
      newFriend: 
        {
          ...this.state.newFriend,
          [e.target.name]: e.target.value
        }
    });
  };

  addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", this.state.newFriend)
      .then(res => this.setState({ newFriend: res.data}))
      .catch(err => console.log(err.response));
      this.setState( {
        newFriend: {
        id: Date.now(),
        name: "",
        age: "",
        email: ""
      }})
  };

  render() {
    return (
      <>
        <form onSubmit={this.addFriend} className="newFriend">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.newFriend.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="age"
            placeholder="age"
            value={this.state.newFriend.age}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.newFriend.email}
            onChange={this.handleChange}
          />
          <button className="newFriendButton">Login</button>
        </form>
      </>
    );
  }
}

export default NewFriend;
