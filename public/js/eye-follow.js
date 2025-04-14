/**
 * Eye follow script for homepage SVG character
 * Makes the eyes follow the cursor and blink randomly
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get the SVG eyes
  const leftEyeWhite = document.querySelector('.logo-svg ellipse[cx="35"][cy="50"]');
  const rightEyeWhite = document.querySelector('.logo-svg ellipse[cx="65"][cy="50"]');
  const leftEyeBlack = document.querySelector('.logo-svg circle[cx="37"][cy="45"]');
  const rightEyeBlack = document.querySelector('.logo-svg circle[cx="67"][cy="45"]');
  const leftPupil = document.querySelector('.logo-svg circle[cx="39"][cy="43"]');
  const rightPupil = document.querySelector('.logo-svg circle[cx="69"][cy="43"]');
  
  // Original positions
  const elements = {
    leftEyeWhite: { el: leftEyeWhite, cx: 35, cy: 50, rx: 10, ry: 15 },
    rightEyeWhite: { el: rightEyeWhite, cx: 65, cy: 50, rx: 10, ry: 15 },
    leftEyeBlack: { el: leftEyeBlack, cx: 37, cy: 45, r: 4 },
    rightEyeBlack: { el: rightEyeBlack, cx: 67, cy: 45, r: 4 },
    leftPupil: { el: leftPupil, cx: 39, cy: 43, r: 2 },
    rightPupil: { el: rightPupil, cx: 69, cy: 43, r: 2 }
  };
  
  // The maximum movement range for black eyes (pupils)
  const maxMovement = 3;
  
  // Handle mouse movement
  document.addEventListener('mousemove', (e) => {
    if (!leftEyeBlack || !rightEyeBlack) return;
    
    // Get SVG position and dimensions
    const svg = document.querySelector('.logo-svg');
    if (!svg) return;
    
    const svgRect = svg.getBoundingClientRect();
    const svgCenterX = svgRect.left + svgRect.width / 2;
    const svgCenterY = svgRect.top + svgRect.height / 2;
    
    // Calculate mouse position relative to SVG center
    const mouseX = e.clientX - svgCenterX;
    const mouseY = e.clientY - svgCenterY;
    
    // Normalize the mouse position (-1 to 1)
    const maxDistance = Math.max(svgRect.width, svgRect.height) / 2;
    const normalizedX = Math.max(Math.min(mouseX / maxDistance, 1), -1);
    const normalizedY = Math.max(Math.min(mouseY / maxDistance, 1), -1);
    
    // Move both black eyes and white pupils
    updateEyePosition(elements.leftEyeBlack, elements.leftPupil, normalizedX, normalizedY, elements.leftEyeWhite);
    updateEyePosition(elements.rightEyeBlack, elements.rightPupil, normalizedX, normalizedY, elements.rightEyeWhite);
  });
  
  // Update eye position based on mouse coordinates
  function updateEyePosition(eyeBlack, pupil, normalizedX, normalizedY, eyeWhite) {
    if (!eyeBlack.el || !pupil.el) return;
    
    // Calculate maximum allowed movement within white eye boundary
    // This ensures the black eye stays within the white eye
    const maxX = eyeWhite.rx - eyeBlack.r;
    const maxY = eyeWhite.ry - eyeBlack.r;
    
    // Calculate new positions
    const moveX = normalizedX * Math.min(maxMovement, maxX);
    const moveY = normalizedY * Math.min(maxMovement, maxY);
    
    const newBlackX = eyeBlack.cx + moveX;
    const newBlackY = eyeBlack.cy + moveY;
    
    // Move the black eye
    eyeBlack.el.setAttribute('cx', newBlackX);
    eyeBlack.el.setAttribute('cy', newBlackY);
    
    // Move the white pupil with the black eye
    const newPupilX = pupil.cx + moveX;
    const newPupilY = pupil.cy + moveY;
    
    pupil.el.setAttribute('cx', newPupilX);
    pupil.el.setAttribute('cy', newPupilY);
  }
  
  // Set up random blinking
  setupBlinking();
  
  function setupBlinking() {
    const minBlinkInterval = 5000;  // Minimum time between blinks (ms) - increased from 2000
    const maxBlinkInterval = 18000; // Maximum time between blinks (ms) - increased from 8000
    const blinkDuration = 150;      // How long the eyes stay fully closed (ms)
    const transitionTime = 60;      // Time for half-open/half-closed states (ms)
    let isBlinking = false;         // Flag to prevent overlapping blinks
    
    function blink() {
      if (isBlinking) return;
      isBlinking = true;
      
      // Get current state of eyes for animation
      const currentLeftRx = parseFloat(elements.leftEyeWhite.el.getAttribute('rx')) || elements.leftEyeWhite.rx;
      const currentRightRx = parseFloat(elements.rightEyeWhite.el.getAttribute('rx')) || elements.rightEyeWhite.rx;
      
      // Step 1: Eyes start to close (squeeze slightly)
      elements.leftEyeWhite.el.setAttribute('ry', elements.leftEyeWhite.ry * 0.7);
      elements.rightEyeWhite.el.setAttribute('ry', elements.rightEyeWhite.ry * 0.7);
      elements.leftEyeBlack.el.setAttribute('ry', elements.leftEyeBlack.r * 0.7);
      elements.rightEyeBlack.el.setAttribute('ry', elements.rightEyeBlack.r * 0.7);
      
      // Step 2: After a brief pause, close eyes completely
      setTimeout(() => {
        // White part becomes narrower
        elements.leftEyeWhite.el.setAttribute('ry', elements.leftEyeWhite.ry * 0.15);
        elements.rightEyeWhite.el.setAttribute('ry', elements.rightEyeWhite.ry * 0.15);
        
        // Black part becomes a line
        elements.leftEyeBlack.el.setAttribute('ry', 0.5);
        elements.rightEyeBlack.el.setAttribute('ry', 0.5);
        
        // Hide pupils
        elements.leftPupil.el.setAttribute('r', 0);
        elements.rightPupil.el.setAttribute('r', 0);
      }, transitionTime);
      
      // Step 3: After blinkDuration, start opening eyes
      setTimeout(() => {
        // Start opening eyes (half open)
        elements.leftEyeWhite.el.setAttribute('ry', elements.leftEyeWhite.ry * 0.5);
        elements.rightEyeWhite.el.setAttribute('ry', elements.rightEyeWhite.ry * 0.5);
        elements.leftEyeBlack.el.setAttribute('ry', elements.leftEyeBlack.r * 0.6);
        elements.rightEyeBlack.el.setAttribute('ry', elements.rightEyeBlack.r * 0.6);
        
        // Pupils start to appear
        elements.leftPupil.el.setAttribute('r', elements.leftPupil.r * 0.5);
        elements.rightPupil.el.setAttribute('r', elements.rightPupil.r * 0.5);
      }, transitionTime + blinkDuration);
      
      // Step 4: Complete eye opening
      setTimeout(() => {
        // Fully open eyes
        elements.leftEyeWhite.el.setAttribute('ry', elements.leftEyeWhite.ry);
        elements.rightEyeWhite.el.setAttribute('ry', elements.rightEyeWhite.ry);
        elements.leftEyeBlack.el.setAttribute('ry', elements.leftEyeBlack.r);
        elements.rightEyeBlack.el.setAttribute('ry', elements.rightEyeBlack.r);
        
        // Fully show pupils
        elements.leftPupil.el.setAttribute('r', elements.leftPupil.r);
        elements.rightPupil.el.setAttribute('r', elements.rightPupil.r);
        
        // Allow next blink
        isBlinking = false;
        
        // Schedule next blink
        const nextBlinkTime = minBlinkInterval + Math.random() * (maxBlinkInterval - minBlinkInterval);
        setTimeout(blink, nextBlinkTime);
      }, transitionTime * 2 + blinkDuration);
    }
    
    // Sometimes do a double blink
    function startBlinking() {
      blink();
      
      // 15% chance of a double blink (reduced from 25%)
      if (Math.random() < 0.15) {
        setTimeout(() => {
          blink();
        }, blinkDuration + transitionTime * 3 + 200); // Time for first blink + small pause
      }
      
      // Schedule next blink sequence
      const nextSequenceTime = minBlinkInterval * 2 + Math.random() * (maxBlinkInterval - minBlinkInterval);
      setTimeout(startBlinking, nextSequenceTime);
    }
    
    // Start the first blink after a longer initial delay
    const initialDelay = 3000 + Math.random() * 5000;
    setTimeout(startBlinking, initialDelay);
  }
}); 