import LinkIcon from '@mui/icons-material/Link';
import { IconButton, useTheme } from "@mui/material"
function OpenButton({link, transform=true}){

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
        <IconButton onClick={() => window.open(link)} size="large" 
        sx={buttonStyle}>
            <LinkIcon fontSize="large" />
        </IconButton>
    )
}

export default OpenButton