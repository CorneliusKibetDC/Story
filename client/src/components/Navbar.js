
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth,logout } from '../auth';

// Create a component to show links when logged in
const LoggedInLink = () => {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link active" href="#" onClick={()=>{logout()}}>Log Out</a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/create_note">Create Notes</Link>
      </li>
    </>
  );
};

// Create a component to show links when logged out
const LoggedOutLink = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
    </>
  );
};

const NavBar = () => {
  const [logged] = useAuth(); // To check if the user is logged in
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg" onToggle={() => setExpanded(!expanded)}>
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {logged ? (
              // Show LoggedInLink if logged in
              <LoggedInLink />
            ) : (
              // Show LoggedOutLink if not logged in
              <LoggedOutLink />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


