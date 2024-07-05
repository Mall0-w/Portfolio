import { Box, FormControlLabel, Switch, Paper, Slide, Typography } from "@mui/material";
import BoilerPlate from "./Boilerplate.js";
import { createRef, useEffect, useRef, useState } from "react";
import Home from "./Pages/Home.js";
import Contact from "./Pages/Contact.js";
import Projects from "./Pages/Projects.js";
import About from "./Pages/About.js";

function App(props) {
  const pages = ['home', 'projects', 'about'];

  const [currTab, setCurrTab] = useState('home')

  //using some whacky functionaly programming to get an object of key/ref pairs
  const sectionRefs = useRef(
    pages.reduce((acc, section) => {
      acc[section] = createRef();
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
      <BoilerPlate updateTab={(v) => navToRef(v)} parentTab={currTab}>
        <Home ref={sectionRefs.current['home']}/>
        <Box sx={{padding:'1.5%'}}>
          <About ref={sectionRefs.current['about']} loaded={currTab === 'about'}/>
          <Projects ref={sectionRefs.current['projects']}/>
        </Box>
      </BoilerPlate>
    );
}

export default App;
