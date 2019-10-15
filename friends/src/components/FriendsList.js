import React, { Component } from 'react';
import { axiosWithAuth } from '../utils';
import NewFriends from './NewFriend';

class FriendsList extends Component {
  state = { 
    friends: []
   }

   componentDidMount() {
     this.getData();
   }

   getData = () => {
     axiosWithAuth()
      .get('/api/friends')
      .then(res => this.setState({ friends: res.data}))
      .catch(err => console.log(err.response));
   }

   componentDidUpdate(prevState) {
    if (this.state.friends !== prevState.friends) {
      axiosWithAuth()
      .get('/api/friends')
      .then(res => this.setState({ friends: res.data}))
      .catch(err => console.log(err.response));
    }
  }

  handleDelete = (id) => {
    console.log(id)
    axiosWithAuth()
    .delete(`/api/friends/${id}`)
    .then(res => this.setState({ friends: res.data}))
    .catch(err => console.log(err.response));
  }

  componentWillUnmount() {
    this.getData();
  }

  render() { 
    return ( 
      <>
      <NewFriends />
      <div className="members">
        {this.state.friends.map(item =>(
          <div className="person" key={item.id}>
          <i className="far fa-trash-alt" onClick={()=> this.handleDelete(item.id)}></i>
            <p>{item.name}</p>
            <p>{item.age}</p>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
      </>
     );
  }
}
 
export default FriendsList;