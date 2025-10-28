import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CustomCursorProps {
  children: React.ReactNode;
}

const CustomCursor = ({ children }: CustomCursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
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
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(true);
        setCursorText('Click');
      } else if (target.matches('img, video')) {
        setIsHovering(true);
        setCursorText('View');
      } else if (target.matches('h1, h2, h3, h4, h5, h6')) {
        setIsHovering(true);
        setCursorText('Read');
      }
    };

    const handleInteractiveLeave = () => {
      setIsHovering(false);
      setCursorText('');
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
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        {/* Main Cursor */}
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-primary bg-transparent"
          style={{
            scale,
            rotate,
          }}
          animate={{
            backgroundColor: isHovering ? 'hsl(43 55% 51% / 0.2)' : 'transparent',
            borderColor: isHovering ? 'hsl(43 70% 61%)' : 'hsl(43 55% 51%)',
          }}
        />

        {/* Cursor Text */}
        {isHovering && cursorText && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-semibold text-sm whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.div>
        )}

        {/* Click Ripple Effect */}
        {isClicking && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-primary/50"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* Trailing Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 blur-sm" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
