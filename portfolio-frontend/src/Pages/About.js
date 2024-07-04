import { Box, Typography, Grid } from "@mui/material"
import { forwardRef } from "react"
import Typewriter from 'typewriter-effect';

//can't just extend the string with a \ since the typewritter lags out then ;-;
const schpeel = "Hello I'm Kyle <br/> I graduated University of Toronto in June of 2024.  I'm super " +
                "passionate about software development and building things.  It started back in when I was " +
                "in high school; I took a computer science class and loved how every challenge and program felt like a puzzle to be solved. " +
                "After that, I was convinced to join the school's robotics team, feel in love with software even more, and before I knew it I was studying it in University. " +
                "From there I got exposed to even cooler projects and feel even deeper in love with the craft. <br/><br/>"+
                "Currently, I'm trying my hand at Web Dev, already having experience through several jobs and using this website as an opportunity to improve "+
                "my front end abillities and learn ASP.Net.  That isn't to say I don't have plans for other types of software or tech-adjacent fields. " +
                "After all I've always loved building any type of software, I've had an interest in cybersecurity, and going back to robotics has been on my project todo list " + 
                "for quite some time. <br/> <br/>" +
                "Hobbies include: Any form of Cooking, Tabletop games, Video Games, and Fencing <br/><br/>"+
                "Below you can find some examples of my work.  Don't be afraid to reach out if any of it interests you!"


const About = forwardRef((props, ref) => {
    return (
        <Grid container id="about" ref={ref} spacing={2}
        sx={{minHeighteight:"100vh", width:"100%", display:"flex", marginBottom:'5%', flexDirection:'row-reverse'}}>
            <Grid item xs={12} sm={12} md={12} lg={3}>
                <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src={require('../assets/images/profile-cropped.png')}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={9}>
            <Typography color="primary" fontSize={25}>
                <Typewriter
                    options={{
                        strings: schpeel,
                        autoStart: true,
                        cursor:"_",
                        delay:17.5,
                    }}
                />
            </Typography>
            </Grid>
            
        </Grid>
    )
})

export default About