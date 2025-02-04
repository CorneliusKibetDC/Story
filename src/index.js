import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import SignUpPage from './SignUp';
import CreateNotePage from './CreateNotes';
import LoginPage from './Login';
import HomePage from './Home';

const App = () => {
  return (
    <Router>
      <div className="">
        <NavBar />
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create_note" element={<CreateNotePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
