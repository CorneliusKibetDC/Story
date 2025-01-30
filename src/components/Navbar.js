import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../auth';

const LoggedInLink = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    logout(); // Perform logout
    navigate('/'); // Redirect to home after logout
  };

  return (
    <>
      <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
      <Nav.Link as={Link} to="/create_note" className="text-light">Create Notes</Nav.Link>
      <Nav.Link onClick={handleLogout} className="text-light" style={{ cursor: "pointer" }}>Log Out</Nav.Link>
    </>
  );
};

const LoggedOutLink = () => {
  return (
    <>
      <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
      <Nav.Link as={Link} to="/signup" className="text-light">Sign Up</Nav.Link>
      <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
    </>
  );
};

const NavBar = () => {
  const [logged] = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg" onToggle={() => setExpanded(!expanded)}>
      <Container>
        <Navbar.Brand as={Link} to="/">Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {logged ? <LoggedInLink /> : <LoggedOutLink />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
