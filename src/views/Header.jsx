import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'


function Header() {
  return (
    <div>
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#home">Dinesh</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="#home">About</Nav.Link>
                    <Nav.Link href="#features">Resume</Nav.Link>
                    <Nav.Link href="#pricing">Contact</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  </div>
  )
}

export default Header