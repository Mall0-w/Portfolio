import { Box } from "@mui/material"
import { forwardRef, useState,  useEffect } from "react"

const Projects = forwardRef((props, ref) => {

    const [projects, setProjects] = useState([])
    const [error, setError] = useState("")

    const getProjects = async () => {
        try{
            let response = await fetch(`${process.env.REACT_APP_BACKEND}/project`)
            let json = await response.json()
            if(!response.ok){
                setError(json.message)
                return;
            }
            setProjects(json)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        getProjects();
    }, [])

    useEffect(()=>{
        console.log("projects", projects)
    }, [projects])


    return (
        <Box id="projects" height="100vh" width="100%" ref={ref}>
        </Box>
    )
})

export default Projects