import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreatedNote from './components/CreatedNote';
import CreatedUser from './components/CreatedUser';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<NotesList />} exact />
          <Route path="/edit/:id" element={<CreatedNote />} />
          <Route path="/create" element={<CreatedNote />} />
          <Route path="/user" element={<CreatedUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
