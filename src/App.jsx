import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import  Home  from './views/Home'
import  About  from './views/About'
import Contact from './views/Contact'
import Resume  from './views/Resume'
import Portfolio from './views/Portfolio'
import { useEffect, useState } from 'react'


import { BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ResumeMobile from './views/ResumeMobile'




function PortfolioContainer() {

  const [ state, setState ] = useState( null );

  useEffect(()=>{
    addEventListener("load", (event) =>  {

      if(  window.innerWidth >= 768 ){
        setState( <Resume/>)
      }else{
        setState( <ResumeMobile />)
      }
    },[window.innerWidth]);
    
    addEventListener("resize", (event) =>  {

      if(  window.innerWidth >= 768 ){
        setState( <Resume/>)
      }else{
        setState( <ResumeMobile />)
      }
    },[window.innerWidth]);

  })

  return (
    <Container fluid>
      <Row>
          <Router>
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand><Link to="/">Dinesh</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='me-auto justify-content-end'>
                    <Nav>
                        <Nav.Link><Link to="about">About</Link></Nav.Link>
                        <Nav.Link><Link to="portfolio">Portfolio</Link></Nav.Link>
                        <Nav.Link to="features"><Link to="Resume">Resume</Link></Nav.Link>
                        <Nav.Link href="contact"><Link to="Contact">Contact</Link></Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
              <Route path="/" element={  <Home /> } />     
              <Route path="about" element={ <About />} />   
              <Route path="portfolio" element={ <Portfolio /> } />                  
              <Route path="contact" element={ <Contact /> } /> 
              <Route path="resume" element={ state } />
              
            </Routes>
        </Router>      
      </Row>
      {/* <Row>
        <Col><Home/></Col>
      </Row> */}
    </Container>
  )
}

export default PortfolioContainer
