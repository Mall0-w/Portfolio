import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from "@mui/material"
function LinkedInButton(props){
    return(
        <IconButton onClick={() => window.location.href = process.env.REACT_APP_LINKEDIN} size="large">
            <LinkedInIcon fontSize="large"/>
        </IconButton>
    )
}

export default LinkedInButton