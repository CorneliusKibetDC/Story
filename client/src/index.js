import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import SignUpPage from './components/SignUp';
import CreateNotePage from './components/CreateNotes';
import LoginPage from './components/Login';
import HomePage from './components/Home';

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
