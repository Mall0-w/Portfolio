import { Box, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { LoadingTitleHandler } from "../Classes/TitleHandler";

const Home = forwardRef(({navBarRef}, ref) => {
  const [showVideo, setShowVideo] = useState(true);

  const [titleHandler, setTitleHandler] = useState(new LoadingTitleHandler())

  const handleVideoStart = () => {
    setShowVideo(true)
    titleHandler.startLoading()
  }

  const handleVideoEnd = () => {
    setShowVideo(false);
    titleHandler.stopLoading()
  };

  const variants = {
    initial: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  };

  //appbar making 100vh go off screen so have to do it the old fashioned way
  function getWindowHeight(){
    
    if(!navBarRef || !navBarRef.current)
      return
    
    let navbarHeight = navBarRef.current.offsetHeight
    let windowHeight = window.innerHeight
    return windowHeight - navbarHeight
    //get height of appbar
    //get height of window
    //window - appbar
  }

  useEffect(()=>{
    getWindowHeight()
  },[navBarRef])

  return (
    <Box id="home" ref={ref} onClick={()=>handleVideoEnd()}
    sx={{ minHeight:`${getWindowHeight()}px`, width:"100%", display:"flex", overflowX:"hidden"}}>
      <AnimatePresence>
        {showVideo ? (
          <motion.div
            key="video"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{height: '100%', width: '100%', justifyContent:'center', alignItems:'center'}}
          >
            <Box sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
              <video
                autoPlay
                muted
                playsInline
                onPlay={handleVideoStart}
                style={{ objectFit: 'fill', width: '100%', height: '100%' }}
                onEnded={handleVideoEnd}
              >
                <source src={require('../assets/videos/boot.mp4')} type="video/mp4" />
                Your browser does not support the video.
              </video>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="afterVideo"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{minHeight:'100%', width: '100%', justifyContent:'center', alignItems:'center', display:'flex'}}
          >
            <Box sx={{ height: '100%', width: '100%', justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column'}}>
              <Typography fontSize={40} color="primary">
                <Typewriter
                  options={{
                    strings: ":) I SEE YOU :)",
                    autoStart: true,
                    cursor:"_",
                  }}
                />
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
});

export default Home;
