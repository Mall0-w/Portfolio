import { Box, Paper, Typography, Grid, Chip, Button } from "@mui/material";
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";
import { Colors } from "../Constants/Colours";
import HoverButton from "../Buttons/HoverButton";
import OpenButton from "../Buttons/OpenButton";
import GitHubButton from "../Buttons/GitHubButton";
import { Validator } from "../Classes/Validator";

export default function DragCarousel({ projects, moveLeft, moveRight, index }) {

    const DRAG_THRESHOLD = 50;

    const [projectsPerPage, setProjectsPerPage] = useState(Validator.isBrowserMobile() ? 1 : Math.min(projects.length, 3));
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setProjectsPerPage(Validator.isBrowserMobile() ? 1 : Math.min(projects.length, 3))
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(()=>{
        setActiveSlide(index)
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
        <Box sx={{ width: '100%', minHeight: '100%', cursor: 'grab', display: 'flex', alignItems: 'center' }}>
            {projects.length > 0 ?
                <motion.div
                    drag="x"
                    style={{ width: '100%', height: '80%', display: 'flex', x: dragX, flex:1 }}
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    animate={{
                        //adding min in so it doesn't auto scroll for a single project per page
                        translateX: `${-1 * ((activeSlide - (Math.min(1, projectsPerPage-1))) / projectsPerPage) * 100}%`
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
                style={{ flex: 1, minWidth: width, height:'100%' }}>
                    <motion.div
                    initial={false}
                    animate={{rotateY: isFlipped ? 180 : 360}}
                    transition={{duration:0.3, animationDirection:'normal'}}
                    onAnimationComplete={()=>setIsAnimating(false)}
                    style={{height:'100%', width:'100%', display:'flex'}}
                    >
                    <Box sx={{ width: '100%', height: '100%', border:`2px ${Colors.main.primary} solid`, background:'black', padding:'2%' }}>
                        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'3%',
                            alignItems:'center', transform: isFlipped ? 'rotateY(180deg)' : undefined}}>
                            {!isFlipped ? <>
                            <Box sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <Typography align="center" variant="h2" color="primary">{project.name}</Typography>
                            </Box>
                            <Box sx={{margin:'2%', flexDirection:'row', width:'100%', display:'flex', overflowY:'auto', padding:'2%', flexShrink:1, flexWrap:'wrap'}} spacing={1}>
                                {project.technologies.map((t) => (
                                    <motion.div
                                    whileHover={{scale:1.1}}
                                    style={{display:'flex'}}
                                    key={t.name}
                                    >
                                        <Chip label={<Typography fontSize={24} color="black">{t.name}</Typography>} size="medium"/>
                                    </motion.div>
                                ))}
                            </Box>
                            </>
                            : 
                            <>
                            <Box sx={{wordBreak:'break-all', width:'100%', height:'65%', overflowY:'auto'}}>
                                <Typography variant="body" fontSize={20} color="primary">{project.desc}</Typography>
                            </Box>
                            <Box sx={{paddingLeft:'3%', paddingRight:'3%', height:'15%', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                                    {project.github ? <GitHubButton link={project.github}/> : <></>}
                                    {project.link ? <OpenButton link={project.link}/> : <></>}
                            </Box>
                            </>
                            }
                            <Box sx={{height:'15%', minWidth:'50%', justifyContent:'center', alignItems:'center', display:'flex'}}>
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
                            </Box>
                        </Box>
                    </Box>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
