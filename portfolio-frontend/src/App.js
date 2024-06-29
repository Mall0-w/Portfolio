import { Box, FormControlLabel, Switch, Paper, Slide, Typography } from "@mui/material";
import BoilerPlate from "./Boilerplate.js";
import { createRef, useRef, useState } from "react";
import Home from "./Pages/Home.js";
import Contact from "./Pages/Contact.js";
import Projects from "./Pages/Projects.js";
import About from "./Pages/About.js";

function App(props) {
  const pages = ['home', 'projects', 'about', "contact"];
  // const homeRef = useRef(null);
  // const projectRef = useRef(null);
  // const aboutRef = useRef(null);
  // const contactRef = useRef(null);

  //using some whacky functionaly programming to get an object of key/ref pairs
  const sectionRefs = useRef(
    pages.reduce((acc, section) => {
      acc[section] = createRef();
      return acc;
    }, {})
  )

  function navToRef(page){
    //if ref exists, scroll to corresponding page
    if(!sectionRefs.current)
      return
    let refToScroll = sectionRefs.current[page]
    if(refToScroll && refToScroll.current)
      refToScroll.current.scrollIntoView({ behavior: 'smooth' })
  }

    return (
      <BoilerPlate updateTab={(v) => navToRef(v)}>
        <Home ref={sectionRefs.current['home']}/>
        <Projects ref={sectionRefs.current['projects']}/>
        <About ref={sectionRefs.current['about']}/>
        <Contact ref={sectionRefs.current['contact']}/>
      </BoilerPlate>
    );
}

export default App;
