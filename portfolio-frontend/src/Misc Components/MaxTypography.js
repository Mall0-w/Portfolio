import { Typography } from "@mui/material";
import PropTypes from 'prop-types';

function MaxTypography(props){
    return(
        <Typography {...props}
        sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: props.maxLines,
        }}>
            {props.children}
        </Typography>
    )
}

MaxTypography.propTypes = {
    maxLines: PropTypes.number
}

MaxTypography.defaultProps = {
    maxLines: 3
}

export default MaxTypography