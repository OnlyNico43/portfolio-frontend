'use client';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, type FunctionComponent, type ReactElement } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetVx: number;
  targetVy: number;
}

const ParticleBackground: FunctionComponent = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  const initParticles = useCallback((width: number, height: number): void => {
    const particleCount = Math.floor((width * height) / 10000);
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        targetVx: (Math.random() > 0.5 ? Math.random() : -Math.random()) * 0.05,
        targetVy: (Math.random() > 0.5 ? Math.random() : -Math.random()) * 0.05,
      });
    }
  }, []);

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          resolvedTheme === 'dark' ? `rgba(255, 255, 255, ${particle.opacity})` : `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle =
              resolvedTheme === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Mouse interaction
        const mouseDistance = Math.sqrt(
          (particle.x - mouseRef.current.x) ** 2 + (particle.y - mouseRef.current.y) ** 2,
        );

        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100;
          const angle = Math.atan2(particle.y - mouseRef.current.y, particle.x - mouseRef.current.x);
          particle.vx += Math.cos(angle) * force * 0.1;
          particle.vy += Math.sin(angle) * force * 0.1;
        }

        // Gradually change target direction occasionally
        if (Math.random() < 0.005) {
          particle.targetVx += (Math.random() > 0.5 ? Math.random() : -Math.random()) * 0.025;
          particle.targetVy += (Math.random() > 0.5 ? Math.random() : -Math.random()) * 0.025;

          // Keep target velocity within bounds
          const maxTarget = 0.3;
          particle.targetVx = Math.max(-maxTarget, Math.min(maxTarget, particle.targetVx));
          particle.targetVy = Math.max(-maxTarget, Math.min(maxTarget, particle.targetVy));
        }

        // Gradually move towards target velocity
        const acceleration = 0.05;
        particle.vx += (particle.targetVx - particle.vx) * acceleration;
        particle.vy += (particle.targetVy - particle.vy) * acceleration;

        // Dampen velocity
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });
    },
    [resolvedTheme],
  );

  const animate = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawParticles(ctx, canvas.width, canvas.height);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  const handleResize = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas.width, canvas.height);
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" />;
};

export default ParticleBackground;
