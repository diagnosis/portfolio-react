export const createCometAnimation = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Set canvas size to match window
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Comet class to manage properties and behavior
    class Comet {
        constructor() {
            this.reset();
        }

        reset() {
            // Random start position (left side)
            this.x = -50;
            this.y = Math.random() * canvas.height;
            // Random angle (-30 to 30 degrees)
            const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
            // Random speed (pixels per frame)
            this.speed = 2 + Math.random() * 3;
            this.vx = this.speed * Math.cos(angle);
            this.vy = this.speed * Math.sin(angle);
            // Random size and tail length
            this.size = 2 + Math.random() * 3;
            this.tailLength = 20 + Math.random() * 30;
            // Random brightness for glow
            this.brightness = 0.7 + Math.random() * 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Reset if comet moves off-screen
            if (this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            // Create gradient for glowing tail
            const gradient = ctx.createLinearGradient(
                this.x,
                this.y,
                this.x - this.vx * this.tailLength,
                this.y - this.vy * this.tailLength
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.brightness})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.size;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x - this.vx * this.tailLength,
                this.y - this.vy * this.tailLength
            );
            ctx.stroke();
        }
    }

    // Manage comets
    const comets = [];
    const maxComets = 2; // Adjust for performance

    // Animation loop
    let animationFrameId;
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Add new comets randomly
        if (comets.length < maxComets && Math.random() > 0.5) {
            comets.push(new Comet());
        }

        // Update and draw comets
        comets.forEach((comet) => {
            comet.update();
            comet.draw();
        });

        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Return cleanup function
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
    };
};