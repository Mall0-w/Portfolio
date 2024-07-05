// src/Eye.js
import React, { useEffect, useRef, useState } from 'react'
import './EyeSeeYou.css'
import {Colors} from "../Constants/Colours"
import {Box} from '@mui/material'

export default function EyeSeeYou() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);

  const size = 10; // Grid size (10x10 for simplicity)
  const eyePattern = [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (eyeRef.current && pupilRef.current) {
      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const deltaX = mousePosition.x - eyeCenterX;
      const deltaY = mousePosition.y - eyeCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const radius = Math.min(eyeRect.width, eyeRect.height) / 4; // Adjust this to control the pupil movement radius
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      pupilRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [mousePosition]);

  return (
      <div className="eye-grid" ref={eyeRef}>
        {eyePattern.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`pixel ${cell ? 'filled' : ''} ${rowIndex === 4 && cellIndex === 4 ? 'pupil' : ''}`}
              ref={rowIndex === 4 && cellIndex === 4 ? pupilRef : null}
            ></div>
          ))
        )}
      </div>

  );
};

const styles = {
  eyeGrid:{
    display: "grid",
    gridTemplateColumns: "repeat(10, 5px)", /* 10 columns, x px each */
    gridTemplateRows: "repeat(10, 5px)",    /* 10 rows, x px each */
    gap: "2px",
  },
  
  pixel:{
    width: "5px",
    height: "5px",
    backgroundColor: Colors.main.primary,
  },
  
  pixelFilled : {
    backgroundColor: "#000",
  }
  
}