import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';

export default class CreatedNote extends Component {
  state = {
    author: '',
    content: '',
    date: null,
    title: '',
    availableUsers: [],
  };

  // ejecutar cuando se monte el componente
  componentDidMount() {
    this.getUsers();
  };

  // funcion para obtener los usuarios existentes de la BD
  async getUsers() {
    try {
      const res = await axios.get('http://localhost:4000/api/users');
      this.setState({ availableUsers: res.data });
      console.log(this.props)
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // funcion para modificar el estado al llenar los inputs del form que tengan el atributo [name]
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  // funcion para modificar el estado al escoger una fecha en el componente <ReactDatePicker />
  onChangeDate = (date) => this.setState({ date });

  // funcion para crear una nota al hacer submit
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (this.state.date && this.state.author.trim() !== '') {
        await axios.post('http://localhost:4000/api/notes', {
          author: this.state.author,
          content: this.state.content,
          date: this.state.date,
          title: this.state.title,
        });
        this.setState({
          author: '',
          content: '',
          date: null,
          title: '',
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          <form onSubmit={this.onSubmit}>

            {/* Note Title */}
            <div className="mb-3">
              <input
                autoFocus
                className="form-control"
                name="title"
                onChange={this.onInputChange}
                placeholder="Title"
                type="text"
                value={this.state.title}
                required
              />
            </div>

            {/* Note Content */}
            <div className="mb-3">
              <textarea
                className="form-control"
                name="content"
                onChange={this.onInputChange}
                placeholder="Content"
                type="text"
                value={this.state.content}
                required
              ></textarea>
            </div>

            {/* Note Date */}
            <div className="form-group mb-3">
              <ReactDatePicker
                className="form-control"
                name="date"
                onChange={this.onChangeDate}
                placeholderText="Select a date"
                selected={this.state.date}
              />
            </div>

            {/* Note Author */}
            <div className="mb-3">
              {
                // si no existen usuarios en la BD no muestra el select
                this.state.availableUsers.length === 0
                  ? <p>&#x274C; No available users.</p>
                  : (
                    <select
                      className="form-control"
                      name="author"
                      onChange={this.onInputChange}
                      value={this.state.author}
                    >
                      <option value="">Select a user</option>
                      {this.state.availableUsers.map((user) => <option key={user._id} value={user.username}>{user.username}</option>)}
                    </select>
                  )
              }
            </div>

            <button className="btn btn-primary w-100">
              Save &#x271A;
            </button>
          </form>
        </div>
      </div>
    );
  }
}
