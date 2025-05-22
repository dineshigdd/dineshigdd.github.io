import React , { useRef } from 'react'
import HomeContainer from '../styles/styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import emailjs from '@emailjs/browser'



function Contact() {
    const formRef = useRef();

      const handleSubmit =  (e) =>{
         e.preventDefault();
        
         emailjs.sendForm(
              import.meta.env.EMAILJS_SERVICE_ID,
              import.meta.env.EMAILJS_TEMPLATE_ID,
              formRef.current,
              { publicKey : import.meta.env.EMAILJS_PUBLIC_KEY }
            ) 
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
       
          <FormContainer ref={ formRef } onSubmit={ handleSubmit }>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control name="user_email" type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Message</Form.Label>
                  <Form.Control name="message" as="textarea" rows={4} />
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
