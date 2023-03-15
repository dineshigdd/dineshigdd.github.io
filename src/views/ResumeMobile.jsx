import React from 'react';
import { Page, Text, View, Document, StyleSheet , PDFViewer } from '@react-pdf/renderer';
import styled from 'styled-components'


// // Create styles

const styles = StyleSheet.create({
  page: { backgroundColor: 'whitesmoke' },
  section: {
     color: 'gray', 
     textAlign: 'left', 
     margin: 30,
      
    },

  header:{
     backgroundColor:'#3E3E3E',
     color: 'whitesmoke', 
     textAlign: 'center',     
     fontSize:25,
     paddingTop:25,
     paddingBottom:25,
     lineHeight:1.25,
  },

  secionHeader:{
    fontSize:22,    
    color:'black'
    
  },

  subSection:{
    margin:10
  },


});


  
// Create Document Component
const ResumeMobile = () => (
 <PDFViewer height='500vh'>
  <Document>
    <Page size="A4" wrap={false}>
      <View style={ styles.header }>
        <Text>Daminda Dinesh Imaduwa Gamage</Text>
        <Text>dineshigdd@gmail.com | (818) 984-2616</Text>
        <Text>www.linkedin.com/in/damindadinesh</Text>        
      </View>

      <View style={ styles.section}>

          <Text style={ styles.secionHeader }>Education</Text>
          <View style={ styles.subSection }>               
            <Text>Western Governors University ( Dec 2017 - Jun 2019 )</Text>
            <Text>Bachelor of Software Development</Text>
            <Text>Courses: Java, Software development, Mobile app development, UI & UX</Text>
          </View>
          <View style={ styles.subSection }>
            <Text>Los Angeles Valley College Feb 2014</Text>
            <Text>Western Governors University </Text>
            <Text>Feb 2014 – June 2016</Text>
            <Text>Associate of Science in Computer Science</Text>
            <Text>Courses: OOP concepts , Web Programming, Data Structures and Algorithms, Operating Systems</Text>
          </View>
      </View>

      <View style={ styles.section }>    
      <Text style={ styles.secionHeader }>Skills</Text>
         <View  style={ styles.subSection }>          
            <Text>Languages : JavaScript, C++, Java , PHP</Text>          
            <Text>Technologies: React.js, MySQL, MongoDB, Express, Node, Bash, Git, WordPress</Text>
         </View>          
      </View> 

      <View style={ styles.section}> 
        <Text style={ styles.secionHeader }>Experience</Text>   
          <View style={ styles.subSection }>        
            <Text>Intranet site for ACE, a non-profit organization ,Canoga Park, CA</Text>          
            <Text>WordPress Developer from Oct 2016 – Dec 2017</Text>
            <Text>Gather user requirements and analyze the existing system</Text>
            <Text>Identify technologies to and developed a custom intranet system</Text>
            <Text>Provided teaching for the staff to work with the new system</Text>
          </View>

          <View style={ styles.subSection }>    
            <Text>Ace Film Studio, Burbank, CA</Text>
            <Text>Intranet site for ACE, a non-profit organization</Text>          
            <Text>WordPress Developer from Jan 2020 – Jan 2020</Text>
            <Text>Identify specific user requirements</Text>
            <Text>Develop a custom portfolio website based on user requirements</Text>
            <Text>Provide maintenance and ongoing development</Text>
      </View> 
     </View> 

     <View style={ styles.section}>
     <Text style={ styles.secionHeader }>Open-source projects</Text>
        <View style={ styles.subSection }>   
          <Text>Disaster Accountability Project (https://www.smartresponse.org/)</Text>
          <Text>Frontend Developer Oct 2017 – Jan 2018</Text>
          <Text>Collaborate with a large team of developers on a private GitHub project</Text>
          <Text>Involved in implementing the UI of the web Application</Text>
        </View>
        <View style={ styles.subSection }>
          <Text>since Dec 2022</Text>
          <Text>FreeCodeCamp/chapter</Text>
          <Text>Ayushpanditmoto/CollegeReboot</Text>
        </View>
        <View style={ styles.subSection }>
          <Text>since Jan 2023</Text>
          <Text>Nayak/AlgoListed</Text>
        </View>
     </View>
   
    </Page>
  </Document>
  </PDFViewer>
);

export default ResumeMobile