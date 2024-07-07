import { Button, Grid, Typography } from "@mui/material";

export default function ResumeDownload(){

    const handleClick = () => {
        window.open(process.env.REACT_APP_RESUME_URL);
        console.log(process.env.REACT_APP_RESUME_URL)
    }

    return(
        <Grid container sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <Typography color="primary" variant="h2">Download My Resume</Typography>
            <Button onClick={handleClick} variant="outlined">
                <Typography fontSize="22" color="primary">Download Resume</Typography>
            </Button>
        </Grid>
    )
}