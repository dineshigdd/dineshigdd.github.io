import React from 'react';
import { Page, Text, View, Document, StyleSheet , PDFViewer } from '@react-pdf/renderer';



// // Create styles

const styles = StyleSheet.create({
  page: { backgroundColor: 'whitesmoke' },
  section: {
     color: 'rgba(0,0,0,0.75)', 
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
    fontSize:25,    
    color:'rgba(0, 0, 0, 0.9)',
    borderColor:'rgba( 0,0,0, 0.3)',
    borderBottom: 0.8,   
    paddingBottom: 5,   
  },

  subSection:{
    margin:10
  },

  subSectionHeader :{
    color:'rgba(0, 0, 0, 0.9)',
    fontSize:22,   
    fontWeight:'heavy'   
  },

  ListItems:{
    color: 'rgba( 0,0,0, 0.6)',
    marginLeft:15,
    paddingLeft:8,
    borderColor:'rgba( 0,0,0, 0.3)',
    borderLeft: 0.8,    
    lineHeight:1.5
  }
});


  
// Create Document Component
const ResumeMobile = () => (
 <PDFViewer height='500vh'>
  <Document>
    <Page size="A4" style={ styles.page }wrap={false}>
      <View style={ styles.header }>
        <Text>Daminda Dinesh Imaduwa Gamage</Text>
        <Text>dineshigdd@gmail.com | (818) 984-2616</Text>
        <Text>www.linkedin.com/in/damindadinesh</Text>        
      </View>

      <View style={ styles.section}>
          <Text style={ styles.secionHeader }>Education</Text>
          <View style={ styles.subSection }>               
            <Text style={ styles.subSectionHeader }>Western Governors University </Text>
            <Text>Bachelor's Degree, Software Development</Text>    
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>Dec 2017 - Jun 2019</Text>      
          </View>

          <View style={ styles.subSection }>
            <Text style={ styles.subSectionHeader }>Los Angeles Valley College</Text>    
            <Text>Associate of Science in Computer Science</Text>     
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>Feb 2014 - June 2016</Text>       
          </View>
      </View>

       <View style={ styles.section}>
          <Text style={ styles.secionHeader }>Skills</Text>
          <View style={ styles.subSection }>               
            <Text style={ [ styles.subSectionHeader ,{ paddingBottom: 5 }] }>Languages</Text>               
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>JavaScript, PHP</Text>      
          </View>

          <View style={ styles.subSection }>
            <Text style={ [ styles.subSectionHeader ,{ paddingBottom: 5 }]}>Technologies</Text>     
            <View style={ { color: 'rgba( 0,0,0, 0.5)', lineHeight:1.25 }}>
              <Text>React, Express, MongoDB, Node</Text>
              <Text>MySQL, WordPress</Text>
              <Text>Git & GitHub</Text>
            </View>            
          </View>
      </View>

      <View style={ styles.section}>
          <Text style={ styles.secionHeader }>Experience</Text>
          <View style={ styles.subSection }>               
            <Text style={ styles.subSectionHeader }>ACE organization, Canoga Park, CA</Text>
            <Text>WordPress Developer</Text>    
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>Oct 2016 – Dec 2017</Text>      
            <View style={ styles.ListItems }>
                <Text>Gather user requirements and analyze the existing system</Text>
                <Text>Identify technologies and developed a custom intranet system</Text>
                <Text>Provided teaching for the staff to work with the new system</Text>
            </View>
          </View>

          <View style={ styles.subSection }>
            <Text style={ styles.subSectionHeader }>Ace Film Studio, Burbank, CA</Text>    
            <Text>WordPress Developer</Text>  
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>Jan 2020 – Jan 2020</Text>  
            <View style={ styles.ListItems }>
                <Text>Identify specific user requirements</Text>
                <Text>Implement a custom portfolio website</Text>
                <Text>Provide maintenance and ongoing development</Text> 
            </View>    
          </View>
      </View>

      
      <View style={ styles.section}>
          <Text style={ styles.secionHeader }>Open-source projects</Text>
          
          <View style={ styles.subSection }>               
            <Text style={ styles.subSectionHeader }>Disaster Accountability Project</Text>
            <Text>Frontend Developer</Text>    
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>Oct 2017 – Jan 2018</Text>
          </View>

          <View style={ styles.subSection }>
            <Text style={ styles.subSectionHeader }>FreeCodeCamp/chapter</Text>  
            <Text>Frontend Developer</Text> 
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>since Dec 2022</Text> 
          </View>

          <View style={ styles.subSection }>  
            <Text style={ styles.subSectionHeader }>Ayushpanditmoto/CollegeReboot</Text>       
            <Text>React Developer</Text>      
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>since Dec 2022</Text>       
          </View>

          <View style={ styles.subSection }>          
            <Text style={ styles.subSectionHeader }>Nayak/AlgoListed</Text>
            <Text>React Developer</Text>    
            <Text style={ { color: 'rgba( 0,0,0, 0.5)' }}>since Jan 2023</Text>
        </View>
      </View>    
   
    </Page>
  </Document>
  </PDFViewer>
);

export default ResumeMobile