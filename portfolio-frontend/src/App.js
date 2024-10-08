import { Box, FormControlLabel, Switch, Paper, Slide, Typography } from "@mui/material";
import Navigation from "./Pages/Navigation.js";
import { createRef, useEffect, useRef, useState } from "react";
import Home from "./Pages/Home.js";
import Contact from "./Pages/Contact.js";
import Projects from "./Pages/Projects.js";
import About from "./Pages/About.js";
import { pages } from "./Constants/Pages.js";

function App(props) {

  const [currTab, setCurrTab] = useState('home')

  const navBarRef = useRef(null)

  //using some whacky functionaly programming to get an object of key/ref pairs
  const sectionRefs = useRef(
    pages.reduce((acc, section) => {
      acc[section.name] = createRef();
      return acc;
    }, {})
  )

  useEffect(()=>{
    //setting up an observer to see what party of the page we're on
    const observer = new IntersectionObserver((entries) => {
      //set current tab to whatever page is on screen
        let selected = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            selected = entry.target.id;
          }
        });
        if (selected) {
          setCurrTab(selected);
        }
      },
      { threshold: 0.8 } // Adjust threshold as needed
    );

    Object.keys(sectionRefs.current).forEach((k) => {
      observer.observe(sectionRefs.current[k].current)
    })

    return () => {
      Object.keys(sectionRefs.current).forEach((k) => {
        observer.unobserve(sectionRefs.current[k].current)
      })
    }
  }, [])

  function navToRef(page){
    //if ref exists, scroll to corresponding page
    if(!sectionRefs.current)
      return
    setCurrTab(page)
    let refToScroll = sectionRefs.current[page]
    if(refToScroll && refToScroll.current)
      refToScroll.current.scrollIntoView({ behavior: 'smooth' })
  }

    return (
      <Navigation updateTab={(v) => navToRef(v)} parentTab={currTab} navBarRef={navBarRef}>
        <Home ref={sectionRefs.current['home']} navBarRef={navBarRef}/>
        <Box sx={{padding:'1.5%', justifyContent:'center', display:'flex', flexDirection:'column'}}>
          <About ref={sectionRefs.current['about']} loaded={currTab === 'about'}/>
          <Projects ref={sectionRefs.current['projects']}/>
          <Contact ref={sectionRefs.current['contact']} loaded={currTab === 'contact'}/>
        </Box>
      </Navigation>
    );
}

export default App;
