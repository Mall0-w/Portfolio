import { Box, TextField, Grid, Button } from "@mui/material"
import { forwardRef } from "react"

const Contact = forwardRef((props, ref) => {
    return (
        <Box id="contact" minHeight="40vh" width="100%" ref={ref} backgroundColor="white">
            <Grid container sx={{width:'100%', height:'100%'}} spacing={2}>
                <Grid item container lg={8} md={12} sm={12} xs={12}>
                    
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Grid container sx={{width:'100%', height:'100%', display:'flex'}} spacing={4}>
                        <Grid item xs={12}>
                            <TextField label="Name" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Message" fullWidth multiline rows={4}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button>Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
})

export default Contact