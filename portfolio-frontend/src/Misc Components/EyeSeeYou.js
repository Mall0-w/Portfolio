import { Box } from "@mui/material"
import './EyeSeeYou.css';


export default function EyeSeeYou(){

    document.addEventListener('mousemove', function(e) {
        const svg = document.querySelector('.eye');
        const eyeball = document.querySelector('.eyeball');
        
        // SVG dimensions and center
        const svgRect = svg.getBoundingClientRect();
        const svgCenterX = svgRect.left + svgRect.width / 2;
        const svgCenterY = svgRect.top + svgRect.height / 2;
        
        // Mouse position
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        
        // Calculate angle between SVG center and mouse position
        const deltaX = mouseX - svgCenterX;
        const deltaY = mouseY - svgCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        
        // Maximum distance the eyeball can move from the center
        const maxDistance = Math.min(svgRect.width, svgRect.height) / 3;
        
        // Eyeball position relative to SVG center
        const eyeballX = Math.cos(angle) * maxDistance;
        const eyeballY = Math.sin(angle) * maxDistance;
        
        // Update eyeball position
        eyeball.setAttribute('cx', svgCenterX + eyeballX);
        eyeball.setAttribute('cy', svgCenterY + eyeballY);
    });
    

    return(
        <svg class="eye" viewBox="0 0 100 100">
        <circle class="eye-outline" cx="50" cy="50" r="40" fill="white" stroke="black" stroke-width="2"/>
        <circle class="eyeball" cx="50" cy="50" r="10" fill="black"/>
    </svg>

    )
}

const styles = {
    eyeContainer : {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%" /* Adjust as needed */
    },

    eye: {
        width: "40px",
        height: "40px",
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: "50%",
        position: "relative",
    },

    pupil:{
    width: "10px",
    height: "10px",
    backgroundColor: "black",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    }
}
