import GitHubIcon from "@mui/icons-material/GitHub"
import { IconButton, useTheme } from "@mui/material"
function GitHubButton({transform=true}){

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
        <IconButton onClick={() => window.location.href = process.env.REACT_APP_GITHUB} size="large" 
        sx={buttonStyle}>
            <GitHubIcon fontSize="large" />
        </IconButton>
    )
}

export default GitHubButton