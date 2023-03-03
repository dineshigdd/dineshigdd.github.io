import React, { useState , useEffect} from 'react';
// import { Document, Page , pdfjs } from 'react-pdf';
import resumePDF from "./Resume23.pdf"
// import HomeContainer from '../styles/styles';
import styled from 'styled-components'
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import { Document, Page   } from 'react-pdf/dist/esm/entry.vite'
// import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

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


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
 }

  return (
    
      <ResumeContainer>          
      {/* {pdfFile && ( */}
        <Document file={resumePDF} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} />
          
        </Document>
      {/* )} */}
      </ResumeContainer>
          
      
          
    );
}

export default Resume;

const ResumeContainer = styled.div`
    display: flex;
    justify-content: center;
    z-index: 1000;
`
 