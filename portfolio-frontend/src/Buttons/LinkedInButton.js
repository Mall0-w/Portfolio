import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton, useTheme } from "@mui/material"
function LinkedInButton(props){
    const theme = useTheme()
    return(
        <IconButton onClick={() => window.location.href = process.env.REACT_APP_LINKEDIN} size="large" 
        sx={{color:theme.palette.primary.main ,"&:hover":{color:theme.palette.secondary.main}}}>
            <LinkedInIcon fontSize="large"/>
        </IconButton>
    )
}

export default LinkedInButton