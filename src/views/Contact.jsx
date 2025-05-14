import React , { useRef } from 'react'
import HomeContainer from '../styles/styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import emailjs from '@emailjs/browser'



function Contact() {
    const form = useRef();

      const handleSubmit =  () =>{
        e.preventDefault();

          emailjs
            .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
              publicKey: 'PvA7-bhOjUMwHZK6b',
            })
            .then(
              () => {
                console.log('SUCCESS!');
              },
              (error) => {
                console.log('FAILED...', error.text);
              },
            );

      }
   
  return (
    <HomeContainer className="w-50 d-flex justify-content-center mx-auto">
    <div className='inner-container d-flex'>
       
          <FormContainer ref={form} onSubmit={ handleSubmit }>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label >Email Address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} />
            </Form.Group>
                
                <Button variant="primary" type="submit">
                  Submit
                </Button>
          </FormContainer>
    </div>
    </HomeContainer>
  )
}

export default Contact


const FormContainer = styled(Form )`
  width:300px;
  text-align:right;

  .mb-3{
    text-align: left;
  }
 
`
//read https://www.robinwieruch.de/react-form/#react-form-by-example
