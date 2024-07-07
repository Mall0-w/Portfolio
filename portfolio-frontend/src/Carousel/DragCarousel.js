import { Box, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";

export default function DragCarousel({ projects, makeMoveRight, makeMoveLeft }) {

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

    const dragX = useMotionValue(0);

    const moveRight = () =>{
        setActiveSlide(Math.min(activeSlide + 1, projects.length - 1));
    }

    const moveLeft = () => {
        setActiveSlide(Math.max(activeSlide - 1, 0));
    }

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
    return (
        <AnimatePresence>
            <motion.div

                animate={{
                    scale: active ? 1 : 0.9
                }}
                style={{ height: '100%', minWidth: width }}>
                <Paper sx={{ width: '100%', height: '100%' }}>
                    <Typography color="primary">{index}</Typography>
                </Paper>
            </motion.div>
        </AnimatePresence>
    );
}
