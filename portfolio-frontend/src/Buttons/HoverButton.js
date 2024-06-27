import { Button, useTheme } from "@mui/material";

function HoverButton(props){
    const theme = useTheme()
    let sx = props.sx ? {...props.sx, "&:hover":{...props['&:hover'], color: props.hovercolor || theme.palette.secondary.main}} : 
    {"&:hover" : {color: theme.palette.secondary.main}}

    return(
        <Button {...props} sx={sx}>
            {props.children}
        </Button>
    )
}

export default HoverButton