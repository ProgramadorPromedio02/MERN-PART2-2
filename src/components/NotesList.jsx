import React, { Component } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default class NotesList extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.getNotes();
  }

  async getNotes() {
    try {
      const res = await axios.get('http://localhost:4000/api/notes');
      this.setState({ notes: res.data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${id}`);
      this.getNotes(); // Útil para actualizar la lista después de borrar
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div key={note._id} className="col-md-4 p-2">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.title}</h5>
                <Link className="btn btn-secondary" to={`/edit/${note._id}`}>
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p>{note.content}</p>
                <p>{note.author}</p>
                <p>
                  Hace{' '}
                  {formatDistanceToNow(new Date(note.createdAt), {
                    locale: es,
                  })}
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteNote(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
