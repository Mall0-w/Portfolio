import EmailIcon from '@mui/icons-material/Email';
import { IconButton, useTheme } from "@mui/material"
function EmailButton({transform=true}){

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
        <IconButton onClick={() => window.location.href =`mailto:${process.env.REACT_APP_EMAIL}`} size="large" 
        sx={buttonStyle}>
            <EmailIcon fontSize="large" />
        </IconButton>
    )
}

export default EmailButton