import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton, useTheme } from "@mui/material"
function LinkedInButton({transform = true}){
    const theme = useTheme()

    const buttonStyle = {
        color:theme.palette.primary.main, 
        transition: 'all 0.2s',
        "&:hover":{
            color:theme.palette.secondary.main,
            transform: transform ? 'translateY(-5px)' : undefined
        },
    }

    return(
        <IconButton onClick={() => window.open(process.env.REACT_APP_LINKEDIN)} size="large" 
        sx={buttonStyle}>
            <LinkedInIcon fontSize="large"/>
        </IconButton>
    )
}

export default LinkedInButton