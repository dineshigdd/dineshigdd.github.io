import React, { useState } from 'react'
import myImage from '../assets/self.jpg'
import yelpImage from '../assets/yelp.png'
import cityFinder from "../assets/cityFinder.png"
import miniInventory from "../assets/miniInventory.png"
import HomeContainer from '../styles/styles'
import styled  from 'styled-components'
import { Container, Image, Row, Col } from 'react-bootstrap'


const projectArray = [{
  name: "yelp-project",
  description:"This project is the clone of yelp. A user can find a place based on the search term entered",
  tech:"React , Node , Yelp API",
  url:"https://yelp-clone-dinesh.netlify.app/",
  img: yelpImage
},
{
  name: "mini Inventory control system",
  description:"This applcation",
  tech:"MERN",
  url:"https://mini-inventory-git-dev-dineshigdds-projects.vercel.app/",
  img:miniInventory
},
{
  name: "City Finder",
  description:"This applcation",
  tech:"MERN",
  url:"https://osm-react-typescript-demo.netlify.app/",
  img:cityFinder  
}];
 
function Portfolio() {
  return (
    <HomeContainer className="w-50 col-sm-1 w-sm-100 p-3 d-flex mx-auto">   
     <GridContainer  className='grid d-flex flex-column'>
        { projectArray.map( (project, index ) =>(
                  <StyledLink href={ project.url } target="_blank">
                      <RowContainer>
                          <Col>
                          
                            <ImageContainer  src={ index }>
                                <StyledImage src={project.img } /> 
                          </ImageContainer>                           
                                  
                          </Col>
                          <Col>
                          <ProjectDescription> 
                                <h5>{ project.name }</h5>
                                <p style={{ textAlign:'left'}}>{ project.description}</p>
                                <p style={{ textAlign:'left'}}>Technologies:{ project.tech }</p>  
                          </ProjectDescription>            
                          </Col>                  
                  </RowContainer>
                </StyledLink>
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

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block; /* Make the link fill the RowContainer */
  width: 100%;
  height: 100%;
`

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

const ImageContainer = styled.div`
  width: 200px; /* Set your desired fixed width */
  height: 150px; /* Set your desired fixed height */
  margin-top:15px;
  margin-bottom:5px
`;


const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Or 'contain', 'fill', 'none', 'scale-down' */
`;

const ProjectDescription = styled.div`
  min-height:10vh;
  margin: 0 auto;


   @media (min-width: 768px) { 
    text-align: left;
    
  }
`