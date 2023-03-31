import React, { useState } from 'react'
import myImage from '../assets/self.jpg'
import HomeContainer from '../styles/styles'
import styled  from 'styled-components'
import { Container, Image, Row, Col } from 'react-bootstrap'


const GridContainer = styled( Container )`
   height:50vh;  
   max-width: 500vw;
   background-color: aliceblue;
 
 
  
  /* div {
    text-align: center;
  }
  */
  /* @media (min-width: 768px) { 
  
    
  } */
  
`;

const RowContainer = styled( Row )`
  @media (max-width: 575.98px) { 
    display: block;
  }
  
`;

const ImageWrapper = styled( Image )`
  margin-top:5px;
  margin-bottom:15px;
`;


const ProjectDescription = styled.div`
  min-height:10vh;
  margin: 0 auto;
`




const projectArray = [{
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
        { projectArray.map
            (project =>(

                  <RowContainer className='p-2'>
                  <Col><ImageWrapper  src={ project.img } 
                                  fluid='true'                           
                                  alt="my Image"
                                  width={ 150 }
                          />
                  </Col>
                  <Col>
                  <ProjectDescription> 
                        <h5>{ project.name }</h5>
                        <span>Technologies:{ project.description }</span>  
                  </ProjectDescription>            
                  </Col>
                  </RowContainer>
              )
        )        
        
        }       

         
          
      </GridContainer>
</HomeContainer>
  )
}





export default Portfolio