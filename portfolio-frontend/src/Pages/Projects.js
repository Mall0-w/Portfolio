import { Box, Card, CardContent, CardHeader, Typography, Grid, CardActions, Chip } from "@mui/material"
import { forwardRef, useState,  useEffect } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MaxTypography from "../Misc Components/MaxTypography";

const Projects = forwardRef((props, ref) => {

    const [projects, setProjects] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    //function used to retrieve boxes from backend
    const getProjects = async () => {
        try{
            let response = await fetch(`${process.env.REACT_APP_BACKEND}/project`)
            let json = await response.json()
            if(!response.ok){
                setError(json.message)
                return;
            }
            setLoading(false)
            setProjects(json)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        getProjects();
        findNumberBoxes()
    }, [])

    useEffect(()=>{
        console.log("projects", projects)
    },[projects])


    const findNumberBoxes = () => {
        const current = ref.current
        let height = current.offsetHeight
        let width = current.offsetWidth

        console.log(height, width)
    }

    return (
        <Box id="projects" height="80vh" width="100%" ref={ref}>
            <Box height="100%" sx={{display:'flex', background:"#181830", borderRadius:2, border:" 2px #5f41bf solid", margin:'5%',}}>
                <Grid container spacing={2} sx={{margin:'1%', overflowY:"hidden", display:"flex", alignItems:"stretch"}}>
                    {projects.length > 0 ? 
                    projects.map((p) => (
                        <Grid item xs={12} sm={6} md={4} sx={{ diaplay: "flex" }}>
                            <ProjectCard project={p}/>
                        </Grid>
                    ))
                    : <></>}
                </Grid>
            </Box>
        </Box>
    )
})


function ProjectCard({project}){
    const MAX_CHIPS = 5;


    return(
        <Card sx={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', height: "100%"}}>
            <CardHeader title={project.name}/>
            <CardContent>
                <MaxTypography fontSize={20}> 
                    {project.desc}
                </MaxTypography>
            </CardContent>
            <CardActions sx={{ flexWrap: 'wrap' }}>
                {project.technologies.slice(0, Math.min(project.technologies.length, MAX_CHIPS)).map((t) => (
                    <Chip size="medium" label={t.name}/>
                ))}
                <Chip icon={<MoreHorizIcon/>}/>
            </CardActions>
        </Card>
    )
}

export default Projects