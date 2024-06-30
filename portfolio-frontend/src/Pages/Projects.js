import { Box } from "@mui/material"
import { forwardRef } from "react"

const Projects = forwardRef((props, ref) => {
    return (
        <Box id="projects" height="100vh" width="100%" color="black" backgroundColor="black" ref={ref}>
        </Box>
    )
})

export default Projects