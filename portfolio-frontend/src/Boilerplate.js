import {AppBar, Box, Button, Divider, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubButton from "./Buttons/GitHubButton.js";
import { useState } from "react";
import LinkedInButton from "./Buttons/LinkedInButton.js";
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
                                    textColor="secondary"
                                    indicatorColor="secondary">
                                    <Tab label="Home" />
                                    <Tab label="Recent Projects" />
                                    <Tab label="About" />
                                    <Button color="secondary">
                                        Contact
                                    </Button>
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

export default BoilerPlate