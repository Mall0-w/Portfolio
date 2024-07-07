import {AppBar, Box, Button, Divider, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography, useTheme} from "@mui/material";
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubButton from "../Buttons/GitHubButton.js";
import { useEffect, useState } from "react";
import LinkedInButton from "../Buttons/LinkedInButton.js";
import HoverButton from "../Buttons/HoverButton.js";
import NavBar from "../Misc Components/NavBar.js";
import PageFooter from "./PageFooter.js";
import { Colors } from "../Constants/Colours.js";

export default function Navigation({updateTab, parentTab, navBarRef, children}){
    const [currTab, setCurrTab] = useState("home")

    const updateCurrTab = (e, value) => {
        //if changed tabs by clicking, then navigate
        setCurrTab(value);
        if(e.type === 'click'){
            updateTab(value);
        }
            
    }

    useEffect(() => {
        //set curr tab if changed from scrolling
        setCurrTab(parentTab)
    },[parentTab])

    return(
        <Box sx={{background: Colors.main.background, maxWidth:"100vw", width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
        <NavBar onChange={updateCurrTab} value={currTab} ref={navBarRef}/>
        <Box>
            {children}
        </Box>
        <PageFooter/>
    </Box>
    )
}