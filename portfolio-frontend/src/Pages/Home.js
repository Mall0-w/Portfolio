import { Box, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';

const Home = forwardRef((props, ref) => {
  const [showVideo, setShowVideo] = useState(true);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  const variants = {
    initial: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  };

  return (
    <Box id="home" minHeight="100vh" width="100%" display="flex" marginBottom="5%" ref={ref}>
      <AnimatePresence>
        {showVideo ? (
          <motion.div
            key="video"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
              <video
                autoPlay
                muted
                playsInline
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
                    strings: "I SEE YOU",
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
