import { Box } from "@mui/material"
import { forwardRef } from "react"

const Contact = forwardRef((props, ref) => {
    return (
        <Box id="contact" height="30vh" width="100%">
            <button ref={ref}>test</button>
        </Box>
    )
})

export default Contact