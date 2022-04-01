import React from 'react';
import logo from './images/zeus-logo.svg';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              src={logo}
              height="75"
              className="d-inline-block align-top"
              alt="Zeus"
              style={{ margin: 10 }}
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="https://store.zeusln.app" target="_blank">Store</Nav.Link>
            <Nav.Link href="https://docs.zeusln.app" target="_blank">Documentation</Nav.Link>
            <Link to="/about">
              <Nav.Link href="#about">About</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
