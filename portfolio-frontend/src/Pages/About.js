import { Box } from "@mui/material"
import { forwardRef } from "react"

const About = forwardRef((props, ref) => {
    return (
        <Box id="about" height="100vh" width="100%" ref={ref}>
        </Box>
    )
})

export default About