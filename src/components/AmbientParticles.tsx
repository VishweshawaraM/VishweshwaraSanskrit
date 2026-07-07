import React, { useEffect, useRef } from 'react';

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; radius: number; vx: number; vy: number; alpha: number; maxAlpha: number; phase: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000); // Responsive particle count
      for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle(true));
      }
    };

    const createParticle = (randomizeY: boolean = false) => {
      return {
        x: Math.random() * canvas.width,
        y: randomizeY ? Math.random() * canvas.height : canvas.height + Math.random() * 20,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2, // Very slow horizontal drift
        vy: -(Math.random() * 0.3 + 0.1), // Very slow upward drift
        alpha: 0,
        maxAlpha: Math.random() * 0.4 + 0.1, // Subtle glow
        phase: Math.random() * Math.PI * 2, // For twinkling
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02; // Twinkle speed

        // Fade in
        if (p.alpha < p.maxAlpha) {
          p.alpha += 0.005;
        }

        // Draw
        ctx.beginPath();
        const currentAlpha = Math.max(0, p.alpha * (0.5 + 0.5 * Math.sin(p.phase))); // Twinkle effect
        ctx.fillStyle = `rgba(200, 134, 10, ${currentAlpha})`; // Gold color
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Wrap around horizontally
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        // Reset if off top
        if (p.y < -10) {
          particles[index] = createParticle();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      aria-hidden="true"
    />
  );
};
