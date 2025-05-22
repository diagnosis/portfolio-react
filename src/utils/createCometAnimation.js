export const createCometAnimation = () => {
    // Comet creation function
    const createComet = () => {
        const comet = document.createElement('div');
        comet.className = 'comet';
        
        // Random angle between -30 and 30 degrees
        const angle = Math.random() * 60 - 30;
        
        // Calculate random start position (from left side)
        const startX = -100;
        const startY = Math.random() * window.innerHeight;
        
        // Calculate end position based on angle
        const distance = window.innerWidth + 200; // Extra distance to ensure full crossing
        const radians = angle * (Math.PI / 180);
        const endX = startX + (distance * Math.cos(radians));
        const endY = startY + (distance * Math.sin(radians));
        
        comet.style.setProperty('--start-x', `${startX}px`);
        comet.style.setProperty('--start-y', `${startY}px`);
        comet.style.setProperty('--end-x', `${endX}px`);
        comet.style.setProperty('--end-y', `${endY}px`);
        comet.style.setProperty('--angle', `${angle}deg`);
        
        document.querySelector('.aurora-bg').appendChild(comet);
        
        // Animate the comet
        comet.style.animation = `cometMove ${1.5 + Math.random()}s linear forwards`;
        
        // Remove comet after animation
        comet.addEventListener('animationend', () => comet.remove());
    };

    // Create comets at random intervals
    const cometInterval = setInterval(() => {
        if (Math.random() > 0.6) { // 40% chance to create a comet
            createComet();
        }
    }, 1000);
    
    // Return cleanup function
    return () => {
        clearInterval(cometInterval);
    };
};