import { Box, TextField, Grid, Button, Typography } from "@mui/material"
import { forwardRef, useEffect, useState } from "react"
import { motion, AnimatePresence, useTransform } from "framer-motion";
import { Colors } from "../Constants/Colours";
import Typewriter from 'typewriter-effect';
import {InputValidator} from '../Classes/InputValidator'
import { EmailHandler } from "../Classes/EmailHandler";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ResumeDownload from "../Misc Components/ResumeDownload";

const Contact = forwardRef(({loaded}, ref) => {
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)
    
    const [responseObj, setResponseObj] = useState({})

    const [textToggle, setTextToggle] = useState(false)

    const getTwist=()=>{
        let flip = Math.random()
        let direction = 1
        if(flip > 0.5)
            direction = -1

        return [0,15*direction,10*-direction,5*direction,2*-direction,0]
    }

    async function submitContact(){
        console.log(name, email, message)
        try{
            InputValidator.validateContactForm(name, email, message)
            // setResponseObj({status:'ok', message:"email sent!", statusCode:200})
            let resp = await EmailHandler.sendContactEmails(name, email, message)
            let json = await resp.json()
            if(resp.ok){
                setResponseObj({status:"ok", message:"Your Email Has Been Sent!", statusCode:resp.status})
            }else{
                setResponseObj({status:"error", message:json.message, statusCode:resp.status})
            }

        }catch(e){
            console.error(e)
            setResponseObj({status:'error', message:e.message})
        }
    }

    const isValidEmail = () => {
        return email === null || InputValidator.isValidEmail(email)
    }

    const isValidString = (str) => {
        return str === null || str.length > 0
    }

    useEffect(()=>{
        if(loaded)
            setTextToggle(true)
    },[loaded])

    return (
        <Box id="contact" ref={ref} 
        sx={{minHeight:"40vh", width:"100%", display:'flex', alignItems:'flex-start', flexDirection:'column'}}>
            <Box sx={{paddingBottom:'10%', justifyContent:'center', alignItems:'center', width:'100%'}}>
            <ResumeDownload/>
            </Box>
            <Grid container sx={{width:'100%', height:'100%', padding:'1%', display:'flex', justifyContent:'center', alignItems:'center'}} spacing={2}>
                <Grid item container lg={7} md={12} sm={12} xs={12} 
                sx={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column'}}>
                    <Typography variant="h2" color="secondary">
                        Interested?
                    </Typography>
                    <Typography color="primary" variant="h4">
                        <Typewriter
                            options={{
                                strings: "Get in Touch",
                                autoStart: textToggle,
                                cursor:"_",
                                delay:80,
                            }}
                        />
                    </Typography>
                    {responseObj.status ? 
                    <Typography color={responseObj.status === 'error' ? 'error' : "primary"} variant="h6">
                        <Typewriter
                            options={{
                                strings: `Status Code: ${responseObj.statusCode || 400}: ${responseObj.message}`,
                                autoStart: true,
                                cursor:"",
                                delay:10,
                            }}
                        />
                    </Typography>
                    : <></>}
                </Grid>
                <Grid item lg={5} md={12} sm={12} xs={12}>
                    <Grid container sx={{width:'100%', height:'100%', display:'flex'}} spacing={4}>
                        <Grid item xs={12}>
                            <Typography fontSize={22} color={isValidString(name) ? "primary" : "error"}>Name</Typography>
                            <CustomTextField fullWidth color="primary" focused required placeholder="Name"
                            value={name} onChange={(e) => setName(e.target.value)} error={!isValidString(name)}/>
                            {!isValidString(name) ? <TextFieldError>Name Must Not Be Empty</TextFieldError>:<></>}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontSize={22} color={isValidEmail(email) ? "primary" : "error"}>Email</Typography>
                            <CustomTextField fullWidth color="primary" focused required value={email} placeholder="email"
                            onChange={(e) => setEmail(e.target.value)} error={!isValidEmail(email)}/>
                            {!isValidEmail(email) ? <TextFieldError>Email must be valid</TextFieldError>:<></>}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontSize={22} color={isValidString(message) ? "primary" : "error"}>Message</Typography>
                            <CustomTextField fullWidth rows={4} multiline required placeholder="Message" focused
                             onChange={(e) => setMessage(e.target.value)} error={!isValidString(message)}/>
                            {!isValidString(message) ? <TextFieldError>Message Must Not Be Empty</TextFieldError>:<></>}
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
                                    onTap={submitContact}
                                >
                                    <Button fullWidth sx={{background: 'transparent'}} onClick={submitContact}>
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
        <TextField {...props} InputProps={{ style: { fontSize: 20, color:Colors.main.contrastText } }}>
            {props.children}
        </TextField>
    )
}

const TextFieldError = (props) => {
    return (
    <AnimatePresence>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{width:'100%', height:'100%', overflowX:'hidden'}}
    >          
    <Grid container sx={{display:'flex', flexDirection:'row', alignItems:'center'}} spacing={1}>
        <Grid item>
            <ErrorOutlineIcon color="error"/>
        </Grid>
        <Grid item>
            <Typography fontSize={20} color="error">{props.children}</Typography>
        </Grid>
    </Grid>
    </motion.div>
    </AnimatePresence>
    )
}

export default Contact