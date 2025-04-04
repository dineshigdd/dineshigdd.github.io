import React from 'react'
import myImage from '../assets/self.jpg'
import { Image  } from 'react-bootstrap'
import HomeContainer from '../styles/styles'
import styled from 'styled-components'

function About() {
  return (
    <HomeContainer className="w-50 p-3 d-flex mx-auto">
        <div className='inner-container d-flex'>
             <h2>About Me</h2>
              <p className='lh-lg fs-5 text'>
              I hold a degree in Software Development from WGU and have a deep interest in web development, programming, and IT. 
              I've contributed to nonprofit organizations and open-source projects, gaining hands-on experience while making a meaningful impact. 
              While continuously expanding my knowledge in technology, I also enjoy sharing insights as a tech blogger. 
              I focus on writing clean, efficient code and staying up to date with industry trends to build innovative solutions.
          
              </p>
              <h2>Skills</h2>
              <div>
              <div class=" mt-3 p-2 col"><svg className="#E34F26">  </svg></div>
              </div>
    </div>
</HomeContainer>
  )
}

export default About

const ImageContainer = styled.div`
    @media (min-width: 576px ){
        img{
            width: 50%;
            height: auto;
        }
    }
`


const HomeContainerAbout = {
  
}