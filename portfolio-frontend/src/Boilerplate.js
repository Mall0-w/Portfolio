import {AppBar, Box, Button, Divider, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography, useTheme} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubButton from "./Buttons/GitHubButton.js";
import { useState } from "react";
import LinkedInButton from "./Buttons/LinkedInButton.js";
import HoverButton from "./Buttons/HoverButton.js";

function BoilerPlate(props){
    const [currTab, setCurrTab] = useState("home")
    return(
        <Box sx={{width:"100vw", height:"100vh"}} >
           <Box sx={{width:"100%"}}>
                <AppBar position="sticky" sx={{ background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar >
                        <Grid item container xs={12} justifyContent="flex-end" columnSpacing={1} paddingRight="5%">
                            <Grid item>
                                <Tabs value={currTab} onChange={(e, value) => setCurrTab(value)} 
                                    aria-label="navigation tabs"
                                    indicatorColor="secondary">
                                    <HoverTab value="home" label="Home" />
                                    <HoverTab value="projects" label="Recent Projects" />
                                    <HoverTab value="about" label="About" />
                                    <HoverButton variant="outlined" sx={{marginTop:'1%', marginBottom:'1%', marginRight:'1%'}}>
                                        Contact
                                    </HoverButton>
                                    <Divider orientation="vertical" flexItem/>
                                    <GitHubButton/>
                                    <LinkedInButton/>
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
           </Box>
           {props.children}
        </Box>
    )
}

function HoverTab(props){
    const theme = useTheme()
    return <Tab {...props} sx={{"&:hover":{color:theme.palette.primary.main}}}/>
}

export default BoilerPlate