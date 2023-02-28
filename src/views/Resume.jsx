import React, { useState } from 'react';
import { Document, Page , pdfjs } from 'react-pdf';
import resumePDF from "./Resume23.pdf"
import HomeContainer from '../styles/styles';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
  }

  return (
      <>
      <HomeContainer>     

        <Document
          file= { resumePDF }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber}  width={600} />
        </Document>

       
    
      </HomeContainer>
      
    
      </>
          
    );
}

export default Resume

// const resumeContainer = styled.dev`
//     display: flex;
//     justify-content: center;
//     z-index: 1000;
// `