
import styled from 'styled-components'

const HomeContainer = styled.div`  
   
    place-items: center;
    min-width: 100vw;
    min-height: 92vh;

    .inner-container{
        width: fit-content;
        flex-direction: column;
        place-items: inherit;
    }

    @media (max-width: 575.98px) { 
      min-width: 100vw;
      
    
    
    }
`
export default HomeContainer;