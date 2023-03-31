import React from 'react'
import myImage from '../assets/self.jpg'
import HomeContainer from '../styles/styles'
import styled  from 'styled-components'
import { Container, Image, Row, Col } from 'react-bootstrap'


let projectArray = [];

projectArray = [{
  name: "yelp-project",
  description:"This project is the clone of yelp",
  tech:"React , Node , Yelp API",
  img: myImage
},
{
  name: "yelp-project",
  description:"This project is the clone of yelp",
  tech:"React , Node , Yelp API",
  img:myImage
},{
  name: "yelp-project",
  description:"This project is the clone of yelp",
  tech:"React , Node , Yelp API",
  img:myImage
}];

 



function Portfolio() {
  return (
    <HomeContainer className="w-50 col-sm-1 w-sm-100 p-3 d-flex mx-auto">   
     <GridContainer  className='grid d-flex flex-column'>
          <RowContainer className='p-2'>
            
            <Col><Image  src={ myImage} 
                            fluid='true'                           
                            alt="my Image"
                            width={ 150 }
                    />
            </Col>
            <Col>
              <div> 
                  <h5>This project is the clone of yelp</h5>
                  <h6>Technologies used</h6>
                  <p>React , Node , Yelp API</p>        
              </div>
              </Col>
          </RowContainer>

          <RowContainer className='p-2'>
            <Col><Image  src={ myImage} 
                            fluid='true'                           
                            alt="my Image"
                            width={ 150 }
                    />
            </Col>
            <Col>
            <div> 
                  <h5>This project is the clone of yelp</h5>
                  <h6>Technologies used</h6>
                  <p>React , Node , Yelp API</p>        
              </div>            
            </Col>
          </RowContainer>

          <RowContainer className='p-2'>
          <Col><Image  src={ myImage} 
                            fluid='true'                           
                            alt="my Image"
                            width={ 150 }
                    />
            </Col>
            <Col><div> 
                  <h5>This project is the clone of yelp</h5>
                  <h6>Technologies used</h6>
                  <p>React , Node , Yelp API</p>        
              </div>
            </Col>
          </RowContainer>

          
      </GridContainer>
</HomeContainer>
  )
}



const GridContainer = styled( Container )`
   height:50vh;  
   max-width: 50vw;
  
  div {
    text-align: left;
  }
 
  /* @media (min-width: 768px) { 
    overflow-y:scroll; 
    
  } */
  
`;

const RowContainer = styled( Row )`
  @media (max-width: 575.98px) { 
    display: block;
  }
  
`;



export default Portfolio