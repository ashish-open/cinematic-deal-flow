import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CustomCursorProps {
  children: React.ReactNode;
}

const CustomCursor = ({ children }: CustomCursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const scale = useTransform(cursorXSpring, [-100, 0, 100], [0.8, 1, 0.8]);
  const rotate = useTransform(cursorXSpring, [-100, 0, 100], [-15, 0, 15]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners for interactive elements
    const handleInteractiveEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, textarea, select, img, video')) {
        setIsHovering(true);
      }
    };

    const handleInteractiveLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleInteractiveEnter);
    document.addEventListener('mouseout', handleInteractiveLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleInteractiveEnter);
      document.removeEventListener('mouseout', handleInteractiveLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {children}
      
      {/* Main Cursor Container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-sm" />
        </motion.div>

        {/* Main Cursor Circle */}
        <motion.div
          className="relative w-10 h-10 rounded-full border-2 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
          style={{
            scale,
            rotate,
          }}
          animate={{
            borderColor: isHovering ? 'hsl(43 70% 61%)' : 'hsl(43 55% 51%)',
            backgroundColor: isHovering 
              ? 'hsl(43 55% 51% / 0.15)' 
              : 'hsl(43 55% 51% / 0.05)',
            boxShadow: isHovering 
              ? '0 0 20px hsl(43 55% 51% / 0.4), inset 0 0 20px hsl(43 70% 61% / 0.2)' 
              : '0 0 10px hsl(43 55% 51% / 0.2)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Inner Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Enhanced Click Ripple Effect */}
        {isClicking && (
          <>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-primary/60"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/30"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
          </>
        )}
      </motion.div>

      {/* Enhanced Trailing Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1.2,
          opacity: isVisible ? (isHovering ? 0.4 : 0.2) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 blur-md" />
      </motion.div>

      {/* Additional Particle Effects */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/60"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x: Math.cos(i * 120 * Math.PI / 180) * 30,
                y: Math.sin(i * 120 * Math.PI / 180) * 30,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
