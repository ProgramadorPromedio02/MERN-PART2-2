import React, { Component } from 'react';
import axios from 'axios';

export default class CreatedUser extends Component {
  state = {
    users: [],
    username: '',
  };

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({ users: res.data });
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/users', {
        username: this.state.username,
      });
      this.setState((prevState) => ({
        users: [...prevState.users, { username: prevState.username }],
        username: '',
      }));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user._id !== id),
      }));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit" className="btn btn-primary m-2 p-2">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                key={user._id}
                className="list-group-item list-group-item-action"
                onDoubleClick={() => this.deleteUser(user._id)}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
