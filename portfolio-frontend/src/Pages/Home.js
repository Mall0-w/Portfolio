import { Box, Typography } from "@mui/material"
import { forwardRef } from "react"

const Home = forwardRef((props, ref) => {

    return(
        
        <Box id="home" height="100vh" width="100%" ref={ref}>
            <Typography>Testing</Typography>
        </Box>
    )
})

export default Home