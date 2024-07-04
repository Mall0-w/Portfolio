import { Box, Typography } from "@mui/material"
import { green } from "@mui/material/colors";
import { forwardRef } from "react"


const Home = forwardRef((props, ref) => {


    return(
        
        <Box id="home" minHeight="100vh" width="100%" display="flex" ref={ref}>
        </Box>
    )
})

export default Home