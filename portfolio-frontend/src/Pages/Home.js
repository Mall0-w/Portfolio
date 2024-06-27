import { Box } from "@mui/material"
import { forwardRef } from "react"

const Home = forwardRef((props, ref) => {

    return(
        
        <Box height="400px" width="100%" color="red" backgroundColor="red" ref={ref}>
        </Box>
    )
})

export default Home