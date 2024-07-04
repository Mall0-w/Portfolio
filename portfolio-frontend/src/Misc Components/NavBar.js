import {AppBar, Box, Button, Divider, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography, useTheme} from "@mui/material";
import GitHubButton from "../Buttons/GitHubButton.js";
import LinkedInButton from "../Buttons/LinkedInButton.js";
import EyeSeeYou from "./EyeSeeYou.js";

export default function NavBar({value, onChange}){
    return(
    <AppBar position="sticky" sx={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar >
            <Grid item container xs={12}>
                <Grid item xs={1}>
                    <EyeSeeYou/>
                </Grid>
                <Grid item container xs={11} justifyContent="flex-end" columnSpacing={1} paddingRight="5%">
                    <Tabs value={value} onChange={onChange} 
                        aria-label="navigation tabs"
                        indicatorColor="primary"
                        textColor="secondary">
                        <HoverTab value="home" label="Home" />
                        <HoverTab value="about" label="About" />
                        <HoverTab value="projects" label="Recent Projects" />
                        <HoverTab value="contact" label="Contact"/>
                        <Divider orientation="vertical" flexItem/>
                        <GitHubButton/>
                        <LinkedInButton/>
                    </Tabs>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
    )
}

function HoverTab(props){
    const theme = useTheme()
    return <Tab {...props} sx={{"&:hover":{color:theme.palette.secondary.main}}}/>
}