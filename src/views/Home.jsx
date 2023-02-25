import React from 'react'
import myImage from '../assets/self.jpg'
import { Image  } from 'react-bootstrap'
import styled from 'styled-components'
import HomeContainer from '../styles/styles'




function Home() {
  return (
      <HomeContainer className="w-50 p-3 d-flex mx-auto">
            <div className='inner-container d-flex'>
                <ImageContainer className="w-50 p-3">
                    <Image  src={ myImage} 
                            fluid='true'
                            roundedCircle='true'
                            alt="my Image"
                            
                    />  
                </ImageContainer>
                        <div>
                            <p>
                                Hi...I am Dinesh<br/>
                                <span>Web Developer + Technical blogger</span>
                            </p>
                        </div>
                </div>
        </HomeContainer>                   
                        

  )
}

export default Home

const ImageContainer = styled.div`
    @media (min-width: 576px ){
        img{
            width: 50%;
            height: auto;
        }
    }
`

// const HomeContainer = styled.div`  
   
//     place-items: center;
//     min-width: 320px;
//     min-height: 92vh;

//     .inner-container{
//         width: fit-content;
//         flex-direction: column;
//         place-items: inherit;
//     }
// `


