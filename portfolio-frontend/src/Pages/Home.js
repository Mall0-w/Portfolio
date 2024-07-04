import { Box, Typography } from "@mui/material"
import { green } from "@mui/material/colors";
import { forwardRef } from "react"
import Typewriter from 'typewriter-effect';

const Home = forwardRef((props, ref) => {

    const TerminalTypography = (props) => {
        return (<Typography {...props} sx={{...props.sx, color:green[900]}}>
            {props.children}
            </Typography>
        )
    }

    return(
        
        <Box id="home" minHeight="100vh" width="100%" display="flex" ref={ref}>
            <TerminalTypography>
                <Typewriter
                    options={{
                        strings: "Hello I'm Kyle",
                        autoStart: true,
                        cursor:"_",
                    }}
                    />
            </TerminalTypography>
        </Box>
    )
})

export default Home