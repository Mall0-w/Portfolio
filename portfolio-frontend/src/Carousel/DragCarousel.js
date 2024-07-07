import { Box, Paper, Typography, Grid, Chip } from "@mui/material";
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";
import { Colors } from "../Constants/Colours";

export default function DragCarousel({ projects, moveLeft, moveRight, index }) {

    const DRAG_THRESHOLD = 50;


    const [projectsPerPage, setProjectsPerPage] = useState(Math.min(3, Math.floor(window.innerWidth / 700) + 1));
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setProjectsPerPage(Math.min(3, Math.floor(window.innerWidth / 700) + 1));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(()=>{
        setActiveSlide(index)
        console.log('active slide', index)
    },[index])

    const dragX = useMotionValue(0);

    const onEndDrag = () => {

        const x = dragX.get();
        if (x < -DRAG_THRESHOLD) {
            moveRight()
        } else if (x > DRAG_THRESHOLD) {
            moveLeft()
        }
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100%', overflowX: 'hidden', cursor: 'grab', display: 'flex', alignItems: 'center' }}>
            {projects.length > 0 ?
                <motion.div
                    drag="x"
                    style={{ width: '100%', height: '70%', display: 'flex', x: dragX }}
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    animate={{
                        translateX: `${-1 * ((activeSlide - 1) / projectsPerPage) * 100}%`
                    }}
                    whileTap={{cursor:'grabbing'}}
                    onDragEnd={onEndDrag}
                >
                    {projects.map((p, index) => (
                        <ProjectCard key={index} project={p} index={index} width={`${(1 / projectsPerPage) * 100}%`} active={activeSlide === index}/>
                    ))}
                </motion.div>
                :
                <></>
            }
        </Box>
    );
}

function ProjectCard({ project, index, width, active }) {
    console.log('test', project.technologies, project)

    return (
        <AnimatePresence>
            <motion.div
                animate={{
                    scale: active ? 1 : 0.9
                }}
                style={{ height: '100%', minWidth: width }}>
                <Paper sx={{ width: '100%', height: '100%', border:`2px ${Colors.main.primary} solid`, background:'black' }}>
                    <Grid item container sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', 
                        alignItems:'center', padding:'2%'}}>
                        <Grid item xs={10}>
                            <Typography align="center" variant="h1" color="primary">{project.name}</Typography>
                        </Grid>
                        <Grid item container xs={2} sx={{minWidth:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center', display:'flex', flexDirection:'row'}}>
                            {project.technologies.map((t) => (
                                <Grid item container xs={3} md={2}>
                                <motion.div
                                whileHover={{scale:1.1}}
                                >
                                    <Chip label={<Typography fontSize={24} color="black">{t.name}</Typography>} size="medium"/>
                                </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </motion.div>
        </AnimatePresence>
    );
}
