import {AppBar, Box, Divider, Grid, useScrollTrigger, Tab, Tabs, Toolbar, useTheme, Slide} from "@mui/material";
import GitHubButton from "../Buttons/GitHubButton.js";
import LinkedInButton from "../Buttons/LinkedInButton.js";
import EyeSeeYou from "./EyeSeeYou.js";
import { Colors } from "../Constants/Colours.js";
import { forwardRef } from "react";

const NavBar = forwardRef(({value, onChange}, ref) => {
    return(
    <HideOnScroll ref={ref}>
        <AppBar position="sticky" sx={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar >
                <Grid item container xs={12}>
                    <Grid item xs={1}>
                        {/* <EyeSeeYou/> */}
                    </Grid>
                    <Grid item container xs={11} justifyContent="flex-end" columnSpacing={1} paddingRight="5%">
                        <Tabs value={value} onChange={onChange} 
                            aria-label="navigation tabs"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: Colors.main.dark // Change the indicator color to white
                                }
                            }}
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
    </HideOnScroll>
    )
})


function HoverTab(props){
    const theme = useTheme()
    return <Tab {...props} sx={{
        transition: 'all 0.2s',
        "&:hover":{
            color:theme.palette.secondary.main
        }}}/>
}

const HideOnScroll = forwardRef((props, ref) => {
    const { children, window, id } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide direction="down" in={trigger} id={id} ref={ref}>
        {children}
      </Slide>
    );
})

export default NavBar