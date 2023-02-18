import React from 'react'
import myImage from '../assets/self.jpg'
import { Container, Image } from 'react-bootstrap'
import styled from 'styled-components'

function Home() {
  return (
    <div>
        
        <ImageContainer className="w-50 p-3 mx-auto d-block">
            <Image  src={ myImage} 
                    fluid='true'
                    roundedCircle='true'
                    alt="my Image"
                    
            />  
        </ImageContainer>

        <div className="w-50 p-3 mx-auto d-block">
                            <div>
                                <p>
                                    Hi...I am Dinesh<br/>
                                    <span>Web Developer + Technical blogger</span>
                                </p>
                            </div>
                        </div>                   
                        
        </div>
  )
}

export default Home

const ImageContainer = styled.div`
    @media (min-width: 576px ){
        img{
            width: 40%;
            height: auto;
        }
    }
`