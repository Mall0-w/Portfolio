import { Box, Card, CardContent, CardHeader, Typography, Grid, CardActions, Chip, Paper, Divider, Link } from "@mui/material"
import { forwardRef, useState, useEffect } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MaxTypography from "../Misc Components/MaxTypography";

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
        <Box id="projects" height="100vh" width="100%" ref={ref}>
            <Box height="100%" sx={{ display: 'flex', background: "#181830", borderRadius: 2, border: "2px #5f41bf solid", 
                margin: '5%', overflowX: 'auto', overflowY: 'auto', boxSizing:'content-box' }}>
                <Grid container spacing={2} sx={{height: '100%', flexWrap: 'wrap', flexDirection:'row', padding:"1%"}}>
                    {projects.length > 0 ? 
                    <>
                    {projects.map((p, index) => (
                            <Grid key={index} container item xs={12} sm={12} md={6} lg={4} sx={{ display: "flex", flexGrow:1, height:'33%' }}>
                                <ProjectCard project={p} />
                            </Grid>
                        ))}
                    <Grid key={projects.length} container item xs={12} sm={12} md={6} lg={4} sx={{ display: "flex", flexGrow:1, height:'33%' }}>
                        <MoreCard/>
                    </Grid>
                    </>
                    : <></>}
                </Grid>
            </Box>
        </Box>
    )
})

const cardStyle = { width: '100%', minWidth: '100%', boxSizing: 'border-box', flexDirection:'column',
    height: "100%", padding: "2%", paddingBottom: "5%", display: "flex", wordWrap: 'break-word', backgroundColor:'black' }

function ProjectCard({ project }) {
    return (
        <Paper sx={cardStyle}>
            <Box sx={{ height: '90%', width: '100%', overflowY:'auto'}}>
                <Box>
                    <Box sx={{ justifyContent: 'center', alignItems: "space-between" }}>
                        {project.link ? 
                            <Link href={project.link} color="secondary">
                                <Typography variant="h5">{project.name}</Typography>
                            </Link>
                            :
                            <Typography variant="h5" color="primary">{project.name}</Typography>
                        }
                    </Box>
                    <Divider />
                </Box>
                <Box>
                    <Typography fontSize={20} color="primary">{project.desc}</Typography>
                </Box>
            </Box>
            <Grid container sx={{ height: "10%", width: "100%", justifyContent: "flex-end", display: "flex" }} spacing={1}>
                {project.technologies.map((t, index) => (
                    <Grid key={index} item>
                        <Chip size="medium" label={<Typography fontSize={16}>{t.name}</Typography>} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}


function MoreCard(){
    return(
    <Paper sx={{...cardStyle, justifyContent:'center', alignItems:'center'}}>
        <Link href="/projects" color="secondary"><Typography fontSize={24}>See More?</Typography></Link>

    </Paper>
    )
}

export default Projects
