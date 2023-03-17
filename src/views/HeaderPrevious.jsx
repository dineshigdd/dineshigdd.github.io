// import React from 'react'
// import { Container, Nav, Navbar } from 'react-bootstrap'
// import  Home  from './Home';
// import  About  from './About';
// import { BrowserRouter as Router,
//     Routes,
//     Route,
//     Link
//   } from "react-router-dom";

// function Header() {
//   return (
//     <Router>
//         <Navbar bg="light" expand="lg" fixed="top">
//             <Container>
//                 <Navbar.Brand><Link to="/">Dinesh</Link></Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav" className='me-auto justify-content-end'>
//                 <Nav>
//                     <Nav.Link><Link to="about">About</Link></Nav.Link>
//                     <Nav.Link><Link to="portfolio">Portfolio</Link></Nav.Link>
//                     <Nav.Link to="features"><Link to="Resume">Resume</Link></Nav.Link>
//                     <Nav.Link href="contact"><Link to="Contact">Contact</Link></Nav.Link>
//                 </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>

//         <Routes>
//           <Route path="/" element={  <Home /> } />     
//           <Route path="about" element={ <About />} />                    
//           {/* <Route path="contact" element={ <Contact /> } /> 
//           <Route path="users/*" element={<Users />} />  */}
          
//         </Routes>
//     </Router>
//   )
// }

// export default Header