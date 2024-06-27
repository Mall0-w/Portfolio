import { Box } from "@mui/material"
import { forwardRef } from "react"

const About = forwardRef((props, ref) => {
    return (
        <Box height="400px" width="100%" color="green" backgroundColor="green" ref={ref}>
        </Box>
    )
})

export default About