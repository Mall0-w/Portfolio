import PropTypes from 'prop-types';
import { Button, useTheme } from "@mui/material";

function HoverButton(props){
    const theme = useTheme()
    let sx = props.sx ? {...props.sx, "&:hover":{...props['&:hover'], color: props.hoverColor || theme.palette.secondary.main, borderColor:props.hoverColor || theme.palette.secondary.main}} : 
    {"&:hover" : {color: theme.palette.secondary.main}}

    return(
        <Button {...props} sx={sx}>
            {props.children}
        </Button>
    )
}

HoverButton.propTypes={
    hoverColor: PropTypes.string
}

export default HoverButton