import React from 'react';
import styled from 'styled-components'
import { Container, Row , Col } from 'react-bootstrap'
import HomeContainer from '../styles/styles';
  
// Create Document Component
const ResumeMobile = () => ( 
  <MobileResumeContainer>
     <ResumeHeader> 
        <Col>   
          <p>Daminda Dinesh Imaduwa Gamage</p>
          <p>dineshigdd@gmail.com | ( 818 ) 984-2616</p>
          <p>www.linkedin.com/in/damindadinesh</p>
        </Col>  
     </ResumeHeader>

     <ResumeBody  xs={1} md={ 1}>
          <Section>    
            <h2 className="secionHeader">Education</h2>
            <div className="subBody">               
                  <h4>Western Governors University </h4>
                  <p>Bachelor's Degree, Software Development</p>    
                  <p className='duration'>Dec 2017 - Jun 2019</p>      
            </div>    
          
            <div className="subBody"> 
                  <h4>Los Angeles Valley College</h4>    
                  <p>Associate of Science in Computer Science</p>     
                  <p className='duration'>Feb 2014 - June 2016</p> 
            </div>
          </Section>  

          <Section>    
            <h2 className="secionHeader">Skills</h2>
            <div className="subBody">               
                  <h4>Languages</h4>
                  <p>JavaScript, PHP</p>                        
            </div>    
          
            <div className="subBody"> 
                  <h4>Technologies</h4>    
                  <p>React, Express, MongoDB, Node</p>     
                  <p>MySQL, WordPress</p> 
                  <p>Git & GitHub</p> 
            </div>
          </Section> 

          <Section>    
            <h2 className="secionHeader">Experience</h2>
            <div className="subBody">               
                  <h4>ACE organization, Canoga Park, CA</h4>
                  <p>WordPress Developer</p>
                  <p className='duration'>Oct 2016 - Dec 2017</p>      
                  <ul>
                    <li>Gather user requirements and analyze the existing system</li>
                    <li>Identify technologies and developed a custom intranet system</li>
                    <li>Provided teaching for the staff to work with the new system</li>
                  </ul>                  
            </div>    
          
            <div className="subBody"> 
                  <h4>Ace Film Studio, Burbank, CA</h4>  
                  <p>WordPress Developer</p>  
                  <p className='duration'>Jan 2020 - Jan 2020</p>
                  <ul>
                    <li>Identify specific user requirements</li>
                    <li>Implement a custom portfolio website</li>
                    <li>Provide maintenance and ongoing development</li>
                  </ul> 
            </div>
          </Section>  

          <Section>    
            <h2 className="secionHeader">Open-source projects</h2>
            <div className="subBody">               
                  <h4>Disaster Accountability Project</h4>
                  <p>Frontend Developer</p>
                  <p className='duration'>Oct 2017 - Jan 2018</p>                             
            </div>
            
            <div className="subBody">               
                  <h4>FreeCodeCamp/chapter</h4>
                  <p>Frontend Developer</p>
                  <p className='duration'>since Dec 2022</p>                             
            </div>    
            
            <div className="subBody"> 
                  <h4>Ayushpanditmoto/CollegeReboot</h4>  
                  <p>React Developer</p>  
                  <p className='duration'>since Dec 2022</p>                  
            </div>

            <div className="subBody"> 
                  <h4>Nayak/AlgoListed</h4>  
                  <p>React Developer</p>  
                  <p className='duration'>since Jan 2023</p>                  
            </div>
          
          </Section>  
      
    </ResumeBody>    
  </MobileResumeContainer>

);


export default ResumeMobile;



// // Create styles
const MobileResumeContainer = styled( Container)`
    position:relative;   
    background-color: #d9e2eb;
    top: 10vh;
`;


const ResumeHeader = styled(Row)`
     background-color:#3E3E3E;
     color: #f5f5f5; 
     position:inherit;
     display:block;
     text-align: center;     
     font-size:20px;    
     padding: 20px 0;
     
     p{
        line-height: 10px;
        letter-spacing: 1px;
     }
`;

const ResumeBody = styled(Row)`    
    position:relative;
    margin-top:5vh;
    text-align:left;    
`;


const Section = styled(Col)`
      color:rgba(0,0,0,0.75);
      text-align: left; 

    .secionHeader{
      font-size:25px;    
      color:rgba(0, 0, 0,0.9);
      border-color:rgba( 0,0,0, 0.3);
      border-bottom: 0.8px;
      padding-bottom: 5px;
      margin-bottom:15px;
  }

   .subBody{   
      line-height:8px;
      margin-left: 10px;
      margin-bottom: 30px;

      h4{
        color:rgba(0, 0, 0, 0.8);
      }

      .duration{
        color:rgba(0, 0, 0,0.5 );
      }

      li{
        line-height: 25px;
      }
  }
`;


