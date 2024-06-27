import { Box, FormControlLabel, Switch, Paper, Slide, Typography } from "@mui/material";
import BoilerPlate from "./Boilerplate.js";
import { useRef, useState } from "react";
import Home from "./Pages/Home.js";
import Contact from "./Pages/Contact.js";
import Projects from "./Pages/Projects.js";
import About from "./Pages/About.js";

function App(props) {

  const homeRef = useRef(null);
  const projectRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  function navToRef(page){
    let refToScroll = null
    switch(page){
      case "home":
        refToScroll = homeRef
        break;
      case "projects":
        refToScroll = projectRef
        break;
      case "about":
        refToScroll = aboutRef
        break;
      case "contact":
        refToScroll = contactRef
        break;
      default:
        console.log(`no scroll ref for ${page}`)
        break;
    }
    console.log("page", page)
    if(refToScroll && refToScroll.current)
      refToScroll.current.scrollIntoView({ behavior: 'smooth' })
  }

    return (
      <BoilerPlate updateTab={(v) => navToRef(v)}>
        <Home ref={homeRef}/>
        <Projects ref={projectRef}/>
        <About ref={aboutRef}/>
        <Contact ref={contactRef}/>
      </BoilerPlate>
    );
}

export default App;
