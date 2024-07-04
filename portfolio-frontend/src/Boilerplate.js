import {AppBar, Box, Button, Divider, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography, useTheme} from "@mui/material";
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubButton from "./Buttons/GitHubButton.js";
import { useEffect, useState } from "react";
import LinkedInButton from "./Buttons/LinkedInButton.js";
import HoverButton from "./Buttons/HoverButton.js";
import NavBar from "./Misc Components/NavBar.js";

function BoilerPlate(props){
    const [currTab, setCurrTab] = useState("home")

    const updateCurrTab = (e, value) => {
        //if changed tabs by clicking, then navigate
        setCurrTab(value);
        if(e.type === 'click'){
            props.updateTab(value);
        }
            
    }

    useEffect(() => {
        //set curr tab if changed from scrolling
        setCurrTab(props.parentTab)
    },[props.parentTab])

    return(
        <Box sx={{background: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(5,3,8,1) 100%)", maxWidth:"100vw", width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
        <NavBar onChange={updateCurrTab} value={currTab}/>
        <Box sx={{padding:"1.5%"}}>
            {props.children}
        </Box>
        
    </Box>
    )
}

BoilerPlate.propTypes = {
    updateTab : PropTypes.func
}

export default BoilerPlate