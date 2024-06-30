import {AppBar, Box, Button, Divider, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography, useTheme} from "@mui/material";
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubButton from "./Buttons/GitHubButton.js";
import { useEffect, useState } from "react";
import LinkedInButton from "./Buttons/LinkedInButton.js";
import HoverButton from "./Buttons/HoverButton.js";

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
        <Box sx={{minWidth:"100vw", minHeight:"100vh"}} >
                <AppBar position="sticky" sx={{ background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar >
                        <Grid item container xs={12} justifyContent="flex-end" columnSpacing={1} paddingRight="5%">
                            <Grid item>
                                <Tabs value={currTab} onChange={updateCurrTab} 
                                    aria-label="navigation tabs"
                                    indicatorColor="secondary">
                                    <HoverTab value="home" label="Home" />
                                    <HoverTab value="projects" label="Recent Projects" />
                                    <HoverTab value="about" label="About" />
                                    <HoverTab value="contact" label="Contact"/>
                                    <Divider orientation="vertical" flexItem/>
                                    <GitHubButton/>
                                    <LinkedInButton/>
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
           {props.children}
        </Box>
    )
}

function HoverTab(props){
    const theme = useTheme()
    return <Tab {...props} sx={{"&:hover":{color:theme.palette.primary.main}}}/>
}

BoilerPlate.propTypes = {
    updateTab : PropTypes.func
}

export default BoilerPlate