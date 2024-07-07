import {AppBar, Box, Divider, Grid, useScrollTrigger, Tab, Tabs, Toolbar, useTheme, Slide, Typography, 
    SwipeableDrawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import GitHubButton from "../Buttons/GitHubButton.js";
import LinkedInButton from "../Buttons/LinkedInButton.js";
import EyeSeeYou from "./EyeSeeYou.js";
import { Colors } from "../Constants/Colours.js";
import { forwardRef, useState } from "react";
import { Validator } from "../Classes/Validator.js";
import MenuButton from "../Buttons/MenuButton.js";
import { pages } from "../Constants/Pages.js";
import HoverButton from "../Buttons/HoverButton.js";

const NavBar = forwardRef(({value, onChange}, ref) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const handleSelect = (event, value) => {
        setOpenDrawer(false)
        onChange(event, value)
    }

    return(
    <>
    <HideOnScroll ref={ref}>
        <AppBar position="sticky" sx={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar >
                <Grid item container xs={12}>
                    <Grid item xs={1}>
                        {/* <EyeSeeYou/> */}
                    </Grid>
                    {!Validator.isBrowserMobile() ? 
                    <Grid item container xs={11} justifyContent="flex-end" columnSpacing={1} paddingRight="5%">
                        <Tabs value={value} onChange={handleSelect} 
                            aria-label="navigation tabs"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: Colors.main.dark // Change the indicator color to white
                                }
                            }}
                            textColor="secondary">
                            {pages.map((p, index) => (
                                <HoverTab value={p.name} label={p.label} key={`tab_${p.name}`}/>
                            ))}
                        </Tabs>
                    </Grid>:
                    <Grid item container xs={11} justifyContent="flex-end" columnSpacing={1} paddingRight="5%">
                        <MenuButton onClick={() => setOpenDrawer(true)}/>
                    </Grid>}
                    
                </Grid>
            </Toolbar>
        </AppBar>
    </HideOnScroll>
    <SwipeableDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor="right" 
    sx={{minWidth:'30%',}} onOpen={() => setOpenDrawer(true)}>
        <Box sx={{minWidth:'40%', display:'flex', height:'100%', background:Colors.main.backgroundDrawer }}>
            <List sx={{display:'flex', flexDirection:'column'}}>
                {pages.map((p, index) => (
                    <ListItem >
                        <ListItemButton sx={{'&:hover': {color:"secondary"}}} onClick={(e) => handleSelect(e, p.name)}>
                            <HoverButton fullWidth>
                                <Typography fontSize={20}>{p.label}</Typography>
                            </HoverButton>
                        </ListItemButton>
                        {index < p.length - 1 ? <Divider horizontal/> : <></>}
                    </ListItem>
                ))}
            </List>
        </Box>
    </SwipeableDrawer>
    </>
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