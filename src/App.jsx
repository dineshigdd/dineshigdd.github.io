import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Row, Col, NavLink, NavItem } from 'react-bootstrap'
import  Home  from './views/Home'
import  About  from './views/About'
import Contact from './views/Contact'
// import Resume  from './views/Resume'
import ResumeMobile from './views/ResumeMobile'
import Portfolio from './views/Portfolio'
import styled from 'styled-components'
import { lazy, startTransition , useEffect, useState } from 'react'



import { BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



const Resume = lazy(() => import('./views/Resume'));


function PortfolioContainer() {
  
  
  const [ state, setState ] = useState( null );

  useEffect(()=>{
    addEventListener("load", (event) =>  {

      if(  window.innerWidth >= 768 ){
        startTransition( () => setState( <Resume /> ) );
      }else{
        setState( <ResumeMobile />)
      }
    },[window.innerWidth]);
    
    addEventListener("resize", (event) =>  {

      if(  window.innerWidth >= 768 ){
        startTransition( ()=> setState( <Resume /> ) );
      }else{
        setState( <ResumeMobile />)
      }
    },[window.innerWidth]);

  })

  return (
    <Container fluid>
       <Router>
          <Row className='d-flex flex-column'>     
            <Col>
              <Navbar bg="light" expand="lg" fixed="top">
                  <Container>
                      <Navbar.Brand><Link to="/">Dinesh</Link></Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav" className='me-auto justify-content-end'>
                      <Nav>
                          <MainNavLink to="about">About</MainNavLink>
                          <MainNavLink to="portfolio">Portfolio</MainNavLink>
                          <MainNavLink to="Resume">Resume</MainNavLink>
                          <MainNavLink to="Contact">Contact</MainNavLink>
                      </Nav>
                      </Navbar.Collapse>
                  </Container>
              </Navbar>
            </Col>
            <Col>
                <Routes>
                    <Route path="/" element={  <Home /> } />     
                    <Route path="about" element={ <About />} />   
                    <Route path="portfolio" element={ <Portfolio /> } />                  
                    <Route path="contact" element={ <Contact /> } /> 
                    <Route path="resume" element={ state } />              
                </Routes>
            </Col>
         
      </Row>
      </Router>     
    </Container>
  )
}

export default PortfolioContainer


const MainNavLink = styled(Link)`
  padding: 5px 10px;
  
`