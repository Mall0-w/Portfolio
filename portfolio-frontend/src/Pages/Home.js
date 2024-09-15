import { Box, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { LoadingTitleHandler } from "../Classes/TitleHandler";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Home = forwardRef(({ navBarRef }, ref) => {
  const [showVideo, setShowVideo] = useState(true);
  const [titleHandler] = useState(new LoadingTitleHandler());
  const [showArrow, setShowArrow] = useState(false);
  const [contentHeight, setContentHeight] = useState(window.innerHeight);

  const handleVideoStart = () => {
    setShowVideo(true);
    titleHandler.startLoading();
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    titleHandler.stopLoading();
  };

  const variants = {
    initial: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  };

  //appbar makes 100vh go off screen so have to calculate height manually
  const calculateHeight = () => {
    if (navBarRef && navBarRef.current) {
      const navbarHeight = navBarRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      setContentHeight(windowHeight - navbarHeight);
    }
  };

  useEffect(() => {
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [navBarRef]);

  return (
    <Box
      id="home"
      ref={ref}
      onClick={() => handleVideoEnd()}
      sx={{ height: `${contentHeight}px`, width: "100%", overflow: 'hidden' }}
    >
      <AnimatePresence>
        {showVideo ? (
          <motion.div
            key="video"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box sx={{ height: '100%', width: '100%' }}>
              <video
                autoPlay
                muted
                playsInline
                onPlay={handleVideoStart}
                style={{ objectFit: 'fill', height: '100%', width: '100%' }}
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
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
            onAnimationComplete={() => setShowArrow(true)}
          >
            <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex' }}>
              <Typography fontSize={40} color="primary">
                <Typewriter
                  options={{
                    strings: "I SEE YOU",
                    autoStart: true,
                    cursor: "_",
                  }}
                />
              </Typography>
            </Box>
            {showArrow &&
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, delay: 2 }}
                style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={25} color="primary">Scroll Down</Typography>
                <KeyboardArrowDownIcon color="primary" />
              </motion.div>
            }
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
});

export default Home;
