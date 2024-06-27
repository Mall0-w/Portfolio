import { Box } from "@mui/material"
import { forwardRef } from "react"

const Projects = forwardRef((props, ref) => {
    return (
        <Box height="200px" width="100%" color="black" backgroundColor="black" ref={ref}>
        </Box>
    )
})

export default Projects