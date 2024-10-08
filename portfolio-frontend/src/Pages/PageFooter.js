import { Box, Grid, Typography } from "@mui/material";
import GitHubButton from "../Buttons/GitHubButton";
import LinkedInButton from "../Buttons/LinkedInButton";
import { Colors } from "../Constants/Colours";
import EmailButton from "../Buttons/EmailButton";

export default function PageFooter(){
    return(
        <Grid container sx={{width:'100%', height:'100%', display:'flex', padding:'1%', paddingLeft:'5%', paddingRight:'5%',
            background: Colors.main.footerBackground,
            justifyContent:'center', alignItems:'center', borderTop:`2px solid ${Colors.main.primary}`}}>
            <Grid container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{borderBottom:`2px solid ${Colors.main.contrastText}`}}>
                    <GitHubButton/>
                    <LinkedInButton/>
                    <EmailButton/>
                </Box>
            </Grid>
            <Grid item container xs={6} md={10}>
                <Typography fontSize={16} color={Colors.main.contrastText}>© Kyle Lewis 2024</Typography>
            </Grid>
            <Grid item container xs={6} md={2} sx={{justifyContent:'flex-end', alignItems:'center'}}>
                <Typography fontSize={16} color={Colors.main.contrastText}>Made in React</Typography>
            </Grid>
        </Grid>
    )

}