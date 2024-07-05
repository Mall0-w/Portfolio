import { Box, Typography } from "@mui/material"
import { green } from "@mui/material/colors";
import { forwardRef } from "react"


const Home = forwardRef((props, ref) => {


    return(
        
        <Box id="home" minHeight="100vh" width="100%" display="flex" marginBottom="5%" ref={ref}>
            <Box sx={{height:'100%', width:'100%', overflow:'hidden'}}>
            <video autoPlay muted playsInline style={{objectFit:'fill', width:'100%', height:'100%'}}>
                <source src={require('../assets/videos/boot.mp4')} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            </Box>
        </Box>
    )
})

export default Home