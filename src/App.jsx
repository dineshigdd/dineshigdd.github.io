import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import  Home  from './views/Home'
import Header from './views/Header'
import { Col, Container, Row } from 'react-bootstrap';

function PortfolioContainer() {

  return (
    <Container fluid>
      <Row><Header /></Row>
      <Row>
        <Col><Home/></Col>
      </Row>
    </Container>
  )
}

export default PortfolioContainer
