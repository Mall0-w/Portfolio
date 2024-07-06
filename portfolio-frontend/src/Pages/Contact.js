import { Box, TextField, Grid, Button, Typography } from "@mui/material"
import { forwardRef, useEffect, useState } from "react"
import { motion, AnimatePresence, useTransform } from "framer-motion";
import { Colors } from "../Constants/Colours";
import Typewriter from 'typewriter-effect';

const Contact = forwardRef(({loaded}, ref) => {
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [message, setMessage] = useState()

    const [textToggle, setTextToggle] = useState(false)

    const getTwist=()=>{
        let flip = Math.random()
        let direction = 1
        if(flip > 0.5)
            direction = -1

        return [0,15*direction,10*-direction,5*direction,2*-direction,0]
    }


    useEffect(()=>{
        if(loaded)
            setTextToggle(true)
    },[loaded])

    return (
        <Box id="contact" ref={ref} 
        sx={{minHeight:"40vh", width:"100%", display:'flex', alignItems:'flex-start'}}>
            <Grid container sx={{width:'100%', height:'100%', padding:'1%', display:'flex', justifyContent:'center', alignItems:'center'}} spacing={2}>
                <Grid item container lg={7} md={12} sm={12} xs={12} 
                sx={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <AnimatePresence>
                    <motion.div
                        style={{height:'100%'}}
                    >
                        <Typography variant="h2" color="secondary">
                            Interested?
                        </Typography>
                            <Typography color="primary" variant="h4">
                            <Typewriter
                                options={{
                                    strings: "Get in touch",
                                    autoStart: textToggle,
                                    cursor:"_",
                                    delay:80,
                                }}
                            />
                        </Typography>
                    </motion.div>
                    </AnimatePresence>
                </Grid>
                <Grid item lg={5} md={12} sm={12} xs={12}>
                    <Grid container sx={{width:'100%', height:'100%', display:'flex'}} spacing={4}>
                        <Grid item xs={12}>
                            <CustomTextField label="Name" fullWidth color="primary" focused/>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label="Email" fullWidth color="primary" focused/>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label="Message" fullWidth rows={4} multiline/>
                        </Grid>
                        <Grid item container xs={12} sx={{justifyContent:'center', alignItems:'center'}}>
                            <AnimatePresence>
                                <motion.button
                                    initial={{rotate:0}}
                                    whileTap={{
                                        scale:0.9,
                                        rotate: getTwist() 
                                    }}
                                    whileHover={{scale:1.1}}
                                    style={{borderColor:Colors.main.primary, borderRadius:4, width:'30%', background: 'transparent'}}
                                >
                                    <Button fullWidth sx={{background: 'transparent'}}>
                                        <Typography fontSize={20} color="primary">Execute</Typography>
                                    </Button>
                                </motion.button>
                            </AnimatePresence>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
})


const CustomTextField = (props) => {
    return(
        <TextField {...props} sx={{color:Colors.main.primary}} focused
        InputProps={{ style: { fontSize: 20, color:Colors.main.contrastText } }}
        InputLabelProps={{ style: { fontSize: 24 } }}>{props.children}</TextField>
    )
}

export default Contact