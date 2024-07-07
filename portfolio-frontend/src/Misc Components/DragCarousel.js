import { Paper, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Validator } from "../Classes/Validator";

export default function DragCarousel({projects}){
    const [currIndex, setCurrIndex] = useState(1)
    const [scrollWidth, setScrollWidth] = useState(0)

    const [projectRefs, setProjectRefs] = useState({})

    const carRef = useRef()

    useEffect(()=>{
        setScrollWidth(carRef.current.scrollWidth - carRef.current.offsetWidth)
    },[])

    return(
        <AnimatePresence>
            <motion.div
            style={{minHeight:'100%', minWidth:'100%', display:'flex', cursor:'grab', overflowX: 'hidden', alignItems:'center'}}
            id="carousel"
            whileTap={{cursor: "grabbing"}}
            ref={carRef}
            >
                <motion.div id="innerCarousel" drag="x"
                dragConstraints={{
                    right:0,
                    left: -scrollWidth
                }}
                style={{display:'flex', height:'100%', width:'100%', gap:'1%'}}>
                    {projects.map((p, index) =>(
                        <ProjectCard project={p} index={index}/>
                    ))}
                </motion.div>
                
            </motion.div>
        </AnimatePresence>
    )
}

function ProjectCard({project, index}){
    
    return(
        <motion.div
        style={{height:'60%', minWidth:'30%'}}>
            <Paper sx={{width:'100%', height:'100%'}}>
                <Typography color="primary">{index}</Typography>
            </Paper>
        </motion.div>
    )
}