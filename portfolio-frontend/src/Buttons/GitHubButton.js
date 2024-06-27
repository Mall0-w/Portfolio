import GitHubIcon from "@mui/icons-material/GitHub"
import { IconButton } from "@mui/material"
function GitHubButton(props){
    return(
        <IconButton onClick={() => window.location.href = process.env.REACT_APP_GITHUB} size="large">
            <GitHubIcon fontSize="large"/>
        </IconButton>
    )
}

export default GitHubButton