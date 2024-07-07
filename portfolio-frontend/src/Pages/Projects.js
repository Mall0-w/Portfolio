import { Box, Card, CardContent, CardHeader, Typography, Grid, CardActions, Chip, Paper, Divider, Link } from "@mui/material"
import { forwardRef, useState, useEffect } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MaxTypography from "../Misc Components/MaxTypography";
import DragCarousel from "../Misc Components/DragCarousel";

const Projects = forwardRef((props, ref) => {
    const [projects, setProjects] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const PROJECTS_TO_LOAD = 8

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

    return (
        <Box id="projects" ref={ref}
        sx={{minHeight:"100vh", width:"100%",  display:"flex"}}>
            {projects.length > 0 ?
            <DragCarousel projects={projects}/> :
            <></>}
        </Box>
    )
})

export default Projects
