import React, { useState } from 'react'
import myImage from '../assets/self.jpg'
import yelpImage from '../assets/yelp.png'
import HomeContainer from '../styles/styles'
import styled  from 'styled-components'
import { Container, Image, Row, Col } from 'react-bootstrap'


const projectArray = [{
  name: "yelp-project",
  description:"This project is the clone of yelp. A user can find a place based on the search term entered",
  tech:"React , Node , Yelp API",
  img: yelpImage
},
{
  name: "Issue Tracker",
  description:"This apllication keep track of issues. This app demonstrate all CRUD functionality",
  tech:"Pug, Node",
  img:myImage
},{
  name: "Appointment system",
  description:"Users can schedule appointments. The system send a notification to the phone",
  tech:"React , Node , Yelp API",
  img:myImage
}];
 



function Portfolio() {
  return (
    <HomeContainer className="w-50 col-sm-1 w-sm-100 p-3 d-flex mx-auto">   
     <GridContainer  className='grid d-flex flex-column'>
        { projectArray.map
            (project =>(

                  <RowContainer>
                  <Col><ImageWrapper  src={ project.img } 
                                  fluid='true'                           
                                  alt="my Image"
                                  width={ 150 }
                          />
                  </Col>
                  <Col>
                  <ProjectDescription> 
                        <h5>{ project.name }</h5>
                        <p style={{ textAlign:'left'}}>{ project.description}</p>
                        <p style={{ textAlign:'left'}}>Technologies:{ project.tech }</p>  
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


const GridContainer = styled( Container )`
   height:50vh;  
   max-width: 50vw;
   overflow-y: auto;
   
 
   @media (max-width: 575.98px) { 
    /* margin-left: 20px;
    margin-right: 50px; */
    /* margin:auto 0; */
    max-width: 90vw;
    overflow-y:inherit;
      /* overflow-x:hidden; */
    
    }
  
  /* div {
    text-align: center;
  }
  */
 
  
`;

const RowContainer = styled( Row )`
  
  @media (max-width: 575.98px) { 
    display: block;
    /* margin-top:15px; */
    margin-bottom:20px;
  }

  &:hover {
    background: rgb(240, 248, 255);
    cursor:pointer;
  }
  
`;

const ImageWrapper = styled( Image )`
  margin-top:5px;
  margin-bottom:15px;
`;


const ProjectDescription = styled.div`
  min-height:10vh;
  margin: 0 auto;


   @media (min-width: 768px) { 
    text-align: left;
    
  }
`