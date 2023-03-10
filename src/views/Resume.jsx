import React, { useState , useEffect} from 'react';
// import { Document, Page , pdfjs } from 'react-pdf';
import resumePDF from "./Resume23.pdf"
// import HomeContainer from '../styles/styles';
import styled from 'styled-components'
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import { Document, Page   } from 'react-pdf/dist/esm/entry.vite'
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Button } from 'bootstrap';
import { FileEarmarkArrowDownFill } from 'react-bootstrap-icons';

// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';


function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);

  


  // useEffect(() => {
  //   async function fetchPdf() {
  //     // const pdfUrl = './Resume23.pdf';
  //     const pdfBlob = await fetch(resumePDF).then(res => res.blob());
  //     setPdfFile(pdfBlob);
  //   }
  //   fetchPdf();
  // }, []);

// Function will execute on click of button
const onButtonClick = () => {
  // using JavaScript method to get PDF file
  fetch(resumePDF).then(response => {
      response.blob().then(blob => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'DineshResume.pdf';
          alink.click();
      })
  })
}

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
 }

  return (
    <div>
      <ResumeContainer>          
      {/* {pdfFile && ( */}
       
        <ResumeInnerContainer file={resumePDF} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber}
           renderTextLayer={false}            
           canvasBackground="#e6ffff"
           width={ 800 }
           
           />

        </ResumeInnerContainer>
      {/* )} */}
      </ResumeContainer>
      
      <DownloadButton  onClick={onButtonClick } size={ 50 }/>
          
      </div>
          
    );
}

export default Resume;


 
const ResumeContainer = styled.div`
    display: flex;
    justify-content: center;
    z-index: 1000;    
`
 
const ResumeInnerContainer = styled( Document)`  
    padding: 20px;
    background: gray;
    margin-top:100px;
`

const DownloadButton = styled(FileEarmarkArrowDownFill)`
  position: absolute;
  top:100px;
  right:140px;
  color:#0b5ed7;
  cursor: pointer;
  
  /* z-index: 500;  */
  /* border-radius: 50px; */
  /* padding:5px 10px;  */
`

