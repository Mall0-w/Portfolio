import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, useTheme } from "@mui/material"
export default function MenuButton({transform=true, onClick}){

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
        <IconButton onClick={onClick} size="large" 
        sx={buttonStyle}>
            <MenuIcon fontSize="large"/>
        </IconButton>
    )
}