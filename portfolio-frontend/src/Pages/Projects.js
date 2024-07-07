import { Box, Button, Grid, IconButton, Typography,} from "@mui/material"
import { forwardRef, useState, useEffect } from "react"
import DragCarousel from "../Carousel/DragCarousel";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {motion, AnimatePresence} from 'framer-motion'
import { Colors } from "../Constants/Colours";

const Projects = forwardRef((props, ref) => {
    const [projects, setProjects] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [projectIndex, setProjectIndex] = useState(0)

    const PROJECTS_TO_LOAD = -1

    // Function used to retrieve projects from backend
    const getProjects = async (projectsToLoad=10, page=0) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND}/project?limit=${projectsToLoad}&page=${page}`)
            let json = await response.json()
            if (!response.ok) {
                setError(json.message)
                return;
            }
            setLoading(false)
            setProjects(json)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getProjects(PROJECTS_TO_LOAD);
    }, [])

    const moveRight = () => {
        setProjectIndex(Math.min(projectIndex+1, projects.length - 1))
    }

    const moveLeft = () => {
        setProjectIndex(Math.max(0, projectIndex -1))
    }

    return (
        <Box id="projects" ref={ref}
        sx={{minHeight:"100vh", width:"100%",  display:"flex"}}>
            <Box sx={{minHeight:"100%", width:"100%",  display:"flex", flexDirection:'column'}}>
                <Typography variant="h2" color="secondary" align="center">Check Out My Recent Projects</Typography>
            <Box sx={{minHeight:"100%", width:"100%",  display:"flex", flexDirection:'row'}}>
            {projects.length > 0 ?
            <>
            <Grid item container xs={1} md={0.5} sx={{justifyContent:'flex-end', alignItems:'center'}}>
                <motion.button
                whileTap={{
                    scale:0.9,
                }}
                whileHover={{scale:1.1}}
                style={{border:'none', background: 'transparent'}}
                onTap={moveLeft}
                >
                    <IconButton onClick={moveLeft} disabled={projectIndex <= 0} color="primary">
                        <ArrowBackIosIcon/>
                    </IconButton>
                </motion.button>
            </Grid>
            <Grid item container xs={10} md={11} sx={{width:"100%", minHeight:'100%', display:'flex'}}>
                <DragCarousel projects={projects} index={projectIndex} 
                moveRight={moveRight} moveLeft={moveLeft}/>
            </Grid> 
            <Grid item container xs={1} md={0.5}  sx={{justifyContent:'flex-start', alignItems:'center'}}>
                <motion.button
                whileTap={{
                    scale:0.9,
                }}
                whileHover={{scale:1.1}}
                style={{ border:'none', background: 'transparent'}}
                onTap={moveRight}
                >
                <IconButton onClick={moveRight} disabled={projectIndex >= projects.length - 1} color="primary">
                    <ArrowForwardIosIcon/>
                </IconButton>
                </motion.button>
            </Grid>
            </>
            :
            <></>}
            </Box>
            </Box>
        </Box>
    )
})

export default Projects
