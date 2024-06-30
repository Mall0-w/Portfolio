import GitHubIcon from "@mui/icons-material/GitHub"
import { IconButton, useTheme } from "@mui/material"
function GitHubButton(props){

    const theme = useTheme()
    return(
        <IconButton onClick={() => window.location.href = process.env.REACT_APP_GITHUB} size="large" sx={{color:theme.palette.primary.main, 
        "&:hover":{color:theme.palette.secondary.main}}}>
            <GitHubIcon fontSize="large" />
        </IconButton>
    )
}

export default GitHubButton