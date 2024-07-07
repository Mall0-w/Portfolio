import { Box, Paper, Typography, Grid, Chip, Button } from "@mui/material";
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";
import { Colors } from "../Constants/Colours";
import HoverButton from "../Buttons/HoverButton";
import OpenButton from "../Buttons/OpenButton";
import GitHubButton from "../Buttons/GitHubButton";

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

    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const toggleFlip = () => {
        if(isAnimating)
            return;
        setIsAnimating(true)
        setIsFlipped(!isFlipped)
    }

    return (
        <AnimatePresence>
            <motion.div
                animate={{
                    scale: active ? 1 : 0.9
                }}
                style={{ height: '100%', minWidth: width }}>
                <motion.div
                initial={false}
                animate={{rotateY: isFlipped ? 180 : 360}}
                transition={{duration:0.3, animationDirection:'normal'}}
                onAnimationComplete={()=>setIsAnimating(false)}
                style={{height:'100%', width:'100%'}}
                >
                    {}
                    <Paper sx={{ width: '100%', height: '100%', border:`2px ${Colors.main.primary} solid`, background:'black' }}>
                        <Grid item container sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', 
                            alignItems:'center', transform: isFlipped ? 'rotateY(180deg)' : undefined}} spacing={2}>
                            {!isFlipped ? <>
                            <Grid item xs={7}>
                                <Typography align="center" variant="h1" color="primary">{project.name}</Typography>
                            </Grid>
                            <Grid item container xs={2} sx={{minWidth:'100%', height:'100%', justifyContent:'flex-start', alignItems:'flex-start', 
                                display:'flex', flexDirection:'row', margin:'2%'}} spacing={1}>
                                {project.technologies.map((t) => (
                                    <Grid item>
                                    <motion.div
                                    whileHover={{scale:1.1}}
                                    >
                                        <Chip label={<Typography fontSize={24} color="black">{t.name}</Typography>} size="medium"/>
                                    </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                            </>
                            : 
                            <>
                            <Grid item container xs={9} sx={{wordBreak:'break-all', overflowY:'auto'}}>
                                <Typography variant="body" fontSize={20} color="primary">{project.desc}</Typography>
                            </Grid>
                            <Grid item xs={1} container sx={{minWidth:'100%', paddingLeft:'3%', paddingRight:'3%'}}>
                                <Grid item container xs={6} sx={{justifyContent:'flex-start'}}>
                                    {project.github ? <GitHubButton link={project.github}/> : <></>}
                                </Grid>
                                <Grid item container xs={6} sx={{justifyContent:'flex-end'}}>
                                    {project.link ? <OpenButton link={project.link}/> : <></>}
                                </Grid>
                                
                            </Grid>
                            </>
                            }
                            <Grid item container xs={1} sx={{minWidth:'50%', justifyContent:'center', alignItems:'center', display:'flex'}}>
                                <motion.button
                                    whileTap={{
                                        scale:0.9,
                                    }}
                                    whileHover={{scale:1.1, borderColor:Colors.main.secondary}}
                                    style={{borderColor:Colors.main.primary, borderRadius:4, width:'100%', background: 'transparent', alignItems:'center', justifyContent:'center'}}
                                    onTap={toggleFlip}
                                >
                                    <HoverButton fullWidth onClick={toggleFlip}>
                                        <Typography fontSize={20}>Flip Card</Typography>
                                    </HoverButton>
                                </motion.button>
                            </Grid>
                        </Grid>
                    </Paper>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
