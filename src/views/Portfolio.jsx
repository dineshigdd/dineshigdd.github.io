import React from 'react'
import myImage from '../assets/self.jpg'
import HomeContainer from '../styles/styles'
import styled  from 'styled-components'
import { Container, Image, Row, Col } from 'react-bootstrap'

function Portfolio() {
  return (
    <HomeContainer className="w-50 p-3 d-flex mx-auto">   
     <GridContainer  className='d-flex flex-column'>
          <Row className='p-2'>
            <Col><Image  src={ myImage} 
                            fluid='true'                           
                            alt="my Image"
                            width={ 150 }
                    />
            </Col>
            <Col><span>description</span></Col>
          </Row>

          <Row className='p-2'>
            <Col><Image  src={ myImage} 
                            fluid='true'                           
                            alt="my Image"
                            width={ 150 }
                    />
            </Col>
            <Col><span>description</span></Col>
          </Row>

          <Row className='p-2'>
          <Col><Image  src={ myImage} 
                            fluid='true'                           
                            alt="my Image"
                            width={ 150 }
                    />
            </Col>
            <Col><span>description</span></Col>
          </Row>

          
      </GridContainer>
</HomeContainer>
  )
}

const GridContainer = styled( Container )`
   height:50vh;
   overflow-y:scroll;
`

// const Row = styled(Row)`
//   padding:12px;
// `



export default Portfolio